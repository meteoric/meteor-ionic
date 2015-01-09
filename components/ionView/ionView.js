Template.ionView.rendered = function () {
  // Reset our transition preference
  IonNavigation.skipTransitions = false;

  // Reset our scroll position
  var routeName = Router.current().route.getName();
  if(IonScrollPositions[routeName]) {
    $('.overflow-scroll').scrollTop(IonScrollPositions[routeName]);
    delete IonScrollPositions[routeName];
  }
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
