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
      classes.push('item-avatar' + (this.avatar === 'right' ? '-right' : ''));
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

    if (this.textWrap) {
      classes.push('item-text-wrap');
    }

    return classes.join(' ');
  },

  isAnchor: function () {
    return _.some([this.href, this.path, this.url, this.route], function (path) { return path != undefined });
  },

  target: function () {
    return this.target;
  },

  url: function () {
    if (this.href) {
      return this.href;
    }
    
    var parentData = Template.parentData(1);
    
    return Platform.withRouter({
      'iron:router': function () {
        if (this.path || this.url || this.route) {

          var path = _.find([this.path, this.url, this.route], function (path) { return path != undefined });
    
          if (this.query || this.hash || this.data) {
    
            var hash = {};
            hash.route = path;
            hash.query = this.query;
            hash.hash = this.hash;
            hash.data = this.data;
            var options = new Spacebars.kw(hash);
    
            // Devs may pass 'route=x' instead of 'path=' or 'url='
            // Should doing that throw an error? Not sure but we decided to
            // parse it as if the dev passed it as 'path='
            if (this.url) {
              return Blaze._globalHelpers.urlFor(options);
            } else if (this.path || this.route) {
              return Blaze._globalHelpers.pathFor(options);
            }
    
          } else {
            return Router.routes[path].path(parentData);
          }
        }
      }.bind(this),
      
      'meteorhacks:flow-router': function () {
        if (this.path) {
          return FlowRouter.path(this.path, this.params, this.query);
        }
      }.bind(this)
    });
  }
});
