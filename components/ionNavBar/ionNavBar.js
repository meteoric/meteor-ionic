/**
 * ionNavBar
 *
 * ionNavBar and _ionNavBar are created to overcome Meteor's templating limitations. By utilizing Template.dynamic
 * in blaze, we can force ionNavBar to destroy _ionNavBar, enabling css transitions and none of that javascript
 * animation.
 */

let _ionNavBar_Destroyed = new ReactiveVar(false);

Template.ionNavBar.onCreated(function() {
    this.data = this.data || {};

    if (Platform.isAndroid()) {
        this.transition = 'android';
    } else {
        this.transition = 'ios';
    }

    this.ionNavBarTemplate = new ReactiveVar('_ionNavBar');

    $(window).on('statechange', e => this.ionNavBarTemplate.set(''));

    this.autorun(() => {
        if (_ionNavBar_Destroyed.get()) { this.ionNavBarTemplate.set('_ionNavBar'); }
    });
});

Template.ionNavBar.onRendered(function() {
    IonHeaderBar.alignTitle.call(this);
    IonHeaderBar.positionTitle.call(this);

    let container = this.$('.nav-bar-container');
    container.attr('nav-bar-direction', 'forward');

    let navBarContainer = this.find('.nav-bar-container');
    navBarContainer._uihooks = {
        // Override onDestroyed so that's children won't remove themselves immediately.
        removeElement: function(node) {
            // Worst case scenario. Remove if exceeded maximum transition duration.
            Meteor.setTimeout(() => {
                node.remove();
            }, METEORIC.maximum_transition_duration);
        }
    };
});

Template.ionNavBar.helpers({
    ionNavBarTemplate: function() {
        return Template.instance().ionNavBarTemplate.get();
    },

    transition: function () {
        return Template.instance().transition;
    }
});

Template._ionNavBar.onCreated(function () {
    this.entering = false;
    this.leaving = false;

    this.activate_view_timeout_id = null;
    this.deactivate_view_timeout_id = null;

    _ionNavBar_Destroyed.set(false);
});

Template._ionNavBar.onRendered(function () {
    // Reset nav-bar-direction.
    $('[data-navbar-container]').attr('nav-bar-direction', 'forward');

    let navBarBlock = this.find('.nav-bar-block');
    navBarBlock._uihooks = {
        // Override onDestroyed so that's children won't remove themselves immediately.
        removeElement: function(node) {
            // Worst case scenario. Remove if exceeded maximum transition duration.
            Meteor.setTimeout(() => {
                node.remove();
            }, METEORIC.maximum_transition_duration);
        }
    };

    let $navBarBlock = this.$('.nav-bar-block').first();
    let activate_view = () => {
        this.entering = false;

        let activate_timer_active = !!this.activate_view_timeout_id;
        if (activate_timer_active) {
            Meteor.clearTimeout(this.activate_view_timeout_id);
            this.activate_view_timeout_id = null;
        }

        $navBarBlock.attr('nav-bar', 'active');
        $('[data-navbar-container]').attr('nav-bar-direction', 'forward');
    };

    $navBarBlock.attr('nav-bar', 'stage');
    let $headerBar = this.$('.nav-bar-block *');
    Meteor.setTimeout(() => {
        this.entering = true;
        $navBarBlock.attr('nav-bar', 'entering');
        $headerBar.one(METEORIC.UTILITY.transitionend_events.join(' '), activate_view);
    }, 0);

    // Worst case scenario, transitionend did not occur. Just place view in.
    this.activate_view_timeout_id = Meteor.setTimeout(activate_view, METEORIC.maximum_transition_duration);
});

Template._ionNavBar.onDestroyed(function () {
    _ionNavBar_Destroyed.set(true);

    let $navBarBlock = this.$('.nav-bar-block');
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
        $navBarBlock.remove();
    };

    let $headerBar = this.$('.nav-bar-block *');
    Meteor.setTimeout(() => {
        this.leaving = true;
        $navBarBlock.attr('nav-bar', 'leaving');
        $headerBar.one(METEORIC.UTILITY.transitionend_events.join(' '), deactivate_view);
    }, 0);

    // Worst case scenario, transitionend did not occur. Just remove the view.
    this.deactivate_view_timeout_id = Meteor.setTimeout(deactivate_view, METEORIC.maximum_transition_duration);
});
