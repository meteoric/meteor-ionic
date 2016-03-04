let default_icon = () => Platform.isAndroid() ? 'android' : 'ios';

Template.ionSpinner.onCreated(function() {
  this.iconName = new ReactiveVar(default_icon());

  this.autorun(() => {
    if (!Template.currentData()) return;  // If no data-context, don't do a thing.
    this.iconName.set(!!Template.currentData().icon ? Template.currentData().icon : default_icon());
  });
});

Template.ionSpinner.helpers({
  classes: function() {
    let classes = [];
    if (this.class) {
      var customClasses = this.class.split(' ');
      _(customClasses).each(function(customClass) {
        classes.push(customClass);
      });
    }
    return classes.join(' ');
  },

  icon: function() {
   return Template.instance().iconName.get();
  }
});

// the relevant code for getting the spinner element and assigning the 
// spinner names is in the init function at the bottom of this file.
// Almost all of the rest of the code is from the ionic version. 

Template.ionSpinner.onRendered(function() {
  var iconElement = this.firstNode;
  this.data = this.data || {};

  (new meteoric.controller.ionicSpinner(this.$(iconElement), {
    icon: this.iconName.get()
  })).init();
});
