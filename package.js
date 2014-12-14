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

    "components/ionBody/ionContent.html",
    "components/ionBody/ionContent.js",

    "components/ionBody/ionFooterBar.html",
    "components/ionBody/ionFooterBar.js",

    "components/ionBody/ionHeaderBar.html",
    "components/ionBody/ionHeaderBar.js",

    "components/ionBody/ionIcon.html",
    "components/ionBody/ionIcon.js",

    "components/ionBody/ionItem.html",
    "components/ionBody/ionItem.js",

    "components/ionBody/ionList.html",
    "components/ionBody/ionList.js",

    "components/ionBody/ionModal.html",
    "components/ionBody/ionModal.js",

    "components/ionBody/ionNavView.html",
    "components/ionBody/ionNavView.js",

    "components/ionBody/ionPane.html",
    "components/ionBody/ionPane.js",

    "components/ionBody/ionRadio.html",
    "components/ionBody/ionRadio.js",

    "components/ionBody/ionSubheaderBar.html",
    "components/ionBody/ionSubheaderBar.js",

    "components/ionBody/ionTabs.html",
    "components/ionBody/ionTabs.js",

    "components/ionBody/ionView.html",
    "components/ionBody/ionView.js"
  ], "client");
});
