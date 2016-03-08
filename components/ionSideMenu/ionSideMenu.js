Template.ionSideMenu.onCreated(function() {
  // I can't think of a use case to make this reactive, or if it is even possible.
  this.side = (this.data && this.data.side) || 'left';
  this.isEnabled = new ReactiveVar(true);
  this.width = new ReactiveVar(275);

  this.autorun(() => {
    let td = Template.currentData();
    if (!td) return;
    this.isEnabled.set(!_.isUndefined(td.isEnabled) ? td.isEnabled : true);
    this.width.set(_.isNumber(td.width) ? td.width : 275);
  });
});

Template.ionSideMenu.onRendered(function() {
  let $element = this.$("ion-side-menu");
  let $scope = this.scope;
  let sideMenuCtrl = $scope.sideMenuCtrl;
  $scope.side = this.side;

  $(sideMenuCtrl).on('initialized', () => {
    var sideMenu = sideMenuCtrl[$scope.side] = new ionic.views.SideMenu({
      width: this.width.get(),
      el: $element[0],
      isEnabled: true
    });

    this.autorun(() => {
      let val = this.width.get();
      var numberVal = +val;
      if (numberVal && numberVal == val) {
        sideMenu.setWidth(+val);
      }
    });

    this.autorun(() => {
      sideMenu.setIsEnabled(!!this.isEnabled.get());
    });
  });
});

Template.ionSideMenu.onDestroyed(function() {

});


Template.ionSideMenu.helpers({
  side: function() {
    return Template.instance().side;
  }
});