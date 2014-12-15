Package.describe({
  name: "meteoric:ionic",
  summary: "Ionic components for Meteor. No Angular!",
  version: "0.1.0",
  git: "https://github.com/meteoric/meteor-ionic.git"
});

Package.onUse(function(api) {
  api.versionsFrom("1.0");
  api.use(["templating", "underscore"], "client");
  api.addFiles([
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

    "components/ionList/ionList.html",
    "components/ionList/ionList.js",

    "components/ionModal/ionModal.html",
    "components/ionModal/ionModal.js",

    "components/ionNavView/ionNavView.html",
    "components/ionNavView/ionNavView.js",

    "components/ionPane/ionPane.html",
    "components/ionPane/ionPane.js",

    "components/ionRadio/ionRadio.html",
    "components/ionRadio/ionRadio.js",

    "components/ionSubheaderBar/ionSubheaderBar.html",
    "components/ionSubheaderBar/ionSubheaderBar.js",

    "components/ionTabs/ionTabs.html",
    "components/ionTabs/ionTabs.js",

    "components/ionView/ionView.html",
    "components/ionView/ionView.js"
  ], "client");

  api.export("IonModal");
  api.export("IonNavView");
});
