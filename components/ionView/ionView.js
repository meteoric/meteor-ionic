Template.ionView.onCreated(function() {
    this.entering = false;
    this.leaving = false;

    this.activate_view_timeout_id = null;
    this.deactivate_view_timeout_id = null;
});

Template.ionView.onRendered(function () {
    // Reset our transition preference
    IonNavigation.skipTransitions = false;

    // Reset our scroll position
    var routePath = Router.current().route.path(Router.current().params);
    if(IonScrollPositions[routePath]) {
        $('.overflow-scroll').not('.nav-view-leaving .overflow-scroll').scrollTop(IonScrollPositions[routePath]);
        delete IonScrollPositions[routePath];
    }

    // Get this now, so that when Meteor.setTimeout is called, Template.instance() retrieves the correct element.
    let $view = this.$('.view');

    let activate_view = () => {
        this.entering = false;

        let activate_timer_active = !!this.activate_view_timeout_id;
        if (activate_timer_active) {
            Meteor.clearTimeout(this.activate_view_timeout_id);
            this.activate_view_timeout_id = null;
        }

        $view.attr('nav-view', 'active');
        $('[data-nav-container]').attr('nav-view-direction', 'forward');
    };

    $view.attr('nav-view', 'stage');
    Meteor.setTimeout(() => {
        this.entering = true;
        $view.attr('nav-view', 'entering');
        $view.one(meteoric.Utils.transitionend_events.join(' '), activate_view);
    }, 0);

    // Worst case scenario, transitionend did not occur. Just place view in.
    this.activate_view_timeout_id = Meteor.setTimeout(activate_view, meteoric.maximum_transition_duration);
});

Template.ionView.onDestroyed(function () {
    // Get this now, so that when Meteor.setTimeout is called, Template.instance() retrieves the correct element.
    let $view = this.$('.view');

    let deactivate_view = () => {
        this.leaving = false;

        // If the user have trigger fingers, in which he/she can click back buttons
        // really fast, activate view timer might still be going. Kill it.
        let activate_timer_active = !!this.activate_view_timeout_id;
        if (activate_timer_active) {
            Meteor.clearTimeout(this.activate_view_timeout_id);
            this.activate_view_timeout_id = null;
        }

        let deactivate_timer_active = !!this.deactivate_view_timeout_id;
        if (deactivate_timer_active) {
            Meteor.clearTimeout(this.deactivate_view_timeout_id);
            this.deactivate_view_timeout_id = null;
        }

        this.deactivate_view_timeout_id = null;
        $view.remove();
    };

    Meteor.setTimeout(() => {
        this.leaving = true;
        $view.attr('nav-view', 'leaving');
        $view.one(meteoric.Utils.transitionend_events.join(' '), deactivate_view);
    }, 0);

    // Worst case scenario, transitionend did not occur. Just remove the view.
    this.deactivate_view_timeout_id = Meteor.setTimeout(deactivate_view, meteoric.maximum_transition_duration);
});

Template.ionView.helpers({
    classes: function () {
        var classes = [];

        if (this.class) {
            classes.push(this.class);
        }

        return classes.join(' ');
    },
    title: function () {
        if ( Template.instance().data && Template.instance().data.title ) {
            return Template.instance().data.title;
        }
    }
});