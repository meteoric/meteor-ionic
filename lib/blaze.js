Meteor.startup(() => {
    Template.forEach(template => {
        template.onRendered(function() {
            meteoric._directives.menuClose(this.$('[menu-close]'), $(this.scope));
            meteoric._directives.menuToggle(this.$('[menu-toggle]'), $(this.scope));
        });

        template.onDestroyed(function() {
            Object.setPrototypeOf(this.scope, null);
            let $scope = $(this.scope);
            $scope.trigger('$destroy');
        });
    });
});