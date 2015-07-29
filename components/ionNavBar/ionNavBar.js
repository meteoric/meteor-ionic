Template.ionNavBar.created = function () {
  this.data = this.data || {};

  if (Platform.isAndroid()) {
    this.transition = 'android';
  } else {
    this.transition = 'ios';
  }

  // Allow overriding the transition
  if (this.data.transition) {
    this.transition = this.data.transition;
  }

  if (this.transition === 'ios') {
    this.transitionDuration = 450;
  } else {
    this.transitionDuration = 200;
  }
};

Template.ionNavBar.rendered = function () {
  Session.set('hasHeader', true);

  IonHeaderBar.alignTitle.call(this);
  IonHeaderBar.positionTitle.call(this);

  var template = this;
  var container = this.find('[data-navbar-container]');
  container._uihooks = {
    insertElement: function(node, next) {
      var $node = $(node);

      if (!$node.hasClass('title') && !$node.hasClass('button') || IonNavigation.skipTransitions) {
        container.insertBefore(node, next);
        // Changing tabs skips transition animations, but we still want to update the position of the title
        IonHeaderBar.alignTitle.call(template);
        IonHeaderBar.positionTitle.call(template);
        return;
      }

      if ($node.hasClass('title')) {
        container.insertBefore(node, next);
        $node.addClass('title-entering title-stage');

        IonHeaderBar.alignTitle.call(template);
        IonHeaderBar.positionTitle.call(template);

        Meteor.setTimeout(function() {
          $node.removeClass('title-stage').addClass('title-active');
        }, 16);

        Meteor.setTimeout(function () {
          $(this).removeClass('title-entering');
          $('[data-navbar-container]').removeClass('nav-bar-direction-back').addClass('nav-bar-direction-forward');
        }, template.transitionDuration + 16);
      }

      if ($node.hasClass('button')) {
        container.insertBefore(node, next);
        $node.addClass('button-entering button-stage');
        Meteor.setTimeout(function() {
          $node.removeClass('button-stage').addClass('button-active');
        }, 16);

        Meteor.setTimeout(function () {
          $(this).removeClass('button-entering');
        }, template.transitionDuration + 16);
      }
    },

    removeElement: function(node) {
      var $node = $(node);
      if (!$node.hasClass('title') && !$node.hasClass('button') || IonNavigation.skipTransitions) {
        $node.remove();
        return;
      }

      if ($node.hasClass('title')) {
        $node.addClass('title-leaving title-stage');
        Meteor.setTimeout(function() {
          $node.removeClass('title-stage').addClass('title-active');
        }, 16);

        Meteor.setTimeout(function () {
          $node.remove();
        }, template.transitionDuration + 16);
      }

      if ($node.hasClass('button')) {
        $node.remove();
      }
    }
  };
};

Template.ionNavBar.destroyed = function () {
  Session.set('hasHeader', false);
};

Template.ionNavBar.helpers({
  classes: function () {
    var classes = ['bar', 'bar-header'];

    if (this.class) {
      classes.push(this.class);
    } else {
      classes.push('bar-stable');
    }

    return classes.join(' ');
  },

  transition: function () {
    return Template.instance().transition;
  }
});
