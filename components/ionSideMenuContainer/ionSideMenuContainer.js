IonSideMenu = {
  snapper: null
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
});

Template.ionSideMenuContainer.onDestroyed(function () {
  IonSideMenu.snapper = null;
});
