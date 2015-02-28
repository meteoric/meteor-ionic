IonPopup = {
  show: function (options) {

    this.template = Template[options.templateName];
    this.callbacks = {};
    this.callbacks.onTap = [];
    var buttons = [];

    for (var i = 0; i < options.buttons.length; i++) {
      var button = options.buttons[i];
      buttons.push({
        text: button.text,
        type: button.type,
        index: i
      });
      this.callbacks.onTap.push(button.onTap);
    }

    var data = {
      title: options.title,
      subTitle: options.subTitle,
      buttons: buttons
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
    var $popup = $backdrop.find('.popup-container');

    // $popup.removeClass('popup-showing');
    $popup.addClass('popup-hidden').removeClass('active');

    setTimeout(function(){
      $('body').removeClass('popup-open');
      Blaze.remove(this.view);
    }.bind(this), 100);
  },

  buttonClicked: function (index, event) {
    var callbacks = this.callbacks.onTap;
    if (callbacks[index](event) === true) {
      IonPopup.hide();
    }
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
    IonPopup.buttonClicked(index, event);
  }

});
