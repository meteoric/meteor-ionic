Template.ionView.onRendered(function () {
  // Reset our transition preference
  IonNavigation.skipTransitions = false;

  // Reset our scroll position
  var routePath = Router.current().route.path(Router.current().params);
  if(IonScrollPositions[routePath]) {
    $('.overflow-scroll').not('.nav-view-leaving .overflow-scroll').scrollTop(IonScrollPositions[routePath]);
    delete IonScrollPositions[routePath];
  }

  let $view = this.$('.view');
  $view.attr('nav-view', 'entering');

  addPrefixedEvent($view.get(0), 'animationend', e => {
    $view.attr('nav-view', 'active');
    $('[data-nav-container]').attr('nav-view-direction', 'forward');
    $('[data-navbar-container]').attr('nav-bar-direction', 'forward');
  });
});

Template.ionView.onDestroyed(function () {
  // Get this now, so that when Meteor.setTimeout is called, Template.instance() retrieves the correct element.
  let $view = this.$('.view');
  $view.attr('nav-view', 'leaving');

  addPrefixedEvent($view.get(0), 'animationend', e => {
    removePrefixedEvent($view.get(0), 'animationend');
    $view.remove();
  });
});

Template.ionView.helpers({
  classes: function () {
    var classes = [];

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

// For some reason jQuery is not calling these callbacks.
// TODO: Investigate jQuery.
var pfx = ["webkit", "moz", "MS", "o", ""];
function addPrefixedEvent(element, type, callback) {
  for (var p = 0; p < pfx.length; p++) {
    if (!pfx[p]) type = type.toLowerCase();
    element.addEventListener(pfx[p]+type, callback, false);
  }
}
function removePrefixedEvent(element, type, callback) {
  for (var p = 0; p < pfx.length; p++) {
    if (!pfx[p]) type = type.toLowerCase();
    element.removeEventListener(pfx[p]+type, callback, false);
  }
}
