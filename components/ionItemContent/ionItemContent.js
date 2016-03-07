Template.ionItemContent.onCreated(function() {
    let parent = this.parent((t) => t.view.name === "Template.ionItem", true);
    if (!parent) { throw "Template.ionItemContent must be a descendant of Template.ionItem."; }
    _.extend(this, {
        itemComplex: parent.itemComplex,
        isAnchor: parent.isAnchor,
        url: parent.url,
        target: parent.target
    });
});

Template.ionItemContent.helpers({
    itemComplex: function() {
        return Template.instance().itemComplex.get();
    },

    isAnchor: function() {
        return !!Template.instance().isAnchor;
    },

    url: function() {
        return Template.instance().url || "";
    },

    target: function() {
        return Template.instance().target || "";
    }
});