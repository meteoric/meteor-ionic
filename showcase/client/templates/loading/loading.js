Template.loading.events({
  'click [data-action=showLoading]': function (event, template) {
    IonLoading.show({
      // template: '<div>Connection problem.</div><br/><div>Please check your internet connection!</div>',
      delay: 100,
      duration: 3000
    });
  }
});
