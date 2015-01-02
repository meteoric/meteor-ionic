Template.ionTabs.rendered = function () {
  if ((this.data.class && this.data.class === 'tabs-top') || this.data.style === 'android') {
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
    var classes = [];

    if (this.class) {
      classes.push(this.class);
    }

    if (this.style === 'android') {
      classes.push('tabs-top tabs-striped tabs-icon-left');
    }

    if (this.style === 'ios') {
      classes.push('tabs-icon-top');
    }

    return classes.join(' ');
  }
});
