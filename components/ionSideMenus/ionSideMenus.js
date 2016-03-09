let ionSideMenusDefault = {
  enableMenuWithBackViews: true
};

Template.ionSideMenus.onRendered(function() {
  this.enableMenuWithBackViews = new ReactiveVar(ionSideMenusDefault.enableMenuWithBackViews);

  this.autorun(() => {
    let td = Template.currentData();
    if (!td) return;

    this.enableMenuWithBackViews.set(
        !_.isUndefined(td.enableMenuWithBackViews) ?
            td.enableMenuWithBackViews :
            ionSideMenusDefault.enableMenuWithBackViews);
  });
});

Template.ionSideMenus.onRendered(function() {
  let $scope = this.scope;
  let $ionicBody = meteoric.service.ionicBody();
  let ctrl = $scope.sideMenuCtrl;

  $(ctrl).on('initialized', () => {
    // Reactive, unlike the original.
    this.autorun(() => {
      ctrl.enableMenuWithBackViews(this.enableMenuWithBackViews.get());
    });

    $($scope).on('$ionicExposeAside', function (evt, isAsideExposed) {
      if (!$scope.$exposeAside) $scope.$exposeAside = {};
      $scope.$exposeAside.active = isAsideExposed;
      $ionicBody.enableClass(isAsideExposed, 'aside-open');
    });

    $($scope).on('$ionicView.beforeEnter', function (ev, d) {
      if (d.historyId) {
        $scope.$activeHistoryId = d.historyId;
      }
    });

    $($scope).on('$destroy', function () {
      $ionicBody.removeClass('menu-open', 'aside-open');
    });
  });
});