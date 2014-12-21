Template.ionNavView.created = function () {
  Session.setDefault('ionNavDirection', 'forward');

  this.animation = 'slide-left-right';
  this.animationDuration = 250;

  if (this.data && this.data.animation) {
    this.animation = this.data.animation;
  }
};

Template.ionNavView.rendered = function () {
  var template = this;

  this.find('[data-nav-container]')._uihooks = {
    insertElement: function(node, next) {
      if (!template.animation || !$(node).hasClass('view')) {
        $(node).insertBefore(next);
        return;
      }

      $(node).insertBefore(next).addClass('ng-enter');
      Meteor.setTimeout(function() {
        $(node).addClass('ng-enter-active');
      }, 10);

      Meteor.setTimeout(function () {
        $(this).removeClass('ng-enter ng-enter-active');
        $('[data-nav-container]').removeClass('reverse forward');
      }, template.animationDuration);
    },

    removeElement: function(node) {
      if (!template.animation || !$(node).hasClass('view')) {
        $(node).remove();
        return;
      }

      $(node).addClass('ng-leave');
      Meteor.setTimeout(function() {
        $(node).addClass('ng-leave-active');
      }, 10);

      Meteor.setTimeout(function () {
        $(node).removeClass('ng-leave ng-leave-active');
        $(node).remove();
        Session.set('ionNavDirection', 'forward');
      }, template.animationDuration);
    }
  };
};

Template.ionNavView.helpers({
  classes: function () {
    var classes = [Template.instance().animation];
    return classes.join(' ');
  }
});
