Template.ionTabs.rendered = function () {
  if (Platform.isAndroid()) {
    Session.set('hasTabsTop', true);
  }
  if (this.class && this.class === 'tabs-top') {
    Session.set('hasTabsTop', true);
  } else {
    Session.set('hasTabs', true);
  }
};

Template.ionTabs.destroyed = function () {
  Session.set('hasTabs', false);
  Session.set('hasTabsTop', false);
};

Template.ionTabs.helpers({
  classes: function () {
    var classes = ['tabs'];

    if (this.class) {
      classes.push(this.class);
    }

    if (Platform.isAndroid()) {
      classes.push('tabs-top tabs-striped tabs-icon-left');
    } else {
      classes.push('tabs-icon-top');
    }

    return classes.join(' ');
  }
});
