Template.ionTab.events({
  'click': function (event, template) {
  
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
    
    // kept for backwards compatibility
    if (this.path) {
      return this.path;
    }
  },

  isActive: function () {
    var route = RouterLayer.getPath(true);
    if(route  === this.path){
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
