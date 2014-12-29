IonHeaderBar = {
  alignTitle: function () {
    var align = this.alignTitle || 'center';
    var $title = this.$('.title');

    if (align === 'center' && Platform.isAndroid()) {
      $title.addClass('title-left');
      return;
    }

    if (align === 'center') {
      $title.addClass('title-center');
    } else if (align === 'left') {
      $title.addClass('title-left');
    } else if (align === 'right') {
      $title.addClass('title-right');
    }
  },

  positionTitle: function () {
    var $title = this.$('.title');
    var $leftButton = $('.button.pull-left');

    if ($leftButton.length) {
      $title.css('left', $leftButton.outerWidth());
      $title.css('right', $leftButton.outerWidth());
    }

    var $rightButton = $('.button.pull-right');
    if ($rightButton.length) {
      $title.css('right', $rightButton.outerWidth())
    }
  }
};

Template.ionHeaderBar.rendered = function () {
  Session.set('hasHeader', true);
  IonHeaderBar.alignTitle.call(this);
  IonHeaderBar.positionTitle.call(this);
};

Template.ionHeaderBar.destroyed = function () {
  Session.set('hasHeader', false);
};

Template.ionHeaderBar.helpers({
  classes: function () {
    var classes = ['bar', 'bar-header'];

    if (this.class) {
      classes.push(this.class);
    } else {
      classes.push('bar-stable');
    }

    return classes.join(' ');
  }
});
