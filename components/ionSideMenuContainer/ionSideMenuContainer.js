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
});

Template.ionSideMenuContainer.onRendered(function () {
  $snapperEl = this.$('.snap-content');
  if (!$snapperEl) {
    return;
  }

  var disable;
  if (this.side == 'both') {
    disable = 'none';
  }
  if (this.side == 'left') {
    disable = 'right';
  }
  if (this.side == 'right') {
    disable = 'left';
  }

  IonSideMenu.snapper = new Snap({
    element: $snapperEl.get(0),
    disable: disable,
    touchToDrag: this.dragContent
  });

  IonSideMenu.enable = () => IonSideMenu.snapper.enable();
  IonSideMenu.disable = () => IonSideMenu.snapper.disable();
});

Template.ionSideMenuContainer.onDestroyed(function () {
  IonSideMenu.snapper = null;
});
