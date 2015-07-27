IonScrollPositions = {};

Meteor.startup(function () {
  Platform.withRouter({
    'iron:router': function () {
      Router.onStop(function () {
        IonScrollPositions[this.route.path(this.params)] = $('.overflow-scroll').scrollTop();
      });
    },
    
    'meteorhacks:flow-router': function () {
      if (FlowRouter.triggers) {
        FlowRouter.triggers.exit([function (context) {
          IonScrollPositions[context.path] = $('.overflow-scroll').scrollTop();
        }]);
      }
    }
  });
});

Template.ionNavBackButton.events({
  'click': function (event, template) {
    $('[data-nav-container]').addClass('nav-view-direction-back');
    $('[data-navbar-container]').addClass('nav-bar-direction-back');
    
    //get most up-to-date url, if it exists
    var backUrl = template.getBackUrl();
    
    if (backUrl) {
      Platform.withRouter({
        'iron:router': function () {
          Router.go(backUrl);
        },
        
        'meteorhacks:flow-router': function () {
          FlowRouter.go(backUrl);
        }
      });
    } else {
      window.history.back();
    }
  }
});

Template.ionNavBackButton.created = function () {
  this.data = this.data || {};
};

Template.ionNavBackButton.rendered = function () {
  this.getBackUrl = function () {
    var backUrl = null;

    var data = this.data || {};
  
    if (data.href) {
      backUrl = data.href;
    }
  
    if (data.path) {
      var parentData = Template.parentData(1);
      
      backUrl = Platform.withRouter({
        'iron:router': function () {
          var backRoute = Router.routes[data.path];
          if (! backRoute) {
            console.warn("Back to nonexistent route:", data.path);
            return;
          }
          return backRoute.path(parentData);
        }.bind(this),
        
        'meteorhacks:flow-router': function () {
          return FlowRouter.path(data.path, parentData.params, parentData.query);
        }.bind(this)
      });
    }
    
    return backUrl;
  }.bind(this);
};

Template.ionNavBackButton.helpers({
  classes: function () {
    var classes = ['buttons button button-clear back-button pull-left'];

    if (this.class) {
      classes.push(this.class);
    }

    return classes.join(' ');
  },

  icon: function () {
    if (this.icon) {
      return this.icon;
    }

    if (Platform.isAndroid()) {
      return 'android-arrow-back';
    }

    return 'ios-arrow-back';
  },

  text: function () {
    if (this.text) {
      return this.text;
    } else if (this.text !== false) {
      return 'Back';
    }
  }
});
