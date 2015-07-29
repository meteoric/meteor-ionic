IonScrollPositions = {};
/*
FlowRouter.onStop(function () {
  IonScrollPositions[this.route.path(this.params)] = $('.overflow-scroll').scrollTop();
});*/

Template.ionNavBackButton.events({
  'click': function (event, template) {
    $('[data-nav-container]').addClass('nav-view-direction-back');
    $('[data-navbar-container]').addClass('nav-bar-direction-back');

    if (template.backUrl) {
      FlowRouter.go(template.backUrl);
    } else {
      window.history.back();
    }
  }
});

Template.ionNavBackButton.created = function () {
  this.data = this.data || {};
};

Template.ionNavBackButton.rendered = function () {
  this.backUrl = null;

  this.data = this.data || {};

  if (this.data.href) {
    this.backUrl = this.data.href;
  }

  if (this.data.path) {
    backRoute = FlowRouter.routes[this.data.path]
    if (!backRoute) {
      console.warn("back to nonexistent route: ", this.data.path);
      return;
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
