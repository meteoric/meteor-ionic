Template.ionScroll.onCreated(function() {
    this.nativeScrolling = new ReactiveVar(false);
    this.direction = new ReactiveVar('y');
    this.locking = new ReactiveVar(true);
    this.paging = new ReactiveVar(true);
    this.onRefresh = new ReactiveVar(true);
    this.onScroll = new ReactiveVar(() => {});
    this.scrollBarX = new ReactiveVar(true);
    this.scrollBarY = new ReactiveVar(true);
    this.zooming = new ReactiveVar(false);
    this.minZoom = new ReactiveVar(0.5);
    this.maxZoom = new ReactiveVar(3);
    this.hasBouncing = new ReactiveVar(true);

    this.scroller = null;

    _.extend(this, {
        set_direction: direction => this.direction.set(_.isUndefined(direction) ? 'y' : direction),
        set_locking: locking => this.locking.set(_.isUndefined(locking) ? true : locking),
        set_paging: paging => this.paging.set(!!paging),
        set_onRefresh: onRefresh => this.onRefresh.set(onRefresh),
        set_onScroll: onScroll => {
            if (_.isFunction(onScroll)) {
                if (!!this.scroller) this.scroller.off(this.onScroll.get(onScroll));
                this.onScroll.set(onScroll);
            }
        },
        set_scrollBarX: scrollBarX => this.scrollBarX.set(_.isUndefined(scrollBarX) ? true : scrollBarX),
        set_scrollBarY: scrollBarY => this.scrollBarY.set(_.isUndefined(scrollBarY) ? true : scrollBarY),
        set_zooming: zooming => this.zooming.set(!!zooming),
        set_minZoom: minZoom => this.minZoom.set(_.isUndefined(minZoom) ? minZoom : 0.5),
        set_maxZoom: maxZoom => this.maxZoom.set(_.isUndefined(maxZoom) ? maxZoom : 3),
        set_hasBouncing: hasBouncing => this.hasBouncing.set(_.isUndefined(hasBouncing) ? true: hasBouncing)  // todo: Make this platform dependent.
    });

    this.autorun(() => {
        if (!Template.currentData()) return;
        this.nativeScrolling.set(!!Template.currentData().overflowScroll);

        this.set_direction(Template.currentData().direction);
        this.set_locking(Template.currentData().locking);
        this.set_paging(Template.currentData().paging);
        this.set_onRefresh(Template.currentData().onRefresh);
        this.set_onScroll(Template.currentData().onScroll);
        this.set_scrollBarX(Template.currentData().scrollBarX);
        this.set_scrollBarY(Template.currentData().scrollBarY);
        this.set_zooming(Template.currentData().zooming);
        this.set_minZoom(Template.currentData().minZoom);
        this.set_maxZoom(Template.currentData().maxZoom);
        this.set_hasBouncing(Template.currentData().hasBouncing);
    });
});

Template.ionScroll.onRendered(function() {
    if (!this.nativeScrolling.get()) {  // todo: make this reactive? Is there a use case?
        this.scroller = new IScroll(this.$(".scroller-wrapper").get(0));

        if (!!this.onScroll.get()) { this.scroller.on('scroll', this.onScroll.get()); }

        this.autorun(() => {
            this.scroller.options = _.extend(this.scroller.options, {
                scrollX: this.direction.get().indexOf('x') !== -1,
                scrollY: this.direction.get().indexOf('y') !== -1,
                freeScroll: !this.locking.get(),
                zoom: this.zooming.get(),
                zoomMin: this.minZoom.get(),
                zoomMax: this.maxZoom.get(),
                bounce: this.hasBouncing.get(),
                eventPassthrough: true
            });

            this.scroller.refresh();
        });

        this.autorun(() => {
            // only available in ionscroll-probe.
            //if (_.isFunction(this.onScroll.get())) { console.log(this.onScroll.get()); this.scroller.on('onScroll', this.onScroll.get()); }
        });

        this.$(".scroller-wrapper").children().load(() => this.scroller.refresh());
    }
});

Template.ionScroll.helpers({
    nativeScrollingClass: function() {
        return Template.instance().nativeScrolling.get() ? 'overflow-scroll' : '';
    }
});