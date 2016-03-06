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

    this.$scope = new ReactiveDict('ionSideMenuScope');
    this._sideMenuCtrl = null;
    this.sideMenuCtrl = new ReactiveVar(null);

    this._sideMenuCtrl = new meteoric.controller.ionicSideMenus(this.$scope);
    this.sideMenuCtrl.set(this._sideMenuCtrl);
});

Template.ionSideMenuContainer.onDestroyed(function () {
    $(this._sideMenuCtrl).trigger('$destroy');
});
