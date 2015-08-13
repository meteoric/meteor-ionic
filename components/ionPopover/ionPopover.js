POPOVER_BODY_PADDING = 6;

IonPopover = {
  show: function (templateName, data, button) {
    this.template = Template[templateName];
    this.view = Blaze.renderWithData(this.template, data, $('.ionic-body').get(0));

    var $backdrop = $(this.view.firstNode());
    var $popover = $backdrop.find('.popover');
    var $arrow = $backdrop.find('.popover-arrow');
    var $body = $('.ionic-body').length ? $('.ionic-body') : $('body');
    var $button = $(button);

    var bodyWidth = $body.outerWidth();
    var bodyHeight = $body.outerHeight();
    var bodyPosition = $body.offset();
    var buttonPosition = $button.offset();
    var buttonWidth = $button.outerWidth();
    var buttonHeight = $button.outerHeight();
    var popoverWidth = $popover.outerWidth();
    var popoverHeight = $popover.outerHeight();
    var arrowWidth = $arrow.outerWidth();

    var popoverCSS = {
      marginLeft: '0',
      opacity: 1,
      left: buttonPosition.left + buttonWidth / 2 - popoverWidth / 2,
      maxWidth: bodyWidth - POPOVER_BODY_PADDING * 2
    };

    var overflowsOnLeft = popoverCSS.left < POPOVER_BODY_PADDING;
    if (overflowsOnLeft) {
      popoverCSS.left = POPOVER_BODY_PADDING;
    }

    var overflowsOnRight = popoverCSS.left + popoverWidth + POPOVER_BODY_PADDING * 2 > bodyWidth;
    if (overflowsOnRight) {
      popoverCSS.left = bodyWidth - popoverWidth - POPOVER_BODY_PADDING;
    }

    var shouldBeBelowButton = buttonPosition.top + buttonHeight + popoverHeight > bodyHeight;
    if (shouldBeBelowButton) {
      popoverCSS.top = buttonPosition.top - bodyPosition.top - popoverHeight;
      $popover.addClass('popover-bottom');
    } else {
      popoverCSS.top = buttonPosition.top - bodyPosition.top + buttonHeight;
      $popover.removeClass('popover-bottom');
    }

    var buttonRelativeCenter = buttonPosition.left - bodyPosition.left + buttonWidth / 2;
    var arrowCSS = {
      left: buttonRelativeCenter - arrowWidth / 2 - popoverCSS.left + 'px'
    };

    $backdrop.addClass('active');
    $popover.css(popoverCSS);
    $arrow.css(arrowCSS);

  },

  hide: function () {
    var $backdrop = $(this.view.firstNode());
    $backdrop.removeClass('active');

    var $popover = $backdrop.find('.popover');
    $popover.css({opacity: 0});

    Blaze.remove(this.view);
  }
};

Template.ionPopover.rendered = function () {
  $(window).on('keyup.ionPopover', function(event) {
    if (event.which == 27) {
      IonPopover.hide();
    }
  });
};

Template.ionPopover.destroyed = function () {
  $(window).off('keyup.ionPopover');
};

Template.ionPopover.events({
  // Handle clicking the backdrop
  'click': function (event, template) {
    if ($(event.target).hasClass('popover-backdrop')) {
      IonPopover.hide();
    }
  }
});
