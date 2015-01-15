Template.ionContent.helpers({
  classes: function () {
    var classes = ['content'];

    if (this.class) {
      classes.push(this.class);
    }

    if (this.scroll !== false) {
      classes.push('overflow-scroll');
    }

    if (Session.get('hasHeader')) {
      classes.push('has-header');
    }

    if (Session.get('hasSubheader')) {
      classes.push('has-subheader');
    }

    if (Session.get('hasTabs')) {
      classes.push('has-tabs');
    }

    if (Session.get('hasTabsTop')) {
      classes.push('has-tabs-top');
    }

    if (Session.get('hasFooter')) {
      classes.push('has-footer');
    }

    if (Session.get('hasSubfooter')) {
      classes.push('has-subfooter');
    }

    return classes.join(' ');
  }
});
