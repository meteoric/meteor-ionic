Template.ionSideMenuContent.onCreated(function() {
    this.dragContent = new ReactiveVar(true);
    this.edgeDragThreshold = new ReactiveVar(false);

    this.autorun(() => {
        let td = Template.currentData();
        if (!td) return;
        this.dragContent.set(!_.isUndefined(td.dragContent) ? td.dragContent : true);
        this.edgeDragThreshold.set(!td.edgeDragThreshold);
    });

    this.onScopeCreated = function() {
        this.autorun(() => {
            this.scope.dragContent = this.dragContent.get();
            this.scope.edgeDragThreshold = this.edgeDragThreshold.get();
        });
    };
});

Template.ionSideMenuContent.onRendered(function() {
    let element, $element;
    element = $element = this.$('ion-side-menu-content');
    let $scope = this.scope;
    let $window = $(window);
    let sideMenuCtrl = $scope.sideMenuCtrl;

    $(sideMenuCtrl).on('initialized', () => {
        var startCoord = null;
        var primaryScrollAxis = null;

        if (!_.isUndefined(this.dragContent.get())) {
            this.autorun(() => {
                sideMenuCtrl.canDragContent(this.dragContent.get());
            });
        } else {
            sideMenuCtrl.canDragContent(true);
        }

        this.autorun(() => {
            sideMenuCtrl.edgeDragThreshold(this.edgeDragThreshold.get());
        });

        // Listen for taps on the content to close the menu
        function onContentTap(gestureEvt) {
            if (sideMenuCtrl.getOpenAmount() !== 0) {
                sideMenuCtrl.close();
                gestureEvt.gesture.srcEvent.preventDefault();
                startCoord = null;
                primaryScrollAxis = null;
            } else if (!startCoord) {
                startCoord = ionic.tap.pointerCoord(gestureEvt.gesture.srcEvent);
            }
        }

        function onDragX(e) {
            if (!sideMenuCtrl.isDraggableTarget(e)) return;

            if (getPrimaryScrollAxis(e) == 'x') {
                sideMenuCtrl._handleDrag(e);
                e.gesture.srcEvent.preventDefault();
            }
        }

        function onDragY(e) {
            if (getPrimaryScrollAxis(e) == 'x') {
                e.gesture.srcEvent.preventDefault();
            }
        }

        function onDragRelease(e) {
            sideMenuCtrl._endDrag(e);
            startCoord = null;
            primaryScrollAxis = null;
        }

        function getPrimaryScrollAxis(gestureEvt) {
            // gets whether the user is primarily scrolling on the X or Y
            // If a majority of the drag has been on the Y since the start of
            // the drag, but the X has moved a little bit, it's still a Y drag

            if (primaryScrollAxis) {
                // we already figured out which way they're scrolling
                return primaryScrollAxis;
            }

            if (gestureEvt && gestureEvt.gesture) {

                if (!startCoord) {
                    // get the starting point
                    startCoord = ionic.tap.pointerCoord(gestureEvt.gesture.srcEvent);

                } else {
                    // we already have a starting point, figure out which direction they're going
                    var endCoord = ionic.tap.pointerCoord(gestureEvt.gesture.srcEvent);

                    var xDistance = Math.abs(endCoord.x - startCoord.x);
                    var yDistance = Math.abs(endCoord.y - startCoord.y);

                    var scrollAxis = (xDistance < yDistance ? 'y' : 'x');

                    if (Math.max(xDistance, yDistance) > 30) {
                        // ok, we pretty much know which way they're going
                        // let's lock it in
                        primaryScrollAxis = scrollAxis;
                    }

                    return scrollAxis;
                }
            }
            return 'y';
        }

        var content = {
            element: element[0],
            onDrag: function () {
            },
            endDrag: function () {
            },
            setCanScroll: function (canScroll) {
                var c = $element[0].querySelector('.scroll');

                if (!c) {
                    return;
                }

                var content = $(c.parentElement);
                if (!content) {
                    return;
                }

                // freeze our scroll container if we have one
                var scrollScope = $.data(content.get(0), 'scope');
                scrollScope.scrollCtrl && scrollScope.scrollCtrl.freezeScrollShut(!canScroll);
            },
            getTranslateX: function () {
                return $scope.sideMenuContentTranslateX || 0;
            },
            setTranslateX: ionic.animationFrameThrottle(function (amount) {
                var xTransform = content.offsetX + amount;
                $element[0].style[ionic.CSS.TRANSFORM] = 'translate3d(' + xTransform + 'px,0,0)';
                Meteor.setTimeout(function () {
                    $scope.sideMenuContentTranslateX = amount;
                });
            }),
            setMarginLeft: ionic.animationFrameThrottle(function (amount) {
                if (amount) {
                    amount = parseInt(amount, 10);
                    $element[0].style[ionic.CSS.TRANSFORM] = 'translate3d(' + amount + 'px,0,0)';
                    $element[0].style.width = ($window.innerWidth - amount) + 'px';
                    content.offsetX = amount;
                } else {
                    $element[0].style[ionic.CSS.TRANSFORM] = 'translate3d(0,0,0)';
                    $element[0].style.width = '';
                    content.offsetX = 0;
                }
            }),
            setMarginRight: ionic.animationFrameThrottle(function (amount) {
                if (amount) {
                    amount = parseInt(amount, 10);
                    $element[0].style.width = ($window.innerWidth - amount) + 'px';
                    content.offsetX = amount;
                } else {
                    $element[0].style.width = '';
                    content.offsetX = 0;
                }
                // reset incase left gets grabby
                $element[0].style[ionic.CSS.TRANSFORM] = 'translate3d(0,0,0)';
            }),
            setMarginLeftAndRight: ionic.animationFrameThrottle(function (amountLeft, amountRight) {
                amountLeft = amountLeft && parseInt(amountLeft, 10) || 0;
                amountRight = amountRight && parseInt(amountRight, 10) || 0;

                var amount = amountLeft + amountRight;

                if (amount > 0) {
                    $element[0].style[ionic.CSS.TRANSFORM] = 'translate3d(' + amountLeft + 'px,0,0)';
                    $element[0].style.width = ($window.innerWidth - amount) + 'px';
                    content.offsetX = amountLeft;
                } else {
                    $element[0].style[ionic.CSS.TRANSFORM] = 'translate3d(0,0,0)';
                    $element[0].style.width = '';
                    content.offsetX = 0;
                }
                // reset incase left gets grabby
                //$element[0].style[ionic.CSS.TRANSFORM] = 'translate3d(0,0,0)';
            }),
            enableAnimation: function () {
                $scope.animationEnabled = true;
                $element[0].classList.add('menu-animated');
            },
            disableAnimation: function () {
                $scope.animationEnabled = false;
                $element[0].classList.remove('menu-animated');
            },
            offsetX: 0
        };

        sideMenuCtrl.setContent(content);

        // add gesture handlers
        var gestureOpts = {stop_browser_behavior: false};
        gestureOpts.prevent_default_directions = ['left', 'right'];
        var contentTapGesture = meteoric.service.ionicGesture.on('tap', onContentTap, $element, gestureOpts);
        var dragRightGesture = meteoric.service.ionicGesture.on('dragright', onDragX, $element, gestureOpts);
        var dragLeftGesture = meteoric.service.ionicGesture.on('dragleft', onDragX, $element, gestureOpts);
        var dragUpGesture = meteoric.service.ionicGesture.on('dragup', onDragY, $element, gestureOpts);
        var dragDownGesture = meteoric.service.ionicGesture.on('dragdown', onDragY, $element, gestureOpts);
        var releaseGesture = meteoric.service.ionicGesture.on('release', onDragRelease, $element, gestureOpts);

        // Cleanup
        $($scope).on('$destroy', function () {
            if (content) {
                content.element = null;
                content = null;
            }
            meteoric.service.ionicGesture.off(dragLeftGesture, 'dragleft', onDragX);
            meteoric.service.ionicGesture.off(dragRightGesture, 'dragright', onDragX);
            meteoric.service.ionicGesture.off(dragUpGesture, 'dragup', onDragY);
            meteoric.service.ionicGesture.off(dragDownGesture, 'dragdown', onDragY);
            meteoric.service.ionicGesture.off(releaseGesture, 'release', onDragRelease);
            meteoric.service.ionicGesture.off(contentTapGesture, 'tap', onContentTap);
        });
    });
});

Template.ionSideMenuContent.helpers({
    classes: function () {
        var classes = ['menu-content', 'snap-content', 'pane'];
        return classes.join(' ');
    }
});
