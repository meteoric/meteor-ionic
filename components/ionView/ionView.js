Template.ionView.rendered = function () {
  // Reset our transition preference
  IonNavigation.skipTransitions = false;

  // Reset our scroll position
  var routePath = Platform.withRouter({
    'iron:router': function () {
      return Router.current().route.path(Router.current().params);
    },
    
    'meteorhacks:flow-router': function () {
      return FlowRouter.current().path;
    }
  });
  
  if(IonScrollPositions[routePath]) {
    $('.overflow-scroll').not('.nav-view-leaving .overflow-scroll').scrollTop(IonScrollPositions[routePath]);
    delete IonScrollPositions[routePath];
  }
};

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
