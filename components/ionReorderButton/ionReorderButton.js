Template.ionReorderButton.onCreated(function() {
    let parent = this.parent((t) => t.view.name === "Template.ionItem", true);
    if (!parent) { throw "Template.ionReorderButton must be a descendant of Template.ionItem."; }
    _.extend(this, {
        showReorder: parent.showReorder
    });
});

Template.ionReorderButton.helpers({
    showReorder: function() {
        return Template.instance().showReorder.get();
    }
});