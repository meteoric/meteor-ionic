Template.ionTab.helpers({
  url: function () {
    if (this.href) {
      return this.href;
    }

    if (this.path) {
      return Router.routes[this.path].path(Template.parentData(1));
    }
  },

  activeIcon: function () {
    if (this.iconOn) {
      return this.iconOn;
    } else {
      return this.icon;
    }
  },

  defaultIcon: function () {
    if (this.iconOff) {
      return this.iconOff;
    } else {
      return this.icon;
    }
  }
});
