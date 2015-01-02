Template.ionView.rendered = function () {
  // Reset our transition preference
  IonNavigation.skipTransitions = false;
};

Template.ionView.helpers({
  classes: function () {
    var classes = ['view'];

    if (this.class) {
      classes.push(this.class);
    }

    return classes.join(' ');
  }
});
