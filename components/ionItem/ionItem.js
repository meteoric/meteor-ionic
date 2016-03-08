function url() {
  if (this.data.href) {
    return this.data.href;
  }

  if ( this.data.path || this.data.url || this.data.route ) {

    var path = _.find([this.data.path,this.data.url,this.data.route],function(path){return path !=undefined});

    if ( this.data.query || this.data.hash || this.data ){

      var hash = {};
      hash.route = path;
      hash.query = this.data.query;
      hash.hash = this.data.hash;
      hash.data = this.data;
      var options = new Spacebars.kw(hash);

      // Devs may pass 'route=x' instead of 'path=' or 'url='
      // Should doing that throw an error? Not sure but we decided to
      // parse it as if the dev passed it as 'path='
      if (this.url){
        return Blaze._globalHelpers.urlFor(options)
      } else if( this.data.path || this.data.route ) {
        return Blaze._globalHelpers.pathFor(options)
      }

    } else {
      return Router.routes[path].path(Template.parentData(1));
    }
  }
};

Template.ionItem.onCreated(function() {
  this.itemComplex = new ReactiveVar(false);

  let parent = this.parent((template) => template.view.name === "Template.ionList", true);
  if (!parent) { throw "Template.ionItem must be a descendant of Template.ionList."; }

  _.extend(this, {
    // Props.
    showDelete: parent.showDelete,
    showReorder: parent.showReorder,
    canSwipe: parent.canSwipe,
    isAnchor: _.some([this.data.href,this.data.path,this.data.url,this.data.route],function(path){return path != undefined}),
    url: url.call(this),
    target: this.data.target
  });
});

Template.ionItem.onRendered(function() {
  // todo: make this a utility function. This seems neat.

  let self = this;
  let $element = this.$('ion-item');
  var isAnchor = this.data.href || this.data.path || this.data.url || this.data.route;
  var isComplexItem = isAnchor ||
        //Lame way of testing, but we have to know at compile what to do with the element
      /ion-(delete|option|reorder)-button/i.test($element.html());
  this.itemComplex.set(isComplexItem);

  // link function below.

  let $scope = {};
  $scope.$href = function() {
    return url.call(self);
  };
  $scope.$target = function() {
    return self.target;
  };

  var content = $element[0].querySelector('.item-content');
  /*if (content) {
    $scope.$on('$collectionRepeatLeave', function() {
      if (content && content.$$ionicOptionsOpen) {
        content.style[ionic.CSS.TRANSFORM] = '';
        content.style[ionic.CSS.TRANSITION] = 'none';
        $$rAF(function() {
          content.style[ionic.CSS.TRANSITION] = '';
        });
        content.$$ionicOptionsOpen = false;
      }
    });
  }*/
});

Template.ionItem.onDestroyed(function() {
  if (!!this.snapper) {
    this.destroyDragTransitionHandler();
    this.snapper.disable();
    this.snapper.close();
  }
});

Template.ionItem.helpers({
  itemComplex: function() {
    return Template.instance().itemComplex.get();
  },

  isAnchor: function () {
    return _.some([this.href,this.path,this.url,this.route],function(path){return path != undefined});
  },

  target: function () {
    return this.target;
  }
});