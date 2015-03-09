IonScrollPositions = {};

Router.onStop(function () {
  IonScrollPositions[Router.current().route.getName()] = $('.overflow-scroll').scrollTop();
});

Template.ionNavBackButton.events({
  'click': function (event, template) {
    $('[data-nav-container]').addClass('nav-view-direction-back');
    $('[data-navbar-container]').addClass('nav-bar-direction-back');

    if (template.backUrl) {
      Router.go(template.backUrl);
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

  if (!this.data) {
    console.warn("no ionNavBackButton.data ", this)
    return;
  }

  if (this.data.href) {
    this.backUrl = this.data.href;
  }

  if (this.data.path) {
    this.backUrl = Router.routes[this.data.path].path(Template.parentData(1));
  }
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
