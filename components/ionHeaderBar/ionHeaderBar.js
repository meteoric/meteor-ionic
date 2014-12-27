Template.ionHeaderBar.rendered = function () {
  Session.set('hasHeader', true);

  function alignTitle () {
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
  };

  alignTitle.call(this);
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
