Template.ionList.onCreated(function() {
    this.showDelete = new ReactiveVar(false);
    this.showReorder = new ReactiveVar(false);
    this.canSwipe = new ReactiveVar(false);

    this.listCtrl = null;
    this.onScopeCreated = function() {
        this.listCtrl = new meteoric.controller.ionicList(this.scope);
        this.scope.listCtrl = this.listCtrl;
    };

    this.autorun(() => {
        let td = Template.currentData();
        if (!td) return;

        this.showDelete.set(!_.isUndefined(td.showDelete) ? td.showDelete : false);
        this.showReorder.set(!_.isUndefined(td.showReorder) ? td.showReorder : false);
        this.canSwipe.set(!_.isUndefined(td.canSwipe) ? td.canSwipe : false);
    });
});

Template.ionList.onRendered(function() {
    let $element = this.$("ion-list");
    let $scope = this.scope;
    var listCtrl = this.listCtrl;
    var scrollCtrl = $scope.scrollCtrl;

    let init = () => {
        var listView = listCtrl.listView = new ionic.views.ListView({
            el: $element[0],
            listEl: $element.children()[0],
            scrollEl: scrollCtrl && scrollCtrl.element,
            scrollView: scrollCtrl && scrollCtrl.scrollView,
            onReorder: (el, oldIndex, newIndex) => {
                // Make sure onReorder is called in apply cycle,
                // but also make sure it has no conflicts by doing
                // $evalAsync
                Meteor.setTimeout(() => {
                    this.data.onReorder &&
                    this.data.onReorder(this.children()[oldIndex], oldIndex, newIndex);
                });
            },
            canSwipe: function() {
                return listCtrl.canSwipeItems();
            }
        });

        $($scope).on('$destroy', function() {
            if (listView) {
                listView.deregister && listView.deregister();
                listView = null;
            }
        });

        this.autorun(() => listCtrl.canSwipeItems(this.canSwipe.get()));
        this.autorun(() => listCtrl.showDelete(this.showDelete.get()));
        this.autorun(() => listCtrl.showReorder(this.showReorder.get()));

        let wasShowDelete = this.showDelete.get();
        this.autorun(() => {
            //Only use isShown=false if it was already shown
            let isShown = this.showDelete.get();
            if (!isShown && !wasShowDelete) { return; }
            if (isShown) listCtrl.closeOptionButtons();
            listCtrl.canSwipeItems(!isShown);
            $element.children().toggleClass('list-left-editing', isShown);
            $element.toggleClass('disable-pointer-events', isShown);

            var deleteButton = $($element[0].getElementsByClassName('item-delete'));
            setButtonShown(deleteButton, listCtrl.showDelete);
            wasShowDelete = isShown;
        });

        let wasShowReorder = this.showReorder.get();
        this.autorun(() => {
            //Only use isShown=false if it was already shown
            let isShown = this.showReorder.get();
            if (!isShown && !wasShowReorder) { return; }
            if (isShown) listCtrl.closeOptionButtons();
            listCtrl.canSwipeItems(!isShown);

            $element.children().toggleClass('list-right-editing', isShown);
            $element.toggleClass('disable-pointer-events', isShown);

            var reorderButton = $($element[0].getElementsByClassName('item-reorder'));
            setButtonShown(reorderButton, listCtrl.showReorder);
            wasShowReorder = isShown;
        });

        function setButtonShown(el, shown) {
            shown() && el.addClass('visible') || el.removeClass('active');
            ionic.requestAnimationFrame(function() {
                shown() && el.addClass('active') || el.removeClass('visible');
            });
        }
    };

    // Wait for child elements to render...
    Meteor.setTimeout(init);
});

Template.ionList.events({
    'click .item-delete' : function(e, template){
        e.preventDefault();
    }
});