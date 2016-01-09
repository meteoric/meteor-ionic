Template.ionList.onCreated(function() {
  this.showDelete = new ReactiveVar(false);
  this.showReorder = new ReactiveVar(false);
  this.canSwipe = new ReactiveVar(false);
});

Template.ionList.onRendered(function() {
  this.autorun(() => {
    if (Template.instance().showReorder.get()) {
      IonSideMenu.disable();
      if (!this.slip) {
        var list = this.$('.list')[0];
        this.slip = new Slip(list);
      }
    } else {
      IonSideMenu.enable();
    }
  });

  this.autorun(() => {
    if (!!Template.currentData()) {
      this.canSwipe.set(!!Template.currentData().canSwipe);
      this.showReorder.set(!!Template.currentData().showReorder);
      this.showDelete.set(!!Template.currentData().showDelete);
    }
  });
});

Template.ionList.events({
  'click .item-delete' : function(e, template){
    e.preventDefault();
  },
  'slip:swipe .list, slip:beforeswipe .list, slip:beforewait .list, slip:afterswipe .list': function(e, template) {
    e.preventDefault();
  },
  'slip:beforereorder .list': function(e, template) {
    // Two case to consider:
    // 1. instant class is in ionItem. In which case, we allow reorder, but we don't show the dragging animation.
    // 2. This thing still shows the animation ven when reorder is disabled. Element goes back to orig spot, but could
    //    easily mislead the user.
    if (e.originalEvent.target.className.indexOf('instant') !== -1 ||
        !template.showReorder.get()) {
      e.preventDefault();
    }
  },
  'slip:reorder .list': function(e, template) {
    let toIndex = e.originalEvent.detail.spliceIndex;
    let fromIndex = e.originalEvent.detail.originalIndex;

    let index_change = toIndex !== fromIndex;
    let sortable = index_change && template.showReorder.get() && !!template.data.onReorder;
    if (sortable) {
      template.data.onReorder(Template.instance().children()[fromIndex], fromIndex, toIndex);
    }
  }
});