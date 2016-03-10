Package.describe({
  name: "jandres:ionic",
  summary: "Ionic components for Meteor. No Angular!",
  version: "0.1.58",
  git: "https://github.com/JoeyAndres/meteor-ionic.git"
});


Cordova.depends({
    'ionic-plugin-keyboard': '1.0.8'
});

Package.onUse(function (api) {
    api.versionsFrom("1.0");

    api.use([
        "jandres:template-extension@4.0.5",
        "ecmascript@0.1.6",
        "templating",
        "underscore",
        "reactive-var",
        "reactive-dict",
        "fastclick",
        "iron:router@1.0.0",
        "tracker",
        "session",
        "jquery",
        "fourseven:scss@3.4.1",

        "jandres:meteoric-sass@1.2.5"
    ], "client");

    api.addFiles([
        "styles/_transitions.scss",
        "styles/main.scss"
    ], "client");

    // @see uild.config.js in ionic@1.2.4
    api.addFiles([
        "lib/meteoric.js",
        "lib/delegate.js",
        "lib/blaze.js",
        "lib/poly.js",

        // Utils
        'lib/utils/delegateService.js',
        'lib/utils/dom.js',
        'lib/utils/events.js',
        'lib/utils/gestures.js',
        'lib/utils/platform.js',
        'lib/utils/poly.js',
        'lib/utils/tap.js',
        'lib/utils/activator.js',
        'lib/utils/utils.js',
        'lib/utils/keyboard.js',
        'lib/utils/viewport.js',

        "lib/utility.js",

        // Views
        'lib/views/view.js',
        'lib/views/scrollView.js',
        'lib/views/scrollViewNative.js',
        'lib/views/listView.js',
        'lib/views/modalView.js',
        'lib/views/sideMenuView.js',
        'lib/views/sliderView.js',
        'lib/views/slidesView.js',
        'lib/views/toggleView.js',

        // Controller.
        'lib/controller/infiniteScrollController.js',
        'lib/controller/listController.js',
        'lib/controller/spinnerController.js',
        'lib/controller/scrollController.js',
        'lib/controller/sideMenuController.js',

        // Service
        'lib/service/body.js',
        'lib/service/gesture.js',
        'lib/service/platform.js',
        'lib/service/scrollDelegate.js',
        'lib/service/sideMenuDelegate.js'
    ], "client");

    api.addFiles([
        "components/ionActionSheet/ionActionSheet.html",
        "components/ionActionSheet/ionActionSheet.js",

        "components/ionBackdrop/ionBackdrop.html",
        "components/ionBackdrop/ionBackdrop.js",

        "components/ionBody/ionBody.html",
        "components/ionBody/ionBody.js",

        "components/ionContent/ionContent.html",
        "components/ionContent/ionContent.js",

        "components/ionDeleteButton/ionDeleteButton.html",
        "components/ionDeleteButton/ionDeleteButton.js",

        "components/ionFooterBar/ionFooterBar.html",
        "components/ionFooterBar/ionFooterBar.js",

        "components/ionHeaderBar/ionHeaderBar.html",
        "components/ionHeaderBar/ionHeaderBar.js",

        "components/ionInfiniteScroll/ionInfiniteScroll.html",
        "components/ionInfiniteScroll/ionInfiniteScroll.js",

        "components/ionItem/ionItem.html",
        "components/ionItem/ionItem.js",

        "components/ionItemOptions/ionItemOptions.html",
        "components/ionItemOptions/ionItemOptions.js",

        "components/ionItemContent/ionItemContent.html",
        "components/ionItemContent/ionItemContent.js",

        "components/ionKeyboard/ionKeyboard.js",
        "components/ionKeyboard/ionInputFocus.js",

        "components/ionList/ionList.html",
        "components/ionList/ionList.js",

        "components/ionListButton/ionListButton.html",
        "components/ionListButton/ionListButton.js",

        "components/ionLoading/ionLoading.html",
        "components/ionLoading/ionLoading.js",

        "components/ionModal/ionModal.html",
        "components/ionModal/ionModal.js",

        "components/ionNavBar/ionNavBar.html",
        "components/ionNavBar/ionNavBar.js",

        "components/ionOptionButton/ionOptionButton.html",
        "components/ionOptionButton/ionOptionButton.js",

        "components/ionNavBackButton/ionNavBackButton.html",
        "components/ionNavBackButton/ionNavBackButton.js",

        "components/ionNavView/ionNavView.html",
        "components/ionNavView/ionNavView.js",

        "components/ionPane/ionPane.html",
        "components/ionPane/ionPane.js",

        "components/ionPopover/ionPopover.html",
        "components/ionPopover/ionPopover.js",

        "components/ionPopup/ionPopup.html",
        "components/ionPopup/ionPopup.js",

        "components/ionRadio/ionRadio.html",
        "components/ionRadio/ionRadio.js",

        "components/ionReorderButton/ionReorderButton.html",
        "components/ionReorderButton/ionReorderButton.js",

        "components/ionScroll/ionScroll.html",
        "components/ionScroll/ionScroll.js",

        "components/ionSideMenu/ionSideMenu.html",
        "components/ionSideMenu/ionSideMenu.js",

        "components/ionSideMenuContainer/ionSideMenuContainer.html",
        "components/ionSideMenuContainer/ionSideMenuContainer.js",

        "components/ionSideMenuContent/ionSideMenuContent.html",
        "components/ionSideMenuContent/ionSideMenuContent.js",

        "components/ionSideMenus/ionSideMenus.html",
        "components/ionSideMenus/ionSideMenus.js",

        "components/ionSlides/ionSlides.html",
        "components/ionSlides/ionSlides.js",

        "components/ionSpinner/ionSpinner.html",
        "components/ionSpinner/ionSpinner.js",

        "components/ionSubfooterBar/ionSubfooterBar.html",
        "components/ionSubfooterBar/ionSubfooterBar.js",

        "components/ionSubheaderBar/ionSubheaderBar.html",
        "components/ionSubheaderBar/ionSubheaderBar.js",

        "components/ionTabs/ionTabs.html",
        "components/ionTabs/ionTabs.js",

        "components/ionTab/ionTab.html",
        "components/ionTab/ionTab.js",

        "components/ionView/ionView.html",
        "components/ionView/ionView.js",

        "components/exposeAsideWhen/exposeAsideWhen.js",
        "components/menuClose/menuClose.js",
        "components/menuToggle/menuToggle.js"
    ], "client");

    api.export("IonActionSheet");
    api.export("IonBackdrop");
    api.export("IonHeaderBar");
    api.export("IonKeyboard");
    api.export("IonLoading");
    api.export("IonModal");
    api.export("IonNavigation");
    api.export("IonPopover");
    api.export("IonPopup");
    api.export("IonSideMenu");
});
