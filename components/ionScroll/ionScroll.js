let ionScrollDefault = {
    overflowScroll: false,
    direction: 'y',
    locking: true,
    paging: false,
    onRefresh: null,
    onScroll: null,
    onScrollComplete: null,  // Note: This was not documented in ionic website, but whatever.
    scrollBarX: true,
    scrollBarY: true,
    startX: '0',
    startY: '0',
    zooming: false,
    minZoom: 0.5,
    maxZoom: 3,
    hasBouncing: true,

    scrollEventInterval: 10,

    // non-ionic options.
    stopPropagation: true
};

Template.ionScroll.onCreated(function() {
    this.overflowScroll = new ReactiveVar(false);
    this.direction = new ReactiveVar(ionScrollDefault.direction);
    this.locking = new ReactiveVar(ionScrollDefault.locking);
    this.paging = new ReactiveVar(ionScrollDefault.paging);
    this.onRefresh = new ReactiveVar(ionScrollDefault.onRefresh);
    this.onScroll = new ReactiveVar(ionScrollDefault.onScroll);
    this.onScrollComplete = new ReactiveVar(ionScrollDefault.onScrollComplete);
    this.scrollBarX = new ReactiveVar(ionScrollDefault.scrollBarX);
    this.scrollBarY = new ReactiveVar(ionScrollDefault.scrollBarY);
    this.startX = new ReactiveVar(ionScrollDefault.startX);
    this.startY = new ReactiveVar(ionScrollDefault.startY);
    this.zooming = new ReactiveVar(ionScrollDefault.zooming);
    this.minZoom = new ReactiveVar(ionScrollDefault.minZoom);
    this.maxZoom = new ReactiveVar(ionScrollDefault.maxZoom);
    this.hasBouncing = new ReactiveVar(ionScrollDefault.hasBouncing);
    this.scrollEventInterval = new ReactiveVar(ionScrollDefault.scrollEventInterval);

    this.stopPropagation = new ReactiveVar(ionScrollDefault.stopPropagation);

    this._scroller = null;
    this.scroller = new ReactiveVar(null);

    this.autorun(() => {
        let td = Template.currentData();
        if (!td) return;
        this.overflowScroll.set(!!td.overflowScroll ? td.overflowScroll : ionScrollDefault.overflowScroll);
        this.direction.set(!!td.direction ? td.direction : ionScrollDefault.direction);
        this.locking.set(!_.isUndefined(td.locking) ? td.locking : ionScrollDefault.locking);
        this.paging.set(!_.isUndefined(td.locking) ? td.paging : ionScrollDefault.paging);
        this.onRefresh.set(td.onRefresh || ionScrollDefault.onRefresh);
        this.onScroll.set(td.onScroll || ionScrollDefault.onScroll);
        this.onScrollComplete.set(td.onScrollComplete || ionScrollDefault.onScrollComplete);
        this.scrollBarX.set(!_.isUndefined(td.scrollBarX) ? td.scrollBarX : ionScrollDefault.scrollBarX);
        this.scrollBarY.set(!_.isUndefined(td.scrollBarY) ? td.scrollBarY : ionScrollDefault.scrollBarY);
        this.startX.set(!_.isUndefined(td.startX) ? td.startX : ionScrollDefault.startX);
        this.startY.set(!_.isUndefined(td.startY) ? td.startY : ionScrollDefault.startY);
        this.zooming.set(!_.isUndefined(td.zooming) ? td.zooming : ionScrollDefault.zooming);
        this.minZoom.set(!_.isUndefined(td.minZoom) ? td.minZoom : ionScrollDefault.minZoom);
        this.maxZoom.set(!_.isUndefined(td.maxZoom) ? td.maxZoom : ionScrollDefault.maxZoom);
        this.hasBouncing.set(!_.isUndefined(td.hasBouncing) ? td.hasBouncing : ionScrollDefault.hasBouncing);
        this.scrollEventInterval.set(!_.isUndefined(td.scrollEventInterval) ? td.scrollEventInterval : ionScrollDefault.scrollEventInterval);
        this.stopPropagation.set(!_.isUndefined(td.stopPropagation) ? td.stopPropagation : ionScrollDefault.stopPropagation);
    });
});

Template.ionScroll.onRendered(function() {
    let nativeScrolling = this.overflowScroll.get();  // todo: make this reactive? Is there a use case?
    if (!nativeScrolling) {
        let innerWrapper = this.$(".meteoric-scroller-x").get(0);
        this._scroller = new EasyScroller(innerWrapper);

        this.autorun(() => {
            this._scroller.scroller.options.locking = !this.locking.get();
            this._scroller.scroller.options.paging = this.paging.get();
            this._scroller.scroller.options.scrollingX = this.direction.get().indexOf('x') !== -1;
            this._scroller.scroller.options.scrollingY = this.direction.get().indexOf('y') !== -1;
            this._scroller.scroller.options.zooming = this.zooming.get();
            this._scroller.scroller.options.minZoom = this.minZoom.get();
            this._scroller.scroller.options.maxZoom = this.maxZoom.get();
            this._scroller.scroller.options.bouncing = this.hasBouncing.get();
            this._scroller.options.stopPropagation = this.stopPropagation.get();
        });

        this.autorun(() => {
            this._scroller.scroller.scrollTo(parseInt(this.startX.get(), 10), parseInt(this.startY.get(), 10), true);
        });

        this._scroller.options.scrolling = () =>
            _.isFunction(this.onScroll) ?
                METEORIC.UTILITY.throttle(this.onScroll, this.scrollEventInterval.get()) :
                e => {};
        this._scroller.options.scrollingComplete = () =>
            _.isFunction(this.onScrollComplete) ? this.onScrollComplete : e => {};

        this.scroller.set(this._scroller);
    }
});

Template.ionScroll.helpers({
    // todo: handle native-scroll-view
    nativeScrolling: function() { return Template.instance().overflowScroll.get(); }
});