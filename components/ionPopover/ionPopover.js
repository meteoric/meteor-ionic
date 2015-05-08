POPOVER_BODY_PADDING = 6;

IonPopover = {
  show: function (templateName, data, button) {
    this.template = Template[templateName];
    this.view = Blaze.renderWithData(this.template, data, $('.ionic-body').get(0));

    var $backdrop = $(this.view.firstNode());
    var $popover = $backdrop.find('.popover');
    var $button = $(button);
    var $arrow = $backdrop.find('.popover-arrow');

    var bodyWidth = $('body').width();
    var bodyHeight = $(window).innerHeight();
    var buttonPosition = $button.offset();
    var buttonWidth = $button.outerWidth();
    var buttonHeight = $button.outerHeight();
    var popoverWidth = $popover.outerWidth();
    var popoverHeight = $popover.outerHeight();

    var popoverCSS = {
      marginLeft: '0',
      opacity: 1,
      left: buttonPosition.left + buttonWidth / 2 - popoverWidth / 2
    };

    if (popoverCSS.left < POPOVER_BODY_PADDING) {
      popoverCSS.left = POPOVER_BODY_PADDING;
    } else if(popoverCSS.left + popoverWidth + POPOVER_BODY_PADDING > bodyWidth) {
      popoverCSS.left = bodyWidth - popoverWidth - POPOVER_BODY_PADDING;
    }

    if (buttonPosition.top + buttonHeight + popoverHeight > bodyHeight) {
      popoverCSS.top = buttonPosition.top - popoverHeight;
      $popover.addClass('popover-bottom');
    } else {
      popoverCSS.top = buttonPosition.top + buttonHeight;
      $popover.removeClass('popover-bottom');
    }

    $backdrop.addClass('active');
    $arrow.css({
      left: buttonPosition.left + buttonWidth / 2 - $arrow.outerWidth() / 2 - popoverCSS.left + 'px'
    });
    $popover.css(popoverCSS);
  },

  hide: function () {
    if (typeof this.view !== 'undefined') {
      var $backdrop = $(this.view.firstNode());
      $backdrop.removeClass('active');
  
      var $popover = $backdrop.find('.popover');
      $popover.css({opacity: 0});
  
      Blaze.remove(this.view);
    }
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
