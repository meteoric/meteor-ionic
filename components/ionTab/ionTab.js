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

    if (this.path && Router.routes[this.path]) {
      return Router.routes[this.path].path(Template.parentData(1));
    }
  },

  isActive: function () {
    var currentRouteName = Router.current().route.getName();

    if (this.path && this.path === currentRouteName) {
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
