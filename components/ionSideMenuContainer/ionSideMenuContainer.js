IonSideMenu = {
  snapper: null
};

Template.ionSideMenuContainer.created = function () {
  this.data = this.data || {};
  this.side = this.data.side || 'both';
  this.disableDrag = this.data.disableDrag || false;
};

Template.ionSideMenuContainer.rendered = function () {
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
    touchToDrag: !this.disableDrag
  });
};

Template.ionSideMenuContainer.destroyed = function () {
  IonSideMenu.snapper = null;
};
