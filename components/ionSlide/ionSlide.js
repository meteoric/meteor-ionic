Template.ionSlide.helpers({
  classes: function () {
    var classes = ['ion-slide'];

    if (this.class) {
      classes.push(this.class);
    }

    return classes.join(' ');
  }
});
