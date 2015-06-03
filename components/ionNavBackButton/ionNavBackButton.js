IonScrollPositions = {};

Router.onStop(function () {
  IonScrollPositions[this.route.path(this.params)] = $('.overflow-scroll').scrollTop();
});

Template.ionNavBackButton.events({
  'click': function (event, template) {
    $('[data-nav-container]').addClass('nav-view-direction-back');
    $('[data-navbar-container]').addClass('nav-bar-direction-back');
    
    //get most up-to-date url, if it exists
    backUrl = template.getBackUrl()
    if (backUrl) {
      Router.go(backUrl);
    } else {
      window.history.back();
    }
  }
});

Template.ionNavBackButton.created = function () {
  this.data = this.data || {};
};

Template.ionNavBackButton.rendered = function () {
  var self = this;
  this.getBackUrl = function () {
    var backUrl = null;

    self.data = self.data || {};
  
    if (self.data.href) {
      backUrl = self.data.href;
    }
  
    if (self.data.path) {
      backRoute = Router.routes[self.data.path]
      if (!backRoute) {
        console.warn("back to nonexistent route: ", self.data.path);
        return;
      }
      backUrl = backRoute.path(Template.parentData(1));
    }
    return backUrl;
  };
};

Template.ionNavBackButton.helpers({
  classes: function () {
    var classes = ['buttons button button-clear back-button pull-left'];

    if (this.class) {
      classes.push(this.class);
    }

    return classes.join(' ');
  },

  icon: function () {
    if (this.icon) {
      return this.icon;
    }

    if (Platform.isAndroid()) {
      return 'android-arrow-back';
    }

    return 'ios-arrow-back';
  },

  text: function () {
    if (this.text) {
      return this.text;
    } else if(this.text !== false) {
      return 'Back';
    }
  }
});
