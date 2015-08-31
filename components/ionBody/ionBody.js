Platform = {
  isIOS: function () {
    return (!!navigator.userAgent.match(/iPad/i) || !!navigator.userAgent.match(/iPhone/i) || !!navigator.userAgent.match(/iPod/i))
           || Session.get('platformOverride') === 'iOS';
  },

  isAndroid: function () {
    return navigator.userAgent.indexOf('Android') > 0
           || Session.get('platformOverride') === 'Android';
  }
};

Template.registerHelper('isIOS', function () {
  return Platform.isIOS();
});

Template.registerHelper('isAndroid', function () {
  return Platform.isAndroid();
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
  'click [data-ion-list-toggle]': function (event, template) {
    var direction;
    var $el = $(event.target);
    if ($el.data('ion-list-toggle') !== '') {
      direction = $el.data('ion-list-toggle');
    } else {
      direction = 'left';
    }

    direction = direction.trim(); //just in case..

    switch(direction){
      case "left":
      toggleListIcons("left");
      break;
      case "right":
      toggleListIcons("right");
      break;
      case "both":
      toggleListIcons("left");
      toggleListIcons("right");
    }

    function toggleListIcons(direction){
     template.$('.list').toggleClass('list-' + direction + '-editing');
     if (template.$('.item-' + direction + '-edit').hasClass('visible')){
      template.$('.item-' + direction + '-edit').removeClass('active').delay(125).queue(function(next){
        $(this).removeClass('visible');
        next();
      });
    } else {
      template.$('.item-' + direction + '-edit').addClass('visible').delay(10).queue(function(next){
        $(this).addClass('active');
        next();
      });
    }

  }

},

'mousedown .button, touchstart .button': function (event, template) {
  $(event.target).addClass('active');
},

'mouseup .button, touchend .button': function (event, template) {
  $(event.target).removeClass('active');
}
});
