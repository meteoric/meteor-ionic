let menuToggle = function($elements, $scope) {
    if (!$elements || !$elements.length) return;

    $elements.each(function() {
        let $element = $(this);
        let side = $element.attr('menu-toggle');
        $($scope).on('$ionicView.beforeEnter', function (ev, viewData) {
            if (viewData.enableBack) {
                var sideMenuCtrl = $.inheritedData($element[0], '$ionSideMenusController');
                if (!sideMenuCtrl.enableMenuWithBackViews()) {
                    $element.addClass('hide');
                }
            } else {
                $element.removeClass('hide');
            }
        });

        $element.bind('click', function () {
            var sideMenuCtrl = $.inheritedData($element[0], '$ionSideMenusController');
            sideMenuCtrl && sideMenuCtrl.toggle(side);
        });
    });
};
meteoric._directives.menuToggle = menuToggle;