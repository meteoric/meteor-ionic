Template.ionList.helpers({
    classes: function() {
        var classes = ['list'];

        if (this.class) {
            var customClasses = this.class.split(' ');
            _(customClasses).each(function(customClass) {
                classes.push(customClass);
            });
        }

        if (this.rightEdit) {
            classes.push('list-right-editing');
        }

        if (this.leftEdit) {
            classes.push('list-left-editing');
        }

        return classes.join(' ');
    }
});


Template.ionList.rendered = function() {
    var list = this.$('.list')[0]; 
    new Slip(list);
   //TODO: ensure not creating a slip list if unnecessary
};


Template.ionList.events({
    'slip:swipe .list': function(e, template) {
        e.preventDefault();
    },
    'slip:beforereorder .list': function(e, template) {
        if (e.originalEvent.target.className.indexOf('instant') == -1) {
            e.preventDefault();
        }
    },
    'slip:beforeswipe .list': function(e, template) {
        e.preventDefault();
    },
    'slip:beforewait .list': function(e, template) {
        e.preventDefault();
    },
    'slip:afterswipe .list': function(e, template) {
        e.preventDefault();
    },
    'slip:reorder .list': function(e, template) {
        spliceIndex = e.originalEvent.detail.spliceIndex
        originalIndex = e.originalEvent.detail.originalIndex

        if (spliceIndex != originalIndex) {
           
            template.data.collection.find({}, {
                sort: {
                    order: 1
                }
            }).forEach(function(item, i) {
                //Pause the Observers while we update the order of each item.
                template.data.collection._collection.pauseObservers()
                if (item._id == Blaze.getData(e.target.getElementsByClassName('item-content')[0])._id) {
                    temp = template.data.collection.update({
                        _id: item._id
                    }, {
                        $set: {
                            order: spliceIndex
                        }
                    })
                } else {
                    if (spliceIndex > originalIndex) {
                        newOrder = ((spliceIndex >= i) && (originalIndex < i)) ? (i - 1) : i
                    } else if (spliceIndex == '0') {
                        newOrder = (originalIndex > i) ? (i + 1) : i
                    } else {
                        newOrder = ((spliceIndex <= i) && (originalIndex > i)) ? (i + 1) : i
                    }

                    temp = template.data.collection.update({
                        _id: item._id
                    }, {
                        $set: {
                            order: newOrder
                        }
                    })
                }
                template.data.collection._collection.resumeObservers()
            })

        }
    },

});