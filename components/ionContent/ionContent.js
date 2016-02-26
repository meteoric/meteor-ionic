Template.ionContent.onCreated(function() {
    this.ionSideMenuContainerParent = this.parent((t) => t.view.name === "Template.ionSideMenuContainer", true);

    this.scroller = null;

    _.extend(this, {
        hasBouncing: (!!this.ionSideMenuContainerParent && this.ionSideMenuContainerParent.hasBouncing) || new ReactiveVar(null)
    });

    this.autorun(() => {
        if (!Template.currentData()) return;
        let hasBouncing = Template.currentData().hasBouncing;
        if (!!this.ionSideMenuContainerParent) {
            this.ionSideMenuContainerParent.hasBouncing.set(hasBouncing);
        }
    });
});

Template.ionContent.helpers({
    hasHeader: function() { return METEORIC.hasHeader.get(); },

    hasFooter: function() { return METEORIC.hasFooter.get(); },

    classes: function () {
        var classes = ['content'];

        if (this.class) {
            classes.push(this.class);
        }

        if (this.scroll !== false) {
            classes.push('overflow-scroll');
        }

        if (Session.get('hasSubheader')) {
            classes.push('has-subheader');
        }

        if (Session.get('hasTabs')) {
            classes.push('has-tabs');
        }

        if (Session.get('hasTabsTop')) {
            classes.push('has-tabs-top');
        }

        if (Session.get('hasFooter')) {
            classes.push('has-footer');
        }

        if (Session.get('hasSubfooter')) {
            classes.push('has-subfooter');
        }

        return classes.join(' ');
    }
});
