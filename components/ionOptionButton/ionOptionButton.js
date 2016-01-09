Template.ionOptionButton.events({
    'click .button': function(e, template) {
        e.stopPropagation();
        if (_.isFunction(template.data.onClick)) template.data.onClick(e);
    }
});