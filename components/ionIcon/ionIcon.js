Template.ionIcon.helpers({
  classes: function () {
    var classes = ['icon'];
    classes.push('ion-' + this.icon);

    if (this.class) {
      classes.push(this.class);
    }

    return classes.join(' ');
  }
});
