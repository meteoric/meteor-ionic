Template.ionInfiniteScroll.onCreated(function() {
    this.onInfinite = null;
    this.distance = "1%";
    this.enable = new ReactiveVar(true);
    this.immediateCheck = true;

    this.isLoading = new ReactiveVar(false);

    this.finishInfiniteScroll = null;

    this.autorun(() => {
        if (!Template.currentData()) return;  // Don't do a thing if data context don't exist.
        this.onInfinite = Template.currentData().onInfinite;
        this.distance = !_.isUndefined(Template.currentData().distance) ? Template.currentData().distance : "1%";
        this.enable.set(!_.isUndefined(Template.currentData().enable) ? Template.currentData().enable : true);
        this.immediateCheck = !!Template.currentData().immediateCheck;
    });
});

Template.ionInfiniteScroll.onRendered(function() {
    let parentTemplate = this.parent(1, true);

    this.autorun(() => {
        if (!parentTemplate.controller.get()) return;

        let element = this.$('ion-infinite-scroll').get(0);
        let $scope = {};
        let $attrs = {
            immediateCheck: this.immediateCheck,
            onInfinite: this.onInfinite,
            distance: this.distance
        };
        var infiniteScrollCtrl = new meteoric.controller.ionInfiniteScroll($scope, $attrs, element, Meteor.setTimeout);
        var scrollCtrl = infiniteScrollCtrl.scrollCtrl = parentTemplate.controller.get();
        var jsScrolling = infiniteScrollCtrl.jsScrolling = !scrollCtrl.isNative();

        // if this view is not beneath a scrollCtrl, it can't be injected, proceed w/ native scrolling
        if (jsScrolling) {
            infiniteScrollCtrl.scrollView = scrollCtrl.scrollView;
            $scope.scrollingType = 'js-scrolling';
            //bind to JS scroll events
            scrollCtrl.$element.on('scroll', infiniteScrollCtrl.checkBounds);
        } else {
            // grabbing the scrollable element, to determine dimensions, and current scroll pos
            var scrollEl = ionic.DomUtil.getParentOrSelfWithClass($element[0].parentNode, 'overflow-scroll');
            infiniteScrollCtrl.scrollEl = scrollEl;
            // if there's no scroll controller, and no overflow scroll div, infinite scroll wont work
            if (!scrollEl) {
                throw 'Infinite scroll must be used inside a scrollable div';
            }
            //bind to native scroll events
            infiniteScrollCtrl.scrollEl.addEventListener('scroll', infiniteScrollCtrl.checkBounds);
        }

        // Optionally check bounds on start after scrollView is fully rendered
        if (this.immediateCheck) {
            Meteor.setTimeout(function () {
                infiniteScrollCtrl.checkBounds();
            });
        }
    });

    // todo: reactive? We are perfectly capable of such
});

Template.ionInfiniteScroll.onDestroyed(function() {
    this.enable.set(false);

    this.finishInfiniteScroll && $(window).off('scroll.infiniteScrollComplete', this.finishInfiniteScroll);
});

Template.ionInfiniteScroll.helpers({
    enable: function() { return Template.instance().enable.get(); },
    active: function() { return Template.instance().isLoading.get(); }
});