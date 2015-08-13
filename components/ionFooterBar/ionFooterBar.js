Template.ionFooterBar.onRendered(function () {
  Session.set('hasFooter', true);
});

Template.ionFooterBar.onDestroyed(function () {
  Session.set('hasFooter', false);
});

Template.ionFooterBar.helpers({
  classes: function () {
    var classes = ['bar', 'bar-footer'];

    if (this.class) {
      classes.push(this.class);
    } else {
      classes.push('bar-stable');
    }

    if (Session.get('hasTabs')) {
      classes.push('has-tabs');
    }

    return classes.join(' ');
  }
});
