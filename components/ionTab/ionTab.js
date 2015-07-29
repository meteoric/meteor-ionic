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
    
    var routeExists =_.reject(FlowRouter._routes, function(route) {
      return route.path === this.path;
    });
    // TODO: fix this syntax
    if (this.path && routeExists.length) {
      return this.path;
    }
  },

  isActive: function () {
    var ionTabCurrent = Session.get('ionTab.current');

    if (this.path && this.path === ionTabCurrent) {
      return 'active';
    }

    // The initial case where there is no localStorage value and
    // no session variable has been set, this attempts to set the correct tab
    // to active based on the router
    FlowRouter.watchPathChange();
    var route = FlowRouter.current();
    if(route && route.path === this.path){
      return 'active';
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
  },

  badgeNumber: function () {
    return this.badgeNumber;
  },

  badgeColor: function () {
    return this.badgeColor||'assertive';
  }
});
