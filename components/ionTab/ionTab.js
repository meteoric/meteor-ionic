Template.ionTab.events({
  'click': function (event, template) {
    // If the tab's content is being rendered inside of a ionNavView
    // we don't want to slide it in when switching tabs
    IonNavigation.skipTransitions = true;
  }
});

Template.ionTab.helpers({
  url: function () {
    if (this.href) {
      return this.href;
    }

    if (this.path) {
      return Router.routes[this.path].path(Template.parentData(1));
    }
  },

  isActive: function () {
    // reactive data source
    var currentPath = Router.current().route.path();
    
    if(this.href && this.href === currentPath){
      return 'active';
    }

    if (this.path && Router.routes[this.path].path(Template.parentData(1)) === currentPath) {
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
  }
});
