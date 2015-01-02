Template.ionTab.helpers({
  url: function () {
    if (this.href) {
      return this.href;
    }

    if (this.path) {
      return Router.routes[this.path].path(Template.parentData(1));
    }
  },

  defaultIcon: function () {
    if (this.iconOn) {
      return this.iconOn;
    } else {
      return this.icon;
    }
  },

  activeIcon: function () {
    if (this.iconOff) {
      return this.iconOff;
    } else {
      return this.icon;
    }
  }
});
