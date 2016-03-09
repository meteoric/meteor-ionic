let ionScrollDefault = {
    overflowScroll: false,
    direction: 'y',
    locking: true,
    paging: false,
    onRefresh: null,
    onScroll: null,
    onScrollComplete: null,  // Note: This was not documented in ionic website, but whatever.
    scrollbarX: true,
    scrollbarY: true,
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
    this.overflowScroll = new ReactiveVar(ionScrollDefault.overflowScroll);
    this.direction = new ReactiveVar(ionScrollDefault.direction);
    this.locking = new ReactiveVar(ionScrollDefault.locking);
    this.paging = new ReactiveVar(ionScrollDefault.paging);
    this.onRefresh = new ReactiveVar(ionScrollDefault.onRefresh);
    this.onScroll = new ReactiveVar(ionScrollDefault.onScroll);
    this.onScrollComplete = new ReactiveVar(ionScrollDefault.onScrollComplete);
    this.scrollbarX = new ReactiveVar(ionScrollDefault.scrollbarX);
    this.scrollbarY = new ReactiveVar(ionScrollDefault.scrollbarY);
    this.startX = new ReactiveVar(ionScrollDefault.startX);
    this.startY = new ReactiveVar(ionScrollDefault.startY);
    this.zooming = new ReactiveVar(ionScrollDefault.zooming);
    this.minZoom = new ReactiveVar(ionScrollDefault.minZoom);
    this.maxZoom = new ReactiveVar(ionScrollDefault.maxZoom);
    this.hasBouncing = new ReactiveVar(ionScrollDefault.hasBouncing);
    this.scrollEventInterval = new ReactiveVar(ionScrollDefault.scrollEventInterval);

    this.stopPropagation = new ReactiveVar(ionScrollDefault.stopPropagation);

    this.scrollCtrl = new meteoric.controller.ionicScroll();
    this.onScopeCreated = function() {
        this.scope.scrollCtlr = this.scrollCtrl;
    };

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
        this.scrollbarX.set(!_.isUndefined(td.scrollbarX) ? td.scrollbarX : ionScrollDefault.scrollbarX);
        this.scrollbarY.set(!_.isUndefined(td.scrollbarY) ? td.scrollbarY : ionScrollDefault.scrollbarY);
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
    let $element = this.$("ion-scroll");

    var scrollViewOptions = {
        el: $element[0],
        locking: this.locking.get(),
        bouncing: this.hasBouncing.get(),
        paging: this.paging.get(),
        scrollbarX: this.scrollbarX.get(),
        scrollbarY: this.scrollbarY.get(),
        scrollingX: this.direction.get().indexOf('x') !== -1,
        scrollingY: this.direction.get().indexOf('y') !== -1,
        zooming: this.zooming.get(),
        minZoom: this.minZoom.get(),
        maxZoom: this.maxZoom.get(),
        preventDefault: true,
        nativeScrolling: nativeScrolling
    };

    if (this.paging.get()) {
        scrollViewOptions.speedMultiplier = 0.8;
        scrollViewOptions.bouncing = false;
    }

    this.scrollCtrl.initialize({
        onScroll: _.isFunction(this.onScroll) ?
            meteoric.Utils.throttle(this.onScroll, this.scrollEventInterval.get()) :
            e => {}
    }, scrollViewOptions, Meteor.setTimeout);

    this.autorun(() => {
        this.scrollCtrl.scrollView.options.locking = this.locking.get();
        this.scrollCtrl.scrollView.options.paging = this.paging.get();
        this.scrollCtrl.scrollView.options.scrollbarX = this.scrollbarX.get();
        this.scrollCtrl.scrollView.options.scrollbarY = this.scrollbarY.get();
        this.scrollCtrl.scrollView.options.scrollingX = this.direction.get().indexOf('x') !== -1;
        this.scrollCtrl.scrollView.options.scrollingY = this.direction.get().indexOf('y') !== -1;
        this.scrollCtrl.scrollView.options.zooming = this.zooming.get();
        this.scrollCtrl.scrollView.options.minZoom = this.minZoom.get();
        this.scrollCtrl.scrollView.options.maxZoom = this.maxZoom.get();
        this.scrollCtrl.scrollView.options.bouncing = this.hasBouncing.get();
    });

    this.autorun(() => {
        this.scrollCtrl.scrollTo(parseInt(this.startX.get(), 10), parseInt(this.startY.get(), 10), true);
    });

    this.scrollCtrl.scrollView.options.scrollingComplete = () =>
        _.isFunction(this.onScrollComplete) ? this.onScrollComplete : e => {};
});

Template.ionScroll.helpers({
    // todo: handle native-scroll-view
    nativeScrolling: function() { return Template.instance().overflowScroll.get(); },
    direction: function() { return Template.instance().direction.get(); },
    paging: function() { return Template.instance().paging.get(); }
});