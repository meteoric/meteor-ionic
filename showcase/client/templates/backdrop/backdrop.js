Template.backdrop.events({
  'click [data-action=showBackdrop]': function (event, template) {
    IonBackdrop.retain();

    Meteor.setTimeout(function () {
      IonBackdrop.release();
    }, 1000);
  }
});
