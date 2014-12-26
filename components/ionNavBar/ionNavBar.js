Template.ionNavBar.created = function () {
  if (isAndroid()) {
    this.transition = 'android';
  } else {
    this.transition = 'ios';
  }

  // Allow overriding the transition
  if (this.data && this.data.transition) {
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

  var align = this.alignTitle || 'center';
  var $title = this.$('.title');

  if (align === 'center') {
    $title.addClass('title-center');
  } else if (align === 'left') {
    $title.addClass('title-left');
  } else if (align === 'right') {
    $title.addClass('title-right');
  }

  // Animate the title
  var template = this;
  this.find('[data-navbar-container]')._uihooks = {
    insertElement: function(node, next) {
      var $node = $(node);

      if (!$node.hasClass('title') && !$node.hasClass('button')) {
        $node.insertBefore(next);
        return;
      }

      if ($node.hasClass('title')) {
        $node.insertBefore(next).addClass('title-entering title-stage');
        Meteor.setTimeout(function() {
          $node.removeClass('title-stage').addClass('title-active');
        }, 16);

        Meteor.setTimeout(function () {
          $(this).removeClass('title-entering');
          $('[data-navbar-container]').removeClass('nav-bar-direction-back').addClass('nav-bar-direction-forward');
        }, template.transitionDuration + 16);
      }

      if ($node.hasClass('button')) {
        $node.insertBefore(next).addClass('button-entering button-stage');
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
      if (!$node.hasClass('title') && !$node.hasClass('button')) {
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
