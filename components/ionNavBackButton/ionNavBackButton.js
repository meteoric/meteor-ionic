Template.ionNavBackButton.helpers({
  text: function () {
    if (this.text) {
      return this.text;
    } else {
      return 'Back';
    }
  },

  url: function () {
    if (this.href) {
      return this.href;
    }

    if (this.path) {
      return Router.routes[this.path].path(Template.parentData(1));
    }
  }
});
