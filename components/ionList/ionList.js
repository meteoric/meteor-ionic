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
