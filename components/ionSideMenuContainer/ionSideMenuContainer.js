IonSideMenu = {
  snapper: null
};

Template.ionSideMenuContainer.created = function () {
    if(this.data != null && typeof this.data.side != 'undefined') {
      this.side = this.data.side;
    } else {
      this.side = 'both'
    }
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
    disable: disable
  });
};

Template.ionSideMenuContainer.destroyed = function () {
  IonSideMenu.snapper = null;
};
