isIOS = function () {
  return !!navigator.userAgent.match(/iPad/i) || !!navigator.userAgent.match(/iPhone/i) || !!navigator.userAgent.match(/iPod/i);
}

Template.ionBody.helpers({
  platformClasses: function () {
    var classes = [];

    if (Meteor.isCordova) {
      classes.push('platform-cordova');
    }
    if (Meteor.isClient) {
      classes.push('platform-web');
    }
    if (Meteor.isCordova && isIOS()) {
      classes.push('platform-ios');
    }

    return classes.join(' ');
  }
});

Template.ionBody.events({
  'click [data-ion-modal]': function (event, template) {
    var templateName = $(event.currentTarget).data('ion-modal');
    IonModal.open(templateName, $(event.currentTarget).data());
  },

  'click [data-ion-popover]': function (event, template) {
    var templateName = $(event.currentTarget).data('ion-popover');
    IonPopover.show(templateName, $(event.currentTarget).data(), event.currentTarget);
  },

  'click [data-nav-direction]': function (event, template) {
    IonNavView.navDirection = $(event.target).data('nav-direction');
  }
});
