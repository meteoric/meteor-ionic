let ionContentDefault = {
    direction: 'y',
    locking: true,
    padding: true,
    scroll: true,
    overflowScroll: false,
    scrollBarX: true,
    scrollBarY: true,
    startX: '0',
    startY: '0',
    onScroll: null,
    onScrollComplete: null,
    hasBouncing: true,
    scrollEventInterval: 10
};

Template.ionContent.onCreated(function() {
    this.direction = new ReactiveVar(ionContentDefault.direction);
    this.locking = new ReactiveVar(ionContentDefault.locking);
    this.padding = new ReactiveVar(ionContentDefault.padding);  // todo: make this platform dependent.
    this.scroll = new ReactiveVar(ionContentDefault.scroll);
    this.overflowScroll = new ReactiveVar(ionContentDefault.overflowScroll);  // todo: Make a Meteoric config for defaults.
    this.scrollBarX = new ReactiveVar(ionContentDefault.scrollBarX);
    this.scrollBarY = new ReactiveVar(ionContentDefault.scrollBarY);
    this.startX = new ReactiveVar(ionContentDefault.startX);
    this.startY = new ReactiveVar(ionContentDefault.startY);
    this.onScroll = new ReactiveVar(ionContentDefault.onScroll);
    this.onScrollComplete = new ReactiveVar(ionContentDefault.onScrollComplete);
    this.hasBouncing = new ReactiveVar(ionContentDefault.hasBouncing);  // tdo: Make platform dependent.
    this.scrollEventInterval = new ReactiveVar(ionContentDefault.scrollEventInterval);

    this.autorun(() => {
        let td = Template.currentData();
        if (!td) return;
        this.direction.set(td.direction || ionContentDefault.direction);
        this.locking.set(!!td.locking ? td.locking : ionContentDefault.locking);
        this.padding.set(!!td.padding ? td.padding : ionContentDefault.padding);
        this.scroll.set(!!td.scroll ? td.scroll : ionContentDefault.scroll);
        this.overflowScroll.set(!!td.overflowScroll ? td.overflowScroll : ionContentDefault.overflowScroll);
        this.scrollBarX.set(!!td.scrollBarX ? td.scrollBarX : ionContentDefault.scrollBarX);
        this.scrollBarY.set(!!td.scrollBarY ? td.scrollBarY : ionContentDefault.scrollBarY);
        this.startX.set(!!td.startX ? td.startX : ionContentDefault.startX);
        this.startY.set(!!td.startX ? td.startY : ionContentDefault.startY);
        this.onScroll.set(td.onScroll);
        this.onScrollComplete.set(td.onScrollComplete);
        this.hasBouncing.set(!!td.hasBouncing ? td.hasBouncing : ionContentDefault.hasBouncing);
        this.scrollEventInterval.set(!!this.scrollEventInterval ? this.scrollEventInterval : ionContentDefault.scrollEventInterval);
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
            //classes.push('overflow-scroll');
            classes.push('scroll');
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
    },

    direction: function() { return Template.instance().direction.get(); },
    locking: function() { return Template.instance().locking.get(); },
    padding: function() { return Template.instance().padding.get(); },
    scroll: function() { return Template.instance().scroll.get(); },
    overflowScroll: function() { return Template.instance().overflowScroll.get(); },
    scrollBarX: function() { return Template.instance().scrollBarX.get(); },
    scrollBarY: function() { return Template.instance().scrollBarY.get(); },
    startX: function() { return Template.instance().startX.get(); },
    startY: function() { return Template.instance().startY.get(); },
    onScroll: function() { return Template.instance().onScroll.get(); },
    onScrollComplete: function() { return Template.instance().onScrollComplete.get(); },
    hasBouncing: function() { return Template.instance().hasBouncing.get(); },
    scrollEventInterval: function() { return Template.instance().scrollEventInterval.get(); }
});