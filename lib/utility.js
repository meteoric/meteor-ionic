METEORIC = {
    PLATFORM: {
        orientation() {
            // 0 = Portrait
            // 90 = Landscape
            // not using window.orientation because each device has a different implementation
            return (window.innerWidth > window.innerHeight ? 90 : 0);
        }

        // TODO: Move the Platform namespace here. And create platform.js
    },

    has_header: new ReactiveVar(false),

    /**
     * In a worst case scenario, such that "transitionend" event is not called,
     * for any reason. This will be the maximum alloted duration. This will
     * prevent memory leaks during transition out events, in which some views
     * are still in the DOM tree, even though they should've been removed.
     */
    maximum_transition_duration: 1100  // todo: change this to 1.1s
};

METEORIC.UTILITY = {
    transitionend_events: [
        'transitionend',
        'webkitTransitionEnd',
        'oTransitionEnd'  // oTransitionEnd in very old Opera
    ],
    animationend_events: [
        'webkitanimationend' ,
        'mozanimationend',
        'oanimationend',
        'MSanimationEnd',
        'animationend'
    ]
};

Router.onBeforeAction(function() {
    $(window).trigger('statechange');
    this.next();
});