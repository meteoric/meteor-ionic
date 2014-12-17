Template.actionSheet.events({
  'click [data-action=showActionSheet]': function (event, template) {
    IonActionSheet.show({
      titleText: 'ActionSheet Example',
      buttons: [
        { text: 'Share <i class="icon ion-share"></i>' },
        { text: 'Move <i class="icon ion-arrow-move"></i>' },
      ],
      destructiveText: 'Delete',
      cancelText: 'Cancel',
      cancel: function() {
        alert('Cancelled!');
      },
      buttonClicked: function(index) {
        if (index === 0) {
          alert('Shared!');
        }
        if (index === 1) {
          alert('Moved!');
        }
        return true;
      },
      destructiveButtonClicked: function() {
        alert('Destructive Action!');
        return true;
      }
    });
  }
});
