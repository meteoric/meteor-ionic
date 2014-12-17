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
        alert('CANCELLED');
      },
      buttonClicked: function(index) {
        alert('BUTTON CLICKED', index);
        return true;
      },
      destructiveButtonClicked: function() {
        alert('DESTRUCT');
        return true;
      }
    });
  }
});
