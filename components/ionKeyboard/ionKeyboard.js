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
  }
};

window.addEventListener('native.keyboardshow', function (event) {

  // TODO: Android is having problems
  if (Platform.isAndroid()) {
    return;
  }

  $('body').addClass('keyboard-open');
  var keyboardHeight = event.keyboardHeight;
  // event.stopPropagation();

  // Attach any elements that want to be attached
  $('[data-keyboard-attach]').each(function (index, el) {
    $(el).data('ionkeyboard.bottom', $(el).css('bottom'));
    // if ($('.comment-item').length < 2) {
    //   // $(el).css({bottom: keyboardHeight});
    //   $('.content').css({bottom: keyboardHeight});
    // }
});

  $('.new-post-footer').each(function (index, el) {
    $(el).data('ionkeyboard.bottom', $(el).css('bottom'));
    $(el).css({bottom: keyboardHeight});
  });

  // Move the bottom of the content area(s) above the top of the keyboard
  // $('.content.overflow-scroll').each(function (index, el) {
  //   $(el).data('ionkeyboard.bottom', $(el).css('bottom'));
  //   $(el).css({bottom: keyboardHeight});
  // });
  
  // window.scrollTo(0,0);

  _.defer(function() {
    // console.log("scrollup");
    // window.scrollTo(0, 0);
    // window.scrollTo(0,document.body.scrollHeight);
  });

});

Meteor.startup(function() {
  if (Meteor.isCordova) {

    // Scroll to make input on top of the page
    // #TODO Correct behavior should be: if the input is behind the keyboard, scroll to make it visible on top of the keyboard
    $(document).delegate('input, textarea', 'touchstart, focus', function(event) {
      // var $input = $(event.currentTarget);
      // var $container = $($(event.currentTarget).parents('.content.overflow-scroll').get(0));
      // var contentOffset = $container.offset().top;
      // var padding = 10;
      // var scrollTo = $container.scrollTop() + $input.offset().top - contentOffset - padding;
      // setTimeout(function() {
      //   $container.scrollTop(scrollTo);
      // }, 0);
    });

  }
});

window.addEventListener('native.keyboardhide', function (event) {
  // TODO: Android is having problems
  if (Platform.isAndroid()) {
    return;
  }

  $('input, textarea').blur();
  $('body').removeClass('keyboard-open');

  // event.stopPropagation();

  // Detach any elements that were attached
  $('[data-keyboard-attach]').each(function (index, el) {
    $(el).css({bottom: $(el).data('ionkeyboard.bottom')});
  });

  // // Reset the content area(s)
  // $('.content.overflow-scroll').each(function (index, el) {
  //   $(el).css({bottom: $(el).data('ionkeyboard.bottom')});
  // });
});
