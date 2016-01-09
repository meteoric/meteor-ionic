Template.ionItemOptions.onCreated(function() {
    // todo: create package that gets the width of current element, if first = last.
    // otherwise, nearest parent (which is just the parent).
    this.width = function() {
        return this.$('.item-options').width();
    };
});