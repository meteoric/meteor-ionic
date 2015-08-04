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
    var view = Blaze.renderWithData(this.template, data, $('body').get(0));

    this.views.push(templateName);
    if (!this.view[templateName]) this.view[templateName] = [];
    this.view[templateName].push(view);

    var $modalBackdrop = $(view.firstNode());
    var $modal = $('.modal', $modalBackdrop);

    if (this.views.length === 1) {
      $modalBackdrop.addClass('active');
    }

    $modal.addClass(this.enterClasses.join(' '));
    setTimeout(function () {
      $modal.addClass(this.enterActiveClass);
    }.bind(this), 50);

  },
  close: function () {

    var templateName = this.views[this.views.length-1];
    var viewArray = this.view[templateName];
    var view = viewArray[viewArray.length-1];

    var $modalBackdrop = $(view.firstNode());
    var $modal = $('.modal', $modalBackdrop);

    if (this.views.length === 0) {
      $modalBackdrop.removeClass('active');
    }

    $modal.addClass(this.leaveClasses.join(' '));
    setTimeout(function () {
      $modal.addClass(this.leaveActiveClass);
    }.bind(this), 50);

    setTimeout(function () {
      $modal.off(this.transitionEndEvent);
      $modalBackdrop.remove();
      Blaze.remove(view);
    }.bind(this), 500);

  }
};

$(document).delegate('.modal', IonModal.transitionEndEvent, function(e) {
  var $modal = $(e.target);
  if ($modal.hasClass(IonModal.enterClasses.join(' ')) || $modal.hasClass(IonModal.enterActiveClasse)) {
    $modal.removeClass(IonModal.enterClasses.join(' ')).removeClass(IonModal.enterActiveClass);
    $('body').addClass('modal-open');
  } else {
    $modal.removeClass(IonModal.leaveClasses.join(' ')).removeClass(IonModal.leaveActiveClass).off(IonModal.transitionEndEvent);
    $('body').removeClass('modal-open');
    $(e.target).parents('.modal-backdrop').remove();
    var templateName = IonModal.views.pop();
    var view = IonModal.view[templateName].pop();
    Blaze.remove(view);
  }
});

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
    var defaultClasses = ['bar', 'bar-header', 'bar-stable'].join(' ');
    var customClasses = _.isString(this.barClass) ? this.barClass : '';
    return [defaultClasses, customClasses].join(' ');
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
