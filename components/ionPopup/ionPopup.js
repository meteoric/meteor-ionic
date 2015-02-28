IonPopup = {
  show: function (options) {

    this.template = Template[options.templateName];

    var buttons = [];
    for (var i = 0; i < options.buttons.length; i++) {
      var button = options.buttons[i];
      buttons.push({
        text: button.text,
        type: button.type,
        index: i
      });
    }

    var data = {
      title: options.title,
      subTitle: options.subTitle,
      buttons: buttons
    };

    console.log(data);

    this.callbacks = {
      cancel: options.cancel,
      destructiveButtonClicked: options.destructiveButtonClicked,
      buttonClicked: options.buttonClicked
    };

    this.view = Blaze.renderWithData(this.template, data, $('.ionic-body').get(0));
    $('body').addClass('popup-open');

    var $backdrop = $(this.view.firstNode());
    $backdrop.addClass('visible active');
    var $popup = $backdrop.find('.popup-container');
    $popup.addClass('popup-showing active');
  },

  hide: function () {
    var $backdrop = $(this.view.firstNode());

    $popup.removeClass('popup-showing active');
    $backdrop.removeClass('active visible');
    Blaze.remove(this.view);
  }
};

Template.ionPopup.rendered = function () {
  $(window).on('keyup.ionPopup', function(event) {
    if (event.which == 27) {
      IonPopup.hide();
    }
  });
};

Template.ionPopup.destroyed = function () {
  $(window).off('keyup.ionPopup');
};

Template.ionPopup.events({
  // Handle clicking the backdrop
  'click': function (event, template) {
    console.log('test');
    if ($(event.target).hasClass('popup-container')) {
      IonActionSheet.hide();
    }
  },

  'click [data-index]': function (event, template) {
    var index = $(event.target).data('index');
    IonPopup.buttonClicked(index);
  },

  'click [data-destructive]': function (event, template) {
    IonPopup.destructiveButtonClicked();
  },

  'click [data-cancel]': function (event, template) {
    IonPopup.cancel();
  }

});
