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
  var container = this.find('[data-nav-container]');
  $('[data-nav-container]').attr('nav-view-direction', 'forward');
  container._uihooks = {
    // Override onDestroyed so that it won't remove itself immediately.
    removeElement: function(node) {}
  };
};

Template.ionNavView.helpers({
  transition: function () {
    return Template.instance().transition;
  }
});
