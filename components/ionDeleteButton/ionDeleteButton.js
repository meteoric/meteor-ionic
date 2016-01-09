Template.ionDeleteButton.onCreated(function() {
    let parent = this.parent((t) => t.view.name === "Template.ionItem", true);
    if (!parent) { throw "Template.ionDeleteButton must be a descendant of Template.ionItem."; }
    _.extend(this, {
        showDelete: parent.showDelete
    });
});

Template.ionDeleteButton.helpers({
    showDelete: function() {
        return Template.instance().showDelete.get();
    }
});