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
};

Template.ionNavView.rendered = function () {
  var container = this.find('[data-nav-container]');
  $('[data-nav-container]').attr('nav-view-direction', 'forward');
  container._uihooks = {
    // Override onDestroyed so that's children won't remove themselves immediately.
    removeElement: function(node) {
      // Worst case scenario. Remove if exceeded maximum transition duration.
      Meteor.setTimeout(() => {
        node.remove();
      }, meteoric.maximum_transition_duration);
    }
  };
};

Template.ionNavView.helpers({
  transition: function () {
    return Template.instance().transition;
  }
});
