Template.ionInfiniteScroll.onCreated(function() {
    this.onInfinite = null;
    this.distance = "1%";
    this.enable = new ReactiveVar(true);
    this.immediateCheck = true;

    this.isLoading = new ReactiveVar(false);

    this.autorun(() => {
        if (!Template.currentData()) return;  // Don't do a thing if data context don't exist.
        this.onInfinite = Template.currentData().onInfinite;
        this.distance = !_.isUndefined(Template.currentData().distance) ? parseFloat(Template.currentData().distance) : "1%";
        this.enable.set(!_.isUndefined(Template.currentData().enable) ? Template.currentData().enable : true);
        this.immediateCheck = !!Template.currentData().immediateCheck;
    });
});

Template.ionInfiniteScroll.onRendered(function() {
    let parentTemplate = this.parent(t => t.view.name = 'Template.ionContent');
    if (!parentTemplate) throw "Parent template must be Template.ionContent";  // todo: ionScroll should also be a possible parent.
    let $overflowScrollContainer = parentTemplate.$('.overflow-scroll');

    let calculateMaxValue = function(maximum) {
        let distance = (this.distance || '2.5%').trim();
        let isPercent = distance.indexOf('%') !== -1;
        return isPercent ? maximum * (1 - parseFloat(distance) / 100) : maximum - parseFloat(distance);
    };
    let scrollHeight = () => $overflowScrollContainer[0].scrollHeight;
    let maxScrollHeight = () => calculateMaxValue(scrollHeight());
    let clientHeight = () => $overflowScrollContainer[0].clientHeight;
    let scrollTop = () => $overflowScrollContainer[0].scrollTop;
    // @see https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight
    let reachedBottom = () => scrollTop() > maxScrollHeight() - clientHeight();
    let onInfinite = () => {
        this.isLoading.set(true);
        _.isFunction(this.onInfinite) ? this.onInfinite() : () => {};
    };
    let finishInfiniteScroll = () => {
        Meteor.setTimeout(checkBounds, 30);
        this.isLoading.set(false);
    };
    let checkInfiniteBounds = () => {
        if (this.isLoading.get()) return;
        if (reachedBottom()) { onInfinite(); }
    };
    let checkBounds = METEORIC.UTILITY.throttle(checkInfiniteBounds, 300);
    $overflowScrollContainer.scroll(e => {
        if (!this.enable.get()) return;  // Don't do a thing when disabled.
        checkInfiniteBounds();
    });
    if (this.immediateCheck) { Meteor.setTimeout(checkBounds); }

    $(window).on('scroll.infiniteScrollComplete', function () {
        finishInfiniteScroll();
    });
});

Template.ionInfiniteScroll.helpers({
    enable: function() { return Template.instance().enable.get(); },
    active: function() { return Template.instance().isLoading.get(); }
});