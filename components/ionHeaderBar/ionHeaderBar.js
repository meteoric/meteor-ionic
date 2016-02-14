IonHeaderBar = {
    alignTitle: function () {
        var align = this.alignTitle;
        var $title = this.$('.title');

        if (Platform.isAndroid() && !this.alignTitle) {
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
        var $leftButton = this.$('.buttons').eq(0);
        var $rightButton = this.$('.buttons').eq(1);

        // Find out which button is wider,
        // use that to offset the title on both sides
        let leftButtonWidth = $leftButton.outerWidth();
        let rightButtonWidth = $rightButton.outerWidth();

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

Template.ionHeaderBar.onCreated(function() {
    this.alignTitle = this.data? this.data.alignTitle : null;
});

Template.ionHeaderBar.onRendered(function () {
    METEORIC.hasHeader.set(true);
    IonHeaderBar.alignTitle.call(this);
    IonHeaderBar.positionTitle.call(this);
});

Template.ionHeaderBar.onDestroyed(function () {
    METEORIC.hasHeader.set(false);
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
