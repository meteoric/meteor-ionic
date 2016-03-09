IonSideMenu = {
    snapper: null,  // Make this private in the future.

    // Note that meteor renders most deeply nested template first before the outer most.
    // Thus, if the child happens toc all any of these, before we are rendered, then
    // error occurs. To solve that, dummy functions are provided.
    enable: () => {},
    disable: () => {}
};

Template.ionSideMenuContainer.onCreated(function () {
    this.data = this.data || {};
    this.side = this.data.side || 'both';
    this.dragContent = true;

    if (typeof this.data.dragContent != 'undefined') {
        this.dragContent = this.data.dragContent
    }

    this.sideMenuCtrl = new meteoric.controller.ionicSideMenus();
    this.onScopeCreated = function() {
        this.scope.sideMenuCtrl = this.sideMenuCtrl;
    };
});

Template.ionSideMenuContainer.onRendered(function() {
    let $scope = this.scope;
    this.sideMenuCtrl.initialize($scope);

    let $element = this.$('div');
    $.data($element.get(0), '$ionSideMenusController', this.sideMenuCtrl);
});

Template.ionSideMenuContainer.onDestroyed(function () {
    Object.setPrototypeOf(this.scope, null);
    $(this.scope).trigger('$destroy');
});

Template.ionSideMenuContainer.events({
    /**
     * menu-close
     *
     * Note: To emulate the attribute menu-close directive. It
     *       is placed here. Just like the original, only child elements
     *       of DOM containing the ionSideMenusController can attain
     *       the ionSideMenusController.
     */
    'click [menu-close]': function (event, template) {
        let $element = $(event.target);
        let sideMenuCtrl = $.inheritedData($element[0], '$ionSideMenusController');
        if (sideMenuCtrl) {
            /*$ionicHistory.nextViewOptions({
             historyRoot: true,
             disableAnimate: true,
             expire: 300
             });*/
            // if no transition in 300ms, reset nextViewOptions
            // the expire should take care of it, but will be cancelled in some
            // cases. This directive is an exception to the rules of history.js
            Meteor.setTimeout( function() {
                /*$ionicHistory.nextViewOptions({
                 historyRoot: false,
                 disableAnimate: false
                 });*/
            }, 300);
            sideMenuCtrl.close();
        }
    }
});