Template.ionInfiniteScroll.onCreated(function() {
    this.onInfinite = null;
    this.distance = "1%";
    this.enable = new ReactiveVar(true);
    this.immediateCheck = true;

    this.isLoading = new ReactiveVar(false);

    this.finishInfiniteScroll = null;

    this.autorun(() => {
        if (!Template.currentData()) return;  // Don't do a thing if data context don't exist.
        this.onInfinite = Template.currentData().onInfinite;
        this.distance = !_.isUndefined(Template.currentData().distance) ? parseFloat(Template.currentData().distance) : "1%";
        this.enable.set(!_.isUndefined(Template.currentData().enable) ? Template.currentData().enable : true);
        this.immediateCheck = !!Template.currentData().immediateCheck;
    });
});

Template.ionInfiniteScroll.onRendered(function() {
    let parentTemplate = this.parent(1, true);

    let calculateMaxValue = function(maximum) {
        let distance = (this.distance || '2.5%').trim();
        let isPercent = distance.indexOf('%') !== -1;
        return isPercent ? maximum * (1 - parseFloat(distance) / 100) : maximum - parseFloat(distance);
    };

    this.autorun(() => {
        let scroller = parentTemplate.scroller.get();
        if (!!scroller) {
            let scrollHeight = () => parentTemplate.$('.meteoric-scroller-container').get(0).scrollHeight;
            let maxScrollHeight = () => calculateMaxValue(scrollHeight());
            let clientHeight = () => parentTemplate.$('.meteoric-scroller-container').get(0).clientHeight;
            let scrollTop = () => scroller.scroller.__scrollTop;

            // @see https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight
            let reachedBottom = () => scrollTop() > maxScrollHeight() - clientHeight();
            let onInfinite = () => {
                this.isLoading.set(true);
                _.isFunction(this.onInfinite) ? this.onInfinite() : () => {
                };
            };
            let checkInfiniteBounds = () => {
                if (this.isLoading.get()) return;
                if (reachedBottom()) {
                    onInfinite();
                }
            };
            let checkBounds = METEORIC.UTILITY.throttle(checkInfiniteBounds, 300);
            this.finishInfiniteScroll = () => {
                Meteor.setTimeout(checkBounds, 30);
                this.isLoading.set(false);
            };

            let onScrollHandler = () => {
                if (!this.enable.get()) return;  // Don't do a thing when disabled.
                checkBounds();  // Ensure that this is throttled.
            };

            // ft-scroll scrolling.
            scroller.scroller.options.scrolling = onScrollHandler;

            // todo: Native scrolling.
            // $overflowScrollContainer.scroll(e => onScrollHandler());

            if (this.immediateCheck) { Meteor.setTimeout(checkBounds); }
            $(window).on('scroll.infiniteScrollComplete', this.finishInfiniteScroll);
        }
    });
});

Template.ionInfiniteScroll.onDestroyed(function() {
    this.enable.set(false);

    this.finishInfiniteScroll && $(window).off('scroll.infiniteScrollComplete', this.finishInfiniteScroll);
});

Template.ionInfiniteScroll.helpers({
    enable: function() { return Template.instance().enable.get(); },
    active: function() { return Template.instance().isLoading.get(); }
});