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

    hasHeader: new ReactiveVar(false),

    /**
     * In a worst case scenario, such that "transitionend" event is not called,
     * for any reason. This will be the maximum alloted duration. This will
     * prevent memory leaks during transition out events, in which some views
     * are still in the DOM tree, even though they should've been removed.
     */
    maximum_transition_duration: 1100
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
    ],
    /**
     * Throttle the given fun, only allowing it to be
     * called at most every `wait` ms.
     */
    throttle(func, wait, options) {
        var context, args, result;
        var timeout = null;
        var previous = 0;
        options || (options = {});
        var later = function() {
            previous = options.leading === false ? 0 : Date.now();
            timeout = null;
            result = func.apply(context, args);
        };
        return function() {
            var now = Date.now();
            if (!previous && options.leading === false) previous = now;
            var remaining = wait - (now - previous);
            context = this;
            args = arguments;
            if (remaining <= 0) {
                clearTimeout(timeout);
                timeout = null;
                previous = now;
                result = func.apply(context, args);
            } else if (!timeout && options.trailing !== false) {
                timeout = setTimeout(later, remaining);
            }
            return result;
        };
    }
};

Router.onBeforeAction(function() {
    $(window).trigger('statechange');
    this.next();
});