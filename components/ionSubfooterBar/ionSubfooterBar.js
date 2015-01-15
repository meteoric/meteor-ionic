Template.ionSubfooterBar.rendered = function () {
  Session.set('hasSubfooter', true);
};

Template.ionSubfooterBar.destroyed = function () {
  Session.set('hasSubfooter', false);
};

Template.ionSubfooterBar.helpers({
  classes: function () {
    var classes = ['bar', 'bar-subfooter'];

    if (this.class) {
      classes.push(this.class);
    } else {
      classes.push('bar-stable');
    }

    return classes.join(' ');
  }
});
