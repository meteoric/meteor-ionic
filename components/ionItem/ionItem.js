Template.ionItem.helpers({
  itemClasses: function () {
    var classes = ['item'];

    if (this.class) {
      var customClasses = this.class.split(' ');
      _(customClasses).each(function (customClass) {
        classes.push(customClass);
      });
    }

    if (this.avatar) {
      classes.push('item-avatar');
    }

    if (this.iconLeft) {
      classes.push('item-icon-left');
    }

    if (this.iconRight) {
      classes.push('item-icon-right');
    }

    if (this.buttonLeft) {
      classes.push('item-button-left');
    }

    if (this.buttonRight) {
      classes.push('item-button-right');
    }

    return classes.join(' ');
  },

  isAnchor: function () {
    return !_.isUndefined(this.href) || !_.isUndefined(this.path) || !_.isUndefined(this.route);
  },

  target: function () {
    return this.target;
  },

  url: function () {
    if (this.href) {
      return this.href;
    }

    if ( this.path || this.route ) {
      var path;

      if(this.route){
        path = this.route;
      } else {
        path = this.path;
      }

      if ( this.query || this.hash || this.data ){

        var hash = {};
        hash.route = path;
        hash.query = this.query;
        hash.hash = this.hash;
        hash.data = this.data;
        var options = new Spacebars.kw(hash);

        if (this.urlFor){
          return Blaze._globalHelpers.urlFor(options)
        } else {
          return Blaze._globalHelpers.pathFor(options)
        }

      } else {
        return Router.routes[path].path(Template.parentData(1));
      }
    }
  }
});
