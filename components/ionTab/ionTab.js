Template.ionTab.helpers({
  url: function () {
    if (this.href) {
      return this.href;
    }

    if (this.path) {
      return Router.routes[this.path].path(Template.parentData(1));
    }
  }
});
