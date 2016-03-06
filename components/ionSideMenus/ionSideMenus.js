Template.ionSideMenus.onCreated(function() {
  this.sideMenuCtrl = this.parent(1, true).sideMenuCtrl;
});

Template.ionSideMenus.helpers({
  classes: function () {
    var classes = ['view', 'snap-drawers'];
    return classes.join(' ');
  }
});
