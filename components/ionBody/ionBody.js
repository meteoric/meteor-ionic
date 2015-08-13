Platform = {
  isIOS: function () {
    return (!!navigator.userAgent.match(/iPad/i) || !!navigator.userAgent.match(/iPhone/i) || !!navigator.userAgent.match(/iPod/i))
           || Session.get('platformOverride') === 'iOS';
  },
  isAndroid: function () {
    return navigator.userAgent.indexOf('Android') > 0
           || Session.get('platformOverride') === 'Android';
  },
  isWeb: function () {
    return !Platform.isIOS() && !Platform.isAndroid();
  },
  set: function(platform) {
    if (!_.contains(['android', 'ios', 'web'], platform)) return;
    var $ionicBody = $('.ionic-body');
    $ionicBody.removeClass('platform-web platform-cordova platform-ios platform-android');
    if (platform === 'android') {
      $ionicBody.addClass('platform-cordova platform-android');
    }
    if (platform === 'ios') {
      $ionicBody.addClass('platform-cordova platform-ios');
    }
    if (platform === 'web') {
      $ionicBody.addClass('platform-web');
    }
  },
  get: function() {
    return (Session.get('platformOverride') || '').toLowerCase();
  }
};

Template.registerHelper('isIOS', function () {
  return Platform.isIOS();
});

Template.registerHelper('isAndroid', function () {
  return Platform.isAndroid();
});

Template.registerHelper('isWeb', function () {
  return Platform.isWeb();
});

Template.ionBody.helpers({
  platformClasses: function () {
    var classes = ['grade-a'];

    if (Meteor.isCordova) {
      classes.push('platform-cordova');
    }
    if (Meteor.isClient) {
      classes.push('platform-web');
    }
    if ((Meteor.isCordova && Platform.isIOS()) || Session.get('platformOverride') === 'iOS') {
      classes.push('platform-ios');
    }
    if ((Meteor.isCordova && Platform.isAndroid()) || Session.get('platformOverride') === 'Android') {
      classes.push('platform-android');
    }

    return classes.join(' ');
  }
});

Template.ionBody.rendered = function () {
  window.addEventListener('statusTap', function() {
    $('.content.overflow-scroll').animate({
      scrollTop: 0
    }, 500);
  });
};

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
    $('[data-nav-container]').addClass('nav-view-direction-' + $(event.target).data('nav-direction'));
    $('[data-navbar-container]').addClass('nav-bar-direction-' + $(event.target).data('nav-direction'));
  },

  'click [data-ion-menu-toggle]': function (event, template) {
    if (!IonSideMenu.snapper) {
      return;
    }

    var direction;
    var $el = $(event.target);

    if ($el.data('ion-menu-toggle') !== '') {
      direction = $el.data('ion-menu-toggle');
    } else {
      direction = 'left';
    }

    if(IonSideMenu.snapper.state().state === direction){
      IonSideMenu.snapper.close();
    } else {
      IonSideMenu.snapper.open(direction);
    }
  },

  'click [data-ion-menu-close]': function (event, template) {
    if (!IonSideMenu.snapper) {
      return;
    }
    IonSideMenu.snapper.close();
  },

  'mousedown .button, touchstart .button': function (event, template) {
    $(event.target).addClass('active');
  },

  'mouseup .button, touchend .button': function (event, template) {
    $(event.target).removeClass('active');
  }
});
