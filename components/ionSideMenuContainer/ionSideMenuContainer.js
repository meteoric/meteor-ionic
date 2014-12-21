IonSideMenu = {
  snapper: null
};

Template.ionSideMenuContainer.rendered = function () {
  $snapperEl = this.$('.snap-content');
  if (!$snapperEl) {
    return;
  }

  IonSideMenu.snapper = new Snap({
    element: $snapperEl.get(0)
  });
};

Template.ionSideMenuContainer.destroyed = function () {
  IonSideMenu.snapper = null;
};
