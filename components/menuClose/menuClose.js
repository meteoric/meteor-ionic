let menuClose = function($elements, $scope) {
    if (!$elements || !$elements.length) return;

    $elements.each(function() {
        let $element = $(this);
        $element.bind('click', function () {
            let sideMenuCtrl = $.inheritedData($element[0], '$ionSideMenusController');
            if (sideMenuCtrl) {
                /*$ionicHistory.nextViewOptions({
                 historyRoot: true,
                 disableAnimate: true,
                 expire: 300
                 });*/
                // if no transition in 300ms, reset nextViewOptions
                // the expire should take care of it, but will be cancelled in some
                // cases. This directive is an exception to the rules of history.js
                Meteor.setTimeout(function () {
                    /*$ionicHistory.nextViewOptions({
                     historyRoot: false,
                     disableAnimate: false
                     });*/
                }, 300);
                sideMenuCtrl.close();
            }
        });
    });
};
meteoric._directives.menuClose = menuClose;