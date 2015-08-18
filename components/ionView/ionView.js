Template.ionView.onRendered(function () {
  // Reset our transition preference
  IonNavigation.skipTransitions = false;

  // Reset our scroll position
  var route = Router.current().route;
  var routeName = route && route.getName();
  if(IonScrollPositions[routeName]) {
    $('.overflow-scroll').scrollTop(IonScrollPositions[routeName]);
    delete IonScrollPositions[routeName];
  }
});

Template.ionView.helpers({
  classes: function () {
    var classes = ['view'];

    if (this.class) {
      classes.push(this.class);
    }

    return classes.join(' ');
  }
});
