Meteor.startup(function () {
  if (Meteor.isCordova) {
    IonKeyboard.disableScroll();
  }
});
//TODO: Added backward compatibility using if statements to test for newer keyboard plugin
//... cordova-plugin-keyboard. in the future we should remove ionic-plugin-keyboard 
//... and take out the if statements below.
IonKeyboard = {
  close: function () {
    if (Meteor.isCordova) {
      if(typeof(Keyboard) === "undefined"){
        cordova.plugins.Keyboard.close();
      } else {
        Keyboard.hide(); 
      }
    }
  },

  show: function () {
    if (Meteor.isCordova) {
      if(typeof(Keyboard) === "undefined"){
        cordova.plugins.Keyboard.show();
      } else {
        Keyboard.show(); 
      }
    }
  },

  hideKeyboardAccessoryBar: function () {
    if (Meteor.isCordova) {
      if(typeof(Keyboard) === "undefined"){
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      } else {
        Keyboard.hideFormAccessoryBar(true);
      }
    }
  },

  showKeyboardAccessoryBar: function () {
    if (Meteor.isCordova) {
      if(typeof(Keyboard) === "undefined"){
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
      } else {
        Keyboard.hideFormAccessoryBar(false);
      }
    }
  },

  disableScroll: function () {
    if (Meteor.isCordova) {
      if(typeof(Keyboard) === "undefined"){
        cordova.plugins.Keyboard.disableScroll(true);
      } else {
        Keyboard.disableScrollingInShrinkView(true);
      }
    }
  },

  enableScroll: function () {
    if (Meteor.isCordova) {
      if(typeof(Keyboard) === "undefined"){
        cordova.plugins.Keyboard.disableScroll(false);
      } else {
        Keyboard.disableScrollingInShrinkView(false);
      }
    }
  }
};

window.addEventListener('keyboardHeightWillChange', function (event) {
  // TODO: Android is having problems
  if (Platform.isAndroid()) {
    return;
  }

  $('body').addClass('keyboard-open');
  var keyboardHeight = event.keyboardHeight;

  // Scroll to the focused element
  scrollToFocusedElement(null, keyboardHeight);

});

window.addEventListener('keyboardDidHide', function (event) {

  // TODO: Android is having problems
  if (Platform.isAndroid()) {
    return;
  }

  // $('input, textarea').blur();
  $('body').removeClass('keyboard-open');

});


window.addEventListener('native.keyboardshow', function (event) {

  // TODO: Android is having problems
  if (Platform.isAndroid()) {
    return;
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

  // Scroll to the focused element
  scrollToFocusedElement(null, keyboardHeight);

});

window.addEventListener('native.keyboardhide', function (event) {

  // TODO: Android is having problems
  if (Platform.isAndroid()) {
    return;
  }

  // $('input, textarea').blur();
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
