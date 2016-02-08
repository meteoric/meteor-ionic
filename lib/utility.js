METEORIC = {};

METEORIC.UTILITY = {
    transitionend_events: [
        'otransitionend',  // oTransitionEnd in very old Opera
        'transitionend',
        'webkittransitionend',
        'transitionend'
    ],
    animationend_events: [
        'webkitanimationend' ,
        'mozanimationend',
        'oanimationend',
        'MSanimationEnd',
        'animationend'
    ],
    transitionend_event_name: (function() {
        var i,
            undefined,
            el = document.createElement('div'),
            transitions = {
                'transition': 'transitionend',
                'OTransition': 'otransitionend',  // oTransitionEnd in very old Opera
                'MozTransition': 'transitionend',
                'WebkitTransition': 'webkitTransitionEnd'
            };

        for (i in transitions) {
            if (transitions.hasOwnProperty(i) && el.style[i] !== undefined) {
                return transitions[i];
            }
        }
    })()
};

Meteor.startup(function() {

});