IonModal = {
  transitionEndEvent: 'transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd',
  animationEndEvent: 'animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd',
  enterClasses: ['ng-enter', 'slide-in-up'],
  enterActiveClass: 'ng-enter-active',
  leaveClasses: ['ng-leave', 'slide-in-up'],
  leaveActiveClass: 'ng-leave-active',

  open: function (templateName, data) {
    this.template = Template[templateName];
    this.view = Blaze.renderWithData(this.template, data, $('.ionic-body').get(0));

    var $modalEl = $(this.view.firstNode());
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
    var $modalEl = $(this.view.firstNode());
    $modalEl.addClass(this.leaveClasses.join(' '));

    Meteor.setTimeout(function() {
      $modalEl.addClass(this.leaveActiveClass);
    }.bind(this), 10);

    $modalEl.on(this.transitionEndEvent, function () {
      $('body').removeClass('modal-open');
      Blaze.remove(this.view);
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
  'click [data-dismiss=modal]': function (event, template) {
    IonModal.close();
  }
});
