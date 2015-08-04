Meteor.startup(function() {
  if (Meteor.isCordova) {

    var getScrollContainer = function($element) {
      return $($element.parents('.content.overflow-scroll').get(0));
    }

    var focusPadding = 20;
    var isBehindKeyboard = function($focused, keyboardHeight) {
      var keyboardTop = $(window).innerHeight() - keyboardHeight;
      var focusedBottom = $focused.offset().top + $focused.innerHeight();
      var focusedIsBehindKeyboard = focusedBottom > keyboardTop - focusPadding;
      return focusedIsBehindKeyboard;
    }

    var getScrollToPosition = function($focused, $container, keyboardHeight) {

      var scrollTo = $container.scrollTop() + $focused.offset().top - $container.offset().top - focusPadding;
      return scrollTo;

    }

    // Scroll to make input on top of the page
    // #TODO Correct behavior should be: if the input is behind the keyboard, scroll to make it visible on top of the keyboard
    scrollToFocusedElement = function($focused, keyboardHeight) {
      $focused = $focused || $(':focus');
      var $container = getScrollContainer($focused);
      if (!$focused.length || !$container.length) return;
      var focusedIsBehindKeyboard = isBehindKeyboard($focused, keyboardHeight);
      if (!focusedIsBehindKeyboard) return;
      var scrollTo = getScrollToPosition($focused, $container, keyboardHeight);
      setTimeout(function() {
        $container.animate({ scrollTop: scrollTo }, {
          duration: 400,
          complete: function() {
            // Fix floating input cursor bug (https://github.com/twbs/bootstrap/issues/14708, https://github.com/cubiq/iscroll/issues/178)
            var display = $focused.css('display');
            $focused.css({ display: 'none' }).css({ display: display });
          }
        });
      }, 0);
    }

    var $scrollContainer, scrollPosStart, scrollPosEnd, scrollDistance, scrollHappened, scrollThreshold = 10;

    // Trigger focus on input through touchend for long taps
    $(document).on('touchstart', function(event) {
      $scrollContainer = getScrollContainer($(event.target));
      scrollPosStart = $scrollContainer.scrollTop();
    });

    $(document).on('touchend', function(event) {
      $scrollContainer = getScrollContainer($(event.target));
      scrollPosEnd = $scrollContainer.scrollTop();
      scrollDistance = Math.abs(scrollPosStart - scrollPosEnd);
      scrollHappened = scrollDistance > scrollThreshold;
      var $target = $(event.target);
      var isInput = _.contains(['INPUT', 'TEXTAREA'], event.target.tagName);
      var isFocused = $target.is(':focus');
      if (isInput && !isFocused && !scrollHappened) $target.focus();
    });

  }
});
