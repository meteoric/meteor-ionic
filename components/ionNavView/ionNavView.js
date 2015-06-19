IonNavigation = {
  skipTransitions: false
};

Template.ionNavView.created = function () {
  this.data = this.data || {};
  Session.setDefault('ionNavDirection', 'forward');

  if (Platform.isAndroid()) {
    this.transition = 'android';
  } else {
    this.transition = 'ios';
  }

  // Allow overriding the transition
  if (this.data && this.data.transition) {
    this.transition = this.data.transition;
  }

  if (this.transition === 'ios') {
    this.transitionDuration = 450;
  } else {
    this.transitionDuration = 320;
  }
};

Template.ionNavView.rendered = function () {
  var template = this;
  var container = this.find('[data-nav-container]');

  container._uihooks = {
    insertElement: function(node, next) {
      var $node = $(node);
      if (!template.transition || !$node.hasClass('view') || IonNavigation.skipTransitions) {
        container.insertBefore(node, next);
        return;
      }

      $node.addClass('nav-view-entering nav-view-stage');
      container.insertBefore(node, next);
      Meteor.setTimeout(function() {
        $node.removeClass('nav-view-stage').addClass('nav-view-active');
      }, 0);

      Meteor.setTimeout(function () {
        $(this).removeClass('nav-view-entering');
        $('[data-nav-container]').removeClass('nav-view-direction-back').addClass('nav-view-direction-forward');
      }, template.transitionDuration);
    },

    removeElement: function(node) {
      var $node = $(node);
      if (!template.transition || !$node.hasClass('view') || IonNavigation.skipTransitions) {
        $node.remove();
        return;
      }

      $node.addClass('nav-view-leaving nav-view-stage');
      Meteor.setTimeout(function() {
        $node.removeClass('nav-view-stage').addClass('nav-view-active');
      }, 0);

      Meteor.setTimeout(function () {
        $node.remove();
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
