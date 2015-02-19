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
    var view = Blaze.renderWithData(this.template, data, $('.ionic-body').get(0));

    if (!this.view[templateName]) {
      this.view[templateName] = [view];
    } else {
      this.view[templateName].push(view);
    }

    this.views.push(templateName);

    var $modalBackdrop = $(view.firstNode());

    if (this.views.length === 1) {
      $modalBackdrop.addClass('active');
    }

    var $modalEl = $modalBackdrop.find('.modal').eq(0);
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
    var view = this.view[templateName].pop();
    var $modalBackdrop = $(view.firstNode());

    if (!this.views.length) {
      $modalBackdrop.removeClass('active');
    }

    var $modalEl = $modalBackdrop.find('.modal').eq(0);
    $modalEl.addClass(this.leaveClasses.join(' '));

    Meteor.setTimeout(function() {
      $modalEl.addClass(this.leaveActiveClass);
    }.bind(this), 10);

    $modalEl.on(this.transitionEndEvent, function () {
      $('body').removeClass('modal-open');
      Blaze.remove(view);
    }.bind(this));
  }
};

Template.ionModal.created = function () {
  this.data = this.data || {};
  this.customTemplate = this.data.customTemplate || false;
  this.title = this.data.title;
  this.title = this.data.closeText;
  this.focusFirstInput = _.isUndefined(this.data.focusFirstInput) ? true : this.data.focusFirstInput;
  this.animation = this.data.animation || 'slide-in-up';
};

Template.ionModal.rendered = function () {
  if (this.focusFirstInput) {
    Meteor.setTimeout(function () {
      this.$('input:first').focus();
    }.bind(this), 600);
  }

  $(window).on('keyup.ionModal', function(event) {
    event.stopImmediatePropagation();
    if (event.which == 27) {
      IonModal.close();
    }
  });
};

Template.ionModal.destroyed = function () {
  if (!IonModal.views.length) {
    $(window).off('keyup.ionModal');
  }
};

Template.ionModal.helpers({
  barClass: function () {
    var classes = ['bar', 'bar-header', 'bar-stable'];

    return classes.join(' ');
  },

  titleClass: function () {
    var classes = ['title'];

    if (Platform.isAndroid()) {
      classes.push('title-left');
    }

    return classes.join(' ');
  },

  title: function () {
    return this.title;
  },

  closeText: function () {
    return this.closeText;
  },

  animation: function () {
    if (this.animation) {
      return this.animation;
    } else {
      return 'slide-in-up';
    }
  },

  customTemplate: function () {
    return this.customTemplate;
  },

  classes: function () {
    var classes = ['modal'];

    if (this.class) {
      classes.push(this.class);
    }

    return classes.join(' ');
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
