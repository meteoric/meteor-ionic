Template.ionTabs.rendered = function () {
  Session.set('hasTabs', true);
};

Template.ionTabs.destroyed = function () {
  Session.set('hasTabs', false);
};

Template.ionTabs.helpers({
  classes: function () {
    var classes = ['tabs'];

    if (this.class) {
      classes.push(this.class);
    } else {
      classes.push('tabs-icon-top');
    }

    return classes.join(' ');
  }
});
