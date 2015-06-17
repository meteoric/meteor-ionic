Template.ionView.onRendered(function () {
  // Reset our transition preference
  IonNavigation.skipTransitions = false;

  // Reset our scroll position
  var routePath = FlowRouter.current().path;

  if(IonScrollPositions[routePath]) {
    $('.overflow-scroll').scrollTop(IonScrollPositions[routePath]);
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
  },
  title: function () {
    if ( Template.instance().data && Template.instance().data.title ) {
      return Template.instance().data.title;
    }
  }
});
