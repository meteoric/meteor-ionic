IonHeaderBar = {
  alignTitle: function () {

    var platform = Platform.get();
    var platformAligns = {
      android: 'left',
      ios: 'center'
    };
    var align = this.data.alignTitle || platformAligns[platform] || 'center';
    var titleClass = 'title-' + align;

    var $title = this.$('.title');
    $title.removeClass('title-left title-center title-right').addClass(titleClass);

  },

  positionTitle: function () {
    var $title = this.$('.title');
    var $leftButton = this.$('.button.pull-left');
    var $rightButton = this.$('.button.pull-right');

    // Find out which button is wider,
    // use that to offset the title on both sides
    var leftButtonWidth = 0;
    var rightButtonWidth = 0;
    if ($leftButton.length) {
      leftButtonWidth = $leftButton.outerWidth();
    }
    if ($rightButton.length) {
      rightButtonWidth = $rightButton.outerWidth();
    }

    // If we're on Android, we only care about the left button
    var margin;
    if (Platform.isAndroid()) {
      margin = leftButtonWidth;
    } else {
      margin = Math.max(leftButtonWidth, rightButtonWidth);
    }
    $title.css('left', margin);
    $title.css('right', margin);
  }
};

Template.ionHeaderBar.onCreated(function () {
  this.data = this.data || {};
});

Template.ionHeaderBar.onRendered(function () {
  Session.set('hasHeader', true);
  IonHeaderBar.alignTitle.call(this);
  IonHeaderBar.positionTitle.call(this);
});

Template.ionHeaderBar.onDestroyed(function () {
  Session.set('hasHeader', false);
});

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
