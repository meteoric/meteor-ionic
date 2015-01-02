Template.ionNavBackButton.events({
  'click': function (event) {
    $('[data-nav-container]').addClass('nav-view-direction-back');
    $('[data-navbar-container]').addClass('nav-bar-direction-back');

    if (this.backUrl) {
      Router.go(this.backUrl);
    } else {
      window.history.back();
    }
  }
});

Template.ionNavBackButton.rendered = function () {
  this.backURL = null;

  if (this.href) {
    this.backURL = this.href;
  }

  if (this.path) {
    this.backURL = Router.routes[this.path].path(Template.parentData(1));
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
