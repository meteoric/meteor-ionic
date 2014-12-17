Template.ionSideMenuContainer.rendered = function () {
  $snapperEl = this.$('.snap-content');
  if (!$snapperEl) {
    return;
  }

  this.snapper = new Snap({
    element: $snapperEl.get(0)
  });
};

Template.ionSideMenuContainer.events({
  'click [data-ion-menu-toggle]': function (event, template) {
    if (!template.snapper) {
      return;
    }

    var direction;
    var $el = $(event.target);

    if ($el.data('ion-menu-toggle') !== '') {
      direction = $el.data('ion-menu-toggle');
    } else {
      direction = 'left';
    }

    if(template.snapper.state().state === direction){
      template.snapper.close();
    } else {
      template.snapper.open(direction);
    }
  },

  'click [data-ion-menu-close]': function (event, template) {
    if (!template.snapper) {
      return;
    }
    template.snapper.close();
  }
});
