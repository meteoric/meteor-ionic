Template.ionSubheaderBar.onRendered(function () {
  Session.set('hasSubheader', true);
});

Template.ionSubheaderBar.onDestroyed(function () {
  Session.set('hasSubheader', false);
});

Template.ionSubheaderBar.helpers({
  classes: function () {
    var classes = ['bar', 'bar-subheader'];

    if (this.class) {
      classes.push(this.class);
    } else {
      classes.push('bar-stable');
    }

    if (Session.get('hasTabsTop')) {
      classes.push('has-tabs-top');
    }

    return classes.join(' ');
  }
});
