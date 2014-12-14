IonNavView = {
  currentAnimation: 'slide-ios',
  animationDuration: 250,
  animationEndEvent: 'animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd'
};

Template.ionNavView.created = function () {
  IonNavView.animation = 'slide-left-right';
  if (this.data.animation) {
    IonNavView.animation = this.data.animation;
  }

  this.title = this.data.animation;
};

Template.ionNavView.rendered = function () {
  if (this.title) {

  }

  this.find('[data-navigation-container]')._uihooks = {
    insertElement: function(node, next) {
      if (!IonNavView.currentAnimation) {
        $(node).insertBefore(next);
        return;
      }

      var classes = ['ng-enter', IonNavView.currentAnimation];

      if (IonNavView.navDirection) {
        classes.push(IonNavView.navDirection);
        IonNavView.navDirection = undefined;
      }

      $(node).insertBefore(next).addClass(classes.join(' '));

      Meteor.setTimeout(function() {
        $(node).addClass('ng-enter-active');
      }, 10);

      $(node).on(IonNavView.animationEndEvent, function () {
        $(this).removeClass(classes).removeClass('ng-enter-active').off('webkitAnimationEnd');
      });
    },

    removeElement: function(node) {
      if (!IonNavView.currentAnimation) {
        $(node).remove();
        return;
      }

      Meteor.setTimeout(function () {
        $(node).remove();
      }, IonNavView.animationDuration);
    }
  };
};
