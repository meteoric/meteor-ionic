IonPopup = {
  show: function (options) {
    this.template = Template.ionPopup;
    this.buttons = [];
    var innerTemplate;

    for (var i = 0; i < options.buttons.length; i++) {
      var button = options.buttons[i];
      this.buttons.push({
        text: button.text,
        type: button.type,
        index: i,
        onTap: button.onTap
      });
    }

    //Figure out if a template or just a html string was passed
    if (options.templateName) {
      innerTemplate = Template[options.templateName].renderFunction().value;
    } else {
      innerTemplate = options.template;
    }

    var data = {
      title: options.title,
      subTitle: options.subTitle,
      buttons: this.buttons,
      template: innerTemplate
    };

    this.view = Blaze.renderWithData(this.template, data, $('.ionic-body').get(0));
    $('body').addClass('popup-open');

    var $backdrop = $(this.view.firstNode());
    $backdrop.addClass('visible active');
    var $popup = $backdrop.find('.popup-container');
    $popup.addClass('popup-showing active');
  },

  close: function () {
    var $backdrop = $(this.view.firstNode());
    var $popup = $backdrop.find('.popup-container');
    $popup.addClass('popup-hidden').removeClass('active');

    setTimeout(function () {
      $('body').removeClass('popup-open');
      Blaze.remove(this.view);
    }.bind(this), 100);
  },

  buttonClicked: function (index, event) {
    var callback = this.buttons[index].onTap;
    if(callback){
      if (callback(event) === true) {
        IonPopup.close();
      }
    }
  }
};

Template.ionPopup.rendered = function () {
  $(window).on('keyup.ionPopup', function(event) {
    if (event.which == 27) {
      IonPopup.close();
    }
  });
};

Template.ionPopup.destroyed = function () {
  $(window).off('keyup.ionPopup');
};

Template.ionPopup.events({
  // Handle clicking the backdrop
  'click': function (event, template) {
    if ($(event.target).hasClass('popup-container')) {
      IonPopup.close();
    }
  },

  'click [data-index]': function (event, template) {
    var index = $(event.target).data('index');
    IonPopup.buttonClicked(index, event);
  }

});
