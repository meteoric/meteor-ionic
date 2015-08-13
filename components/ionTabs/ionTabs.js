Template.ionTabs.onCreated(function () {
  this.data = this.data || {};
});

Template.ionTabs.onRendered(function () {
  if ((this.data.class && this.data.class === 'tabs-top') || this.data.style === 'android') {
    Session.set('hasTabsTop', true);
  } else {
    Session.set('hasTabs', true);
  }

  this.$('.tabs').children().each(function() {
    var href = $(this).attr('href');
    var current = Router.current().location.get().path;
    if(href === current){
      Session.set('ionTab.current', href);
    }
  });
});

Template.ionTabs.onDestroyed(function () {
  Session.set('hasTabs', false);
  Session.set('hasTabsTop', false);
});

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
