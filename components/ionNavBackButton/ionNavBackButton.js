Template.ionNavBackButton.events({
  'click': function (event, template) {
    $('[data-nav-container]').addClass('nav-view-direction-back');
    $('[data-navbar-container]').addClass('nav-bar-direction-back');

    if (template.data.backUrl) {
      Router.go(template.data.backUrl);
    } else {
      window.history.back();
    }
  }
});

Template.ionNavBackButton.rendered = function () {
  this.data.backUrl = null;

  if (this.data.href) {
    this.data.backUrl = this.data.href;
  }

  if (this.data.path) {
    this.data.backUrl = Router.routes[this.data.path].path(Template.parentData(1));
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
