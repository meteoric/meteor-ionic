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

    this.hasBouncing = new ReactiveVar(true);

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
});

Template.ionSideMenuContainer.onDestroyed(function () {
    Object.setPrototypeOf(this.scope, null);
    $(this.scope).trigger('$destroy');
});
