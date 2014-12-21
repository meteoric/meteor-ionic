isIOS = function () {
  return !!navigator.userAgent.match(/iPad/i) || !!navigator.userAgent.match(/iPhone/i) || !!navigator.userAgent.match(/iPod/i);
}

isAndroid = function () {
  return navigator.userAgent.indexOf('Android') > 0;
}

isWindowsPhone = function () {
  return navigator.userAgent.indexOf('Windows Phone') > -1;
}

Template.ionBody.helpers({
  platformClasses: function () {
    var classes = ['grade-a'];

    if (Meteor.isCordova) {
      classes.push('platform-cordova');
    }
    if (Meteor.isClient) {
      classes.push('platform-web');
    }
    if (Meteor.isCordova && isIOS()) {
      classes.push('platform-ios');
    }
    if (Meteor.isCordova && isAndroid()) {
      classes.push('platform-android');
    }
    if (Meteor.isCordova && isWindowsPhone()) {
      classes.push('platform-windowsphone');
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
    $('[data-nav-container]').addClass($(event.target).data('nav-direction'));
  }
});
