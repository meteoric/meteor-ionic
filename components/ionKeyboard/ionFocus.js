Meteor.startup(function() {
  if (Meteor.isCordova) {

    // Scroll to make input on top of the page
    // #TODO Correct behavior should be: if the input is behind the keyboard, scroll to make it visible on top of the keyboard
    var scrollToFocusedElement = function($focused) {
      $focused = $focused || $(':focus');
      var $container = $($focused.parents('.content.overflow-scroll').get(0));
      if (!$focused.length || !$container.length) return;
      var contentOffset = $container.offset().top;
      var padding = 10;
      var scrollTo = $container.scrollTop() + $focused.offset().top - contentOffset - padding;
      setTimeout(function() {
        $container.animate({ scrollTop: scrollTo }, 400, function() {
          // #TODO fix floating input cursor bug (https://github.com/twbs/bootstrap/issues/14708, https://github.com/cubiq/iscroll/issues/178)
          var display = $focused.css('display');
          $focused.css({ display: 'none' }).css({ display: display });
        });
        // $container.scrollTop(scrollTo);
      }, 0);
    }

    var scrollPosStart, scrollPosEnd, scrollDistance, scrollHappened, scrollThreshold = 10;

    // Fix for input not getting focused on long touch (more than a few ms)
    $(document).on('touchstart', function(event) {
      scrollPosStart = $('.content.overflow-scroll').scrollTop();
    });

    $(document).on('touchend', function(event) {
      scrollPosEnd = $('.content.overflow-scroll').scrollTop();
      scrollDistance = Math.abs(scrollPosStart - scrollPosEnd);
      scrollHappened = scrollDistance > scrollThreshold;
      var $target = $(event.target);
      var isInput = _.contains(['INPUT', 'TEXTAREA'], event.target.tagName);
      var isFocused = $target.is(':focus');
      if (!isInput || isFocused || scrollHappened) return;
      $target.focus();
    });

    $(document).delegate('input, textarea', 'focus', function(event) {
      scrollToFocusedElement($(event.currentTarget));
    });

  }
});
