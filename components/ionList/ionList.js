Template.ionList.helpers({
  classes: function () {
    var classes = ['list'];

    if (this.class) {
      var customClasses = this.class.split(' ');
      _(customClasses).each(function (customClass) {
        classes.push(customClass);
      });
    }

    return classes.join(' ');
  }
});


Template.ionList.rendered = function() {

 if (this.data && this.data.ionSortable){
  Session.set("ionSortable", true );
  var list = this.$('.list')[0]; 
  new Slip(list);
}

};


Template.ionList.events({
  'click .item-delete' : function(e, template){
    e.preventDefault();

    var target = $(e.target).closest('.item').get(0);
    var targetData = Blaze.getData(target.getElementsByClassName('item-content')[0])._id || undefined;

    template.data.ionSortable.find({}).forEach(function(item, i) {
      if (item._id === targetData) {
        template.data.ionSortable._collection.remove({
          _id: item._id
        }, function(error, result) { });
      }
    });
  },
  'slip:swipe .list, slip:beforeswipe .list, slip:beforewait .list, slip:afterswipe .list': function(e, template) {
    e.preventDefault();
  },
  'slip:beforereorder .list': function(e, template) {
    if (e.originalEvent.target.className.indexOf('instant') == -1) {
      e.preventDefault();
    }
  },
  'slip:reorder .list': function(e, template) {
    spliceIndex = e.originalEvent.detail.spliceIndex
    originalIndex = e.originalEvent.detail.originalIndex

    if (spliceIndex != originalIndex) {

      template.data.ionSortable.find({}, {
        sort: {
          order: 1
        }
      }).forEach(function(item, i) {
        template.data.ionSortable._collection.pauseObservers()
        if (item._id == Blaze.getData(e.target.getElementsByClassName('item-content')[0])._id) {
          temp = template.data.ionSortable.update({
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

          temp = template.data.ionSortable.update({
            _id: item._id
          }, {
            $set: {
              order: newOrder
            }
          })
        }
        template.data.ionSortable._collection.resumeObservers()
      })

    }
  }

});