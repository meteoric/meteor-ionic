Template.ionTab.events({
  'click': function (event, template) {
    if (template.data.path) {
      Session.set('ionTab.current', template.data.path);
    }

    // If the tab's content is being rendered inside of a ionNavView
    // we don't want to slide it in when switching tabs
    IonNavigation.skipTransitions = true;
  }
});

Template.ionTab.helpers({
  classes: function () {
    var classes = ['tab-item'];
    if (this.class) {
      classes.push(this.class);
    }
    if (this.badgeNumber) {
      classes.push('has-badge');
    }
    return classes.join(' ');
  },

  url: function () {
    if (this.href) {
      return this.href;
    }
    
    var data = Template.currentData();

    return Platform.withRouter({
      'iron:router': function () {
        if (this.path && Router.routes[this.path]) {
          return Router.routes[this.path].path(data);
        }
      }.bind(this),
      
      'meteorhacks:flow-router': function () {
        if (this.path) {
          return FlowRouter.path(this.path, data.params, data.query);
        }
      }.bind(this)
    });
  },

  isActive: function () {
    var ionTabCurrent = Session.get('ionTab.current');

    if (this.path && this.path === ionTabCurrent) {
      return 'active';
    }

    // The initial case where there is no localStorage value and
    // no session variable has been set, this attempts to set the correct tab
    // to active based on the router
    var parentData = Template.parentData(1);
    
    return Platform.withRouter({
      'iron:router': function () {
        var route = Router.routes[this.path];
        if (route && route.path(parentData) === ionTabCurrent) {
          return 'active';
        }
      }.bind(this),
      
      'meteorhacks:flow-router': function () {
        var path = FlowRouter.path(this.path, parentData.params, parentData.query);
        if (path === ionTabCurrent) {
          return 'active';
        }
      }.bind(this)
    });
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
  },

  badgeNumber: function () {
    return this.badgeNumber;
  },

  badgeColor: function () {
    return this.badgeColor || 'assertive';
  }
});
