Template.ionView.onRendered(function () {
  // Reset our transition preference
  IonNavigation.skipTransitions = false;

  // Reset our scroll position
  var routePath = RouterLayer.getPath();

  if(IonScrollPositions[routePath]) {
    $('.overflow-scroll').not('.nav-view-leaving .overflow-scroll').scrollTop(IonScrollPositions[routePath]);
    delete IonScrollPositions[routePath];
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
