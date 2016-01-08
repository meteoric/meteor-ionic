Package.describe({
  name: "meteoric:ionic",
  summary: "Ionic components for Meteor. No Angular!",
  version: "0.2.0",
  git: "https://github.com/meteoric/meteor-ionic.git"
});

Cordova.depends({
  'ionic-plugin-keyboard': '1.0.8'
});

Package.onUse(function(api) {
  api.versionsFrom("1.2");
  api.use([
    "templating",
    "underscore",
    "fastclick",
    "iron:router@1.0.0",
    "tracker",
    "session",
    "jquery"
  ], "client");

  api.addFiles([
    "vendor/snap.js",
    "vendor/snap.css",
    "vendor/slick.js",
    "vendor/slick.css",
    "vendor/slip.js"
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

    "components/ionFooterBar/ionFooterBar.html",
    "components/ionFooterBar/ionFooterBar.js",

    "components/ionHeaderBar/ionHeaderBar.html",
    "components/ionHeaderBar/ionHeaderBar.js",

    "components/ionIcon/ionIcon.html",
    "components/ionIcon/ionIcon.js",

    "components/ionItem/ionItem.html",
    "components/ionItem/ionItem.js",

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

    "components/ionSideMenu/ionSideMenu.html",
    "components/ionSideMenu/ionSideMenu.js",

    "components/ionSideMenuContainer/ionSideMenuContainer.html",
    "components/ionSideMenuContainer/ionSideMenuContainer.js",

    "components/ionSideMenuContent/ionSideMenuContent.html",
    "components/ionSideMenuContent/ionSideMenuContent.js",

    "components/ionSideMenus/ionSideMenus.html",
    "components/ionSideMenus/ionSideMenus.js",

    "components/ionSlideBox/ionSlideBox.html",
    "components/ionSlideBox/ionSlideBox.js",

    "components/ionSpinner/ionSpinner.html",
    "components/ionSpinner/ionSpinner.js",

    "components/ionSlide/ionSlide.html",
    "components/ionSlide/ionSlide.js",

    "components/ionSubfooterBar/ionSubfooterBar.html",
    "components/ionSubfooterBar/ionSubfooterBar.js",

    "components/ionSubheaderBar/ionSubheaderBar.html",
    "components/ionSubheaderBar/ionSubheaderBar.js",

    "components/ionTabs/ionTabs.html",
    "components/ionTabs/ionTabs.js",

    "components/ionTab/ionTab.html",
    "components/ionTab/ionTab.js",

    "components/ionView/ionView.html",
    "components/ionView/ionView.js"

  ], "client");

  api.export("Platform");

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
