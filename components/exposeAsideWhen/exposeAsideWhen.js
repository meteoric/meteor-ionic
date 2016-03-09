let exposeAsideWhen = function($elements, $scope, $attr) {
    // require: '^ionSideMenus'
    let $window = $(window);
    let sideMenuCtrl = $scope[0].sideMenuCtrl;

    if (!sideMenuCtrl) return;

    // Setup a match media query listener that triggers a ui change only when a change
    // in media matching status occurs
    var mq = $attr.exposeAsideWhen == 'large' ? '(min-width:768px)' : $attr.exposeAsideWhen;
    var mql = $window[0].matchMedia(mq);
    mql.addListener(function () {
        onResize();
    });

    function checkAsideExpose() {
        var mq = $attr.exposeAsideWhen == 'large' ? '(min-width:768px)' : $attr.exposeAsideWhen;
        sideMenuCtrl.exposeAside($window[0].matchMedia(mq).matches);
        sideMenuCtrl.activeAsideResizing(false);
    }

    function onResize() {
        sideMenuCtrl.activeAsideResizing(true);
        debouncedCheck();
    }

    var debouncedCheck = ionic.debounce(function () {
        $scope.$apply(checkAsideExpose);
    }, 300, false);

    Meteor.setTimeout(checkAsideExpose);
};
meteoric._directives.exposeAsideWhen = exposeAsideWhen;