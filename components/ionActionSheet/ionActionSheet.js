IonActionSheet = {
  transitionEndEvent: 'transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd',

  show: function (options) {
    this.template = Template.ionActionSheet;

    var buttons = [];
    for (var i = 0; i < options.buttons.length; i++) {
      var button = options.buttons[i];
      buttons.push({
        text: button.text,
        index: i
      });
    }

    var data = {
      titleText: options.titleText,
      destructiveText: options.destructiveText,
      cancelText: options.cancelText,
      buttons: buttons
    };

    this.callbacks = {
      cancel: options.cancel,
      destructiveButtonClicked: options.destructiveButtonClicked,
      buttonClicked: options.buttonClicked
    };

    this.view = Blaze.renderWithData(this.template, data, $('.ionic-body').get(0));
    $('body').addClass('action-sheet-open');

    var $backdrop = $(this.view.firstNode());
    $backdrop.addClass('active');

    var $wrapper = $backdrop.find('.action-sheet-wrapper');
    Meteor.setTimeout(function () {
      $wrapper.addClass('action-sheet-up');
    }, 20);
  },

  cancel: function () {
    this.close(this.callbacks.cancel);
  },

  buttonClicked: function (index) {
    var callback = this.callbacks.buttonClicked;
    if (callback(index) === true) {
      IonActionSheet.close();
    }
  },

  destructiveButtonClicked: function () {
    var callback = this.callbacks.destructiveButtonClicked;
    if (callback() === true) {
      IonActionSheet.close();
    }
  },

  close: function (callback) {
    var $backdrop = $(this.view.firstNode());
    $backdrop.removeClass('active');

    var $wrapper = $backdrop.find('.action-sheet-wrapper');
    Meteor.setTimeout(function() {
      $wrapper.removeClass('action-sheet-up');
    }.bind(this), 10);

    $wrapper.on(this.transitionEndEvent, function () {
      $('body').removeClass('action-sheet-open');
      Blaze.remove(this.view);

      if (typeof(callback) === 'function') {
        callback();
      }
    }.bind(this));
  }
};

Template.ionActionSheet.rendered = function () {
  $(window).on('keyup.ionActionSheet', function(event) {
    if (event.which == 27) {
      IonActionSheet.cancel();
    }
  });
};

Template.ionActionSheet.destroyed = function () {
  $(window).off('keyup.ionActionSheet');
};

Template.ionActionSheet.events({
  // Handle clicking the backdrop
  'click': function (event, template) {
    if ($(event.target).hasClass('action-sheet-backdrop')) {
      IonActionSheet.cancel();
    }
  },

  'click [data-index]': function (event, template) {
    var index = $(event.target).data('index');
    IonActionSheet.buttonClicked(index);
  },

  'click [data-destructive]': function (event, template) {
    IonActionSheet.destructiveButtonClicked();
  },

  'click [data-cancel]': function (event, template) {
    IonActionSheet.cancel();
  }

});
