IonNavView = {
  animation: 'slide-left-right',
  animationDuration: 250
};

Template.ionNavView.created = function () {
  if (this.data && this.data.animation) {
    IonNavView.animation = this.data.animation;
  }
};

Template.ionNavView.rendered = function () {
  this.find('[data-navigation-container]')._uihooks = {
    insertElement: function(node, next) {
      if (!IonNavView.animation || !$(node).hasClass('view')) {
        $(node).insertBefore(next);
        return;
      }

      $(node).insertBefore(next).addClass('ng-enter');
      Meteor.setTimeout(function() {
        $(node).addClass('ng-enter-active');
      }, 10);

      Meteor.setTimeout(function () {
        $(this).removeClass('ng-enter ng-enter-active');
      }, IonNavView.animationDuration);
    },

    removeElement: function(node) {
      if (!IonNavView.animation || !$(node).hasClass('view')) {
        $(node).remove();
        return;
      }

      $(node).addClass('ng-leave');
      Meteor.setTimeout(function() {
        $(node).addClass('ng-leave-active');
      }, 10);

      Meteor.setTimeout(function () {
        $(node).removeClass('ng-leave ng-lavel-active');
        $(node).remove();
        Session.set('navDirection', undefined);
      }, IonNavView.animationDuration);
    }
  };
};


Template.ionNavView.helpers({
  classes: function () {
    console.log('calculating classes');
    var classes = [IonNavView.animation];

    if (Session.get('navDirection')) {
      classes.push(Session.get('navDirection'));
    }

    return classes.join(' ');
  }
});
