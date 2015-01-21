IonModal = {
  transitionEndEvent: 'transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd',
  animationEndEvent: 'animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd',
  enterClasses: ['ng-enter', 'slide-in-up'],
  enterActiveClass: 'ng-enter-active',
  leaveClasses: ['ng-leave', 'slide-in-up'],
  leaveActiveClass: 'ng-leave-active',
  view: {},
  views: [],

  open: function (templateName, data) {
    this.template = Template[templateName];
    this.view[templateName] = Blaze.renderWithData(this.template, data, $('.ionic-body').get(0));
    this.views.push(templateName);

    var $modalBackdrop = $(this.view[templateName].firstNode());
    $modalBackdrop.addClass('active');

    var $modalEl = $modalBackdrop.find('.modal');
    $modalEl.addClass(this.enterClasses.join(' '));

    $modalEl.on(this.transitionEndEvent, function () {
      $('body').addClass('modal-open');
      $modalEl.removeClass(this.enterClasses.join(' ')).removeClass(this.enterActiveClass).off('webkitAnimationEnd');
    }.bind(this));

    Meteor.setTimeout(function () {
      $modalEl.addClass(this.enterActiveClass);
    }.bind(this), 10);
  },

  close: function () {
    var templateName = this.views.pop();
    var $modalBackdrop = $(this.view[templateName].firstNode());
    $modalBackdrop.removeClass('active');

    var $modalEl = $modalBackdrop.find('.modal');
    $modalEl.addClass(this.leaveClasses.join(' '));

    Meteor.setTimeout(function() {
      $modalEl.addClass(this.leaveActiveClass);
    }.bind(this), 10);

    $modalEl.on(this.transitionEndEvent, function () {
      $('body').removeClass('modal-open');
      Blaze.remove(this.view[templateName]);
    }.bind(this));
  }
};

Template.ionModal.created = function () {
  this.title = this.data.title;
  this.focusFirstInput = this.data.focusFirstInput;
  this.animation = this.data.animation || 'slide-in-up';
};

Template.ionModal.rendered = function () {
  if (this.focusFirstInput) {
    Meteor.setTimeout(function () {
      this.$('input:first').focus();
    }.bind(this), 600);
  }

  $(window).on('keyup.ionModal', function(event) {
    if (event.which == 27) {
      IonModal.close();
    }
  });
};

Template.ionModal.destroyed = function () {
  if (IonModal.views.length === 0) {
    $(window).off('keyup.ionModal');
  }
};

Template.ionModal.helpers({
  title: function () {
    return Template.instance().title;
  },

  animation: function () {
    if (this.animation) {
      return this.animation;
    } else {
      return 'slide-in-up';
    }
  }
});

Template.ionModal.events({
  // Handle clicking the backdrop
  'click': function (event, template) {
    if ($(event.target).hasClass('modal-backdrop')) {
      IonModal.close();
    }
  },

  'click [data-dismiss=modal]': function (event, template) {
    IonModal.close();
  }
});
