Template.ionNavView.created = function () {
  Session.setDefault('ionNavDirection', 'forward');

  if (isIOS()) {
    this.transition = 'ios';
  } else {
    this.transition = 'android';
  }

  // Allow overriding the transition
  if (this.data && this.data.transition) {
    this.transition = this.data.transition;
  }

  if (this.transition === 'ios') {
    this.transitionDuration = 450;
  } else {
    this.transitionDuration = 200;
  }
};

Template.ionNavView.rendered = function () {
  var template = this;

  this.find('[data-nav-container]')._uihooks = {
    insertElement: function(node, next) {
      if (!template.transition || !$(node).hasClass('view')) {
        $(node).insertBefore(next);
        return;
      }

      $(node).insertBefore(next).addClass('nav-view-entering nav-view-stage');
      Meteor.setTimeout(function() {
        $(node).removeClass('nav-view-stage').addClass('nav-view-active');
      }, 16);

      Meteor.setTimeout(function () {
        $(this).removeClass('nav-view-entering');
        $('[data-nav-container]').removeClass('nav-view-direction-back').addClass('nav-view-direction-forward');
      }, template.transitionDuration);
    },

    removeElement: function(node) {
      if (!template.transition || !$(node).hasClass('view')) {
        $(node).remove();
        return;
      }

      $(node).addClass('nav-view-leaving nav-view-stage');
      Meteor.setTimeout(function() {
        $(node).removeClass('nav-view-stage').addClass('nav-view-active');
      }, 16);

      Meteor.setTimeout(function () {
        $(node).remove();
        Session.set('ionNavDirection', 'forward');
      }, template.transitionDuration);
    }
  };
};

Template.ionNavView.helpers({
  transition: function () {
    return Template.instance().transition;
  }
});
