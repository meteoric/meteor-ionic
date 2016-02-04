Template.ionScroll.onCreated(function() {
    this.nativeScrolling = new ReactiveVar(false);
    this.direction = new ReactiveVar('y');
    this.locking = new ReactiveVar(true);
    this.paging = new ReactiveVar(true);
    this.onRefresh = new ReactiveVar(true);
    this.onScroll = new ReactiveVar(true);
    this.scrollBarX = new ReactiveVar(true);
    this.scrollBarY = new ReactiveVar(true);
    this.zooming = new ReactiveVar(true);
    this.minZoom = new ReactiveVar(true);
    this.maxZoom = new ReactiveVar(true);
    this.hasBouncing = new ReactiveVar(true);

    _.extend(this, {
        set_direction: direction => direction !== this.direction.get() && this.direction.set(_.isUndefined(direction) ? 'y' : direction),
        set_locking: locking => locking !== this.locking.get() && this.locking.set(_.isUndefined(locking) ? true : locking),
        set_paging: paging => paging !== this.paging.get() && this.paging.set(!!paging),
        set_onRefresh: onRefresh => onRefresh !== this.onRefresh.get() && this.onRefresh.set(onRefresh),
        set_onScroll: onScroll => onScroll !== this.onScroll.get() && this.onScroll.set(onScroll),
        set_scrollBarX: scrollBarX => scrollBarX !== this.scrollBarX.get() && this.scrollBarX.set(_.isUndefined(scrollBarX) ? true : scrollBarX),
        set_scrollBarY: scrollBarY => scrollBarY !== this.scrollBarY.get() && this.scrollBarY.set(_.isUndefined(scrollBarY) ? true : scrollBarY),
        set_zooming: zooming => zooming !== this.zooming.get() && this.zooming.set(zooming),
        set_minZoom: minZoom => minZoom !== this.minZoom.get() && this.minZoom.set(_.isUndefined(minZoom) ? minZoom : 0.5),
        set_maxZoom: maxZoom => maxZoom !== this.maxZoom.get() && this.maxZoom.set(_.isUndefined(maxZoom) ? maxZoom : 3),
        set_hasBouncing: hasBouncing => hasBouncing !== this.hasBouncing.get() && this.hasBouncing.set(_.isUndefined(hasBouncing) ? true: hasBouncing)  // todo: Make this platform dependent.
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
        let scroller = new IScroll(this.$(".scroller-wrapper").get(0));

        this.autorun(() => {
            scroller.options = _.extend(scroller.options, {
                scrollX: !!this.direction.get() && this.direction.get().indexOf('x') !== -1,
                scrollY: !!this.direction.get() && this.direction.get().indexOf('y') !== -1,
                freeScroll: !this.locking.get(),
                zoomMin: this.minZoom.get(),
                zoomMax: this.maxZoom.get(),
                bounce: !!this.hasBouncing.get()
            });

            // todo: add a removeEvent or .off
            //scroller.on('scroll', !!this.onScroll.get() ? this.onScroll.get() : () => {});  // Have a way to remove events.
            //scroller.on('zooming'); // todo: modify iscroll.

            scroller.refresh();
        });

        this.$(".scroller-wrapper").children().load(() => scroller.refresh());
    }
});

Template.ionScroll.helpers({
    nativeScrollingClass: function() {
        return Template.instance().nativeScrolling.get() ? 'overflow-scroll' : '';
    }
});