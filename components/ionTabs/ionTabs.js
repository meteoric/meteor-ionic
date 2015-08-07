Template.ionTabs.created = function () {
  this.data = this.data || {};
};

Template.ionTabs.rendered = function () {
  if ((this.data.class && this.data.class.indexOf('tabs-top') > -1) || this.data.style === 'android' || ( !this.data.style && Platform.isAndroid())) {
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

    if (this.style === 'android' || ( !this.style && Platform.isAndroid()) ) {
      classes.push('tabs-top tabs-striped tabs-icon-left');
    }

    if (this.style === 'ios' || ( !this.style && Platform.isIOS()) ) {
      classes.push('tabs-icon-top');
    }

    return classes.join(' ');
  }
});
