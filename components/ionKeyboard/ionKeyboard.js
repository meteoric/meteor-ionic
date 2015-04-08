Meteor.startup(function () {
  if (Meteor.isCordova) {
    IonKeyboard.disableScroll();
  }
});

IonKeyboard = {
  close: function () {
    if (Meteor.isCordova) {
      cordova.plugins.Keyboard.close();
    }
  },

  show: function () {
    if (Meteor.isCordova) {
      cordova.plugins.Keyboard.show();
    }
  },

  hideKeyboardAccessoryBar: function () {
    if (Meteor.isCordova) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
  },

  showKeyboardAccessoryBar: function () {
    if (Meteor.isCordova) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
    }
  },

  disableScroll: function () {
    if (Meteor.isCordova) {
      cordova.plugins.Keyboard.disableScroll(true);
    }
  },

  enableScroll: function () {
    if (Meteor.isCordova) {
      cordova.plugins.Keyboard.disableScroll(false);
    }
  },
  scrollTo: function(elem, speed) {
    var scrollArea = $(".content.overflow-scroll");
    // scroll animation needs to be >0 so that it can scroll while the keyboard is opening...
    scrollArea.animate({
        scrollTop:  scrollArea.scrollTop() - scrollArea.offset().top + $(elem).offset().top - 10
    }, speed == undefined ? 200 : speed);

  }
};

window.addEventListener('native.keyboardshow', function (event) {
  // TODO: Android is having problems
  if (Platform.isAndroid()) {
    return;
  }

  //console.log("Keyboard Open "+event.keyboardHeight);

  var currentElement = document.activeElement;

  // If the current focused element is an input, textarea or select, scroll to it.
  if ( $(currentElement).is('input,textarea,select') ) {
    IonKeyboard.scrollTo(currentElement);
  }

  $('body').addClass('keyboard-open');
  var keyboardHeight = event.keyboardHeight;

  // Attach any elements that want to be attached
  $('[data-keyboard-attach]').each(function (index, el) {
    $(el).data('ionkeyboard.bottom', $(el).css('bottom'));
    $(el).css({bottom: keyboardHeight});
  });

  // Move the bottom of the content area(s) above the top of the keyboard
  $('.content.overflow-scroll').each(function (index, el) {
    $(el).data('ionkeyboard.bottom', $(el).css('bottom'));
    $(el).css({bottom: keyboardHeight});
  });

});

window.addEventListener('native.keyboardhide', function (event) {
  // TODO: Android is having problems
  if (Platform.isAndroid()) {
    return;
  }

  //console.log("Keyboard Closed");

  $('body').removeClass('keyboard-open');

  // Detach any elements that were attached
  $('[data-keyboard-attach]').each(function (index, el) {
    $(el).css({bottom: $(el).data('ionkeyboard.bottom')});
  });

  // Reset the content area(s)
  $('.content.overflow-scroll').each(function (index, el) {
    $(el).css({bottom: $(el).data('ionkeyboard.bottom')});
  });
});
