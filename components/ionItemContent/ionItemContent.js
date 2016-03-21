Template.ionItemContent.onCreated(function() {
    let parent = this.parent((t) => t.view.name === "Template.ionItem", true);
    if (!parent) { throw "Template.ionItemContent must be a descendant of Template.ionItem."; }
    _.extend(this, {
        itemComplex: parent.itemComplex
    });
});

Template.ionItemContent.helpers({
    itemComplex: function() {
        return Template.instance().itemComplex.get();
    }
});