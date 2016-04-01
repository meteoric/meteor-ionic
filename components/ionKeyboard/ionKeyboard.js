Meteor.startup(function () {
  if (Meteor.isCordova) {
    IonKeyboard.disableScroll();
  }
});

IonKeyboard = {
  close: function () {
    if (Meteor.isCordova) {
      Keyboard.hide();
    }
  },

  show: function () {
    if (Meteor.isCordova) {
      Keyboard.show();
    }
  },

  hideKeyboardAccessoryBar: function () {
    if (Meteor.isCordova) {
      Keyboard.hideFormAccessoryBar(true);
    }
  },

  showKeyboardAccessoryBar: function () {
    if (Meteor.isCordova) {
      Keyboard.hideFormAccessoryBar(false);
    }
  },

  disableScroll: function () {
    if (Meteor.isCordova) {
      Keyboard.disableScrollingInShrinkView(true);
    }
  },

  enableScroll: function () {
    if (Meteor.isCordova) {
      Keyboard.disableScrollingInShrinkView(false);
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
