Template.ionItem.helpers({
  itemClasses: function () {
    var classes = ['item'];

    if (this.class) {
      var customClasses = this.class.split(' ');
      _(customClasses).each(function (customClass) {
        classes.push(customClass);
      });
    }

    if (this.iconLeft) {
      classes.push('item-icon-left');
    }

    if (this.iconRight) {
      classes.push('item-icon-right');
    }

    return classes.join(' ');
  },

  contentClasses: function () {
    var classes = ['item-content'];

    return classes.join(' ');
  },

  isAnchor: function () {
    return !_.isUndefined(this.href) || !_.isUndefined(this.path);
  },

  target: function () {
    return this.target;
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
