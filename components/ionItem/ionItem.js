Template.ionItem.onCreated(function() {
  this.snapper = null;
  this.itemComplex = new ReactiveVar(false);

  let parent = this.parent((template) => template.view.name === "Template.ionList", true);
  if (!parent) { throw "Template.ionItem must be a descendant of Template.ionList."; }

  _.extend(this, {
    // Props.
    showDelete: parent.showDelete,
    showReorder: parent.showReorder,
    canSwipe: parent.canSwipe,

    // Methods.
    closeIonItemSiblings: () => {
      let ionItemSiblings = this.getSiblings().filter(sibling => sibling.view.name === "Template.ionItem");
      _.each(ionItemSiblings, sibling => !!sibling.snapper && sibling.snapper.close());
    },
    dragSetTransitionNone: () => this.$('.item-content').css({ transition: "none" }),
    dragEndSetTransitionToInitial: () => this.$('.item-content').css({ transition: "initial"}),
    initDragTransitionHandler: () => {
      this.snapper.on('drag', this.dragSetTransitionNone);
      this.snapper.on('end', this.dragEndSetTransitionToInitial);
    },
    destroyDragTransitionHandler: () => {
      this.snapper.off('drag', this.dragSetTransitionNone);
      this.snapper.off('end', this.dragEndSetTransitionToInitial);
    },
    isitemComplex: () => {
      let complex = !!_.find(this.children(1),
          elem =>
          elem.view.name === 'Template.ionItemOptions' ||
          elem.view.name === 'Template.ionDeleteButton' ||
          elem.view.name === 'Template.ionReorderButton');
      return complex;
    }
  });
});

Template.ionItem.onRendered(function() {
  this.autorun(() => {
    if (this.canSwipe.get() && !this.showDelete.get() && !this.showReorder.get()) {
      let ionOptions = this.getChildren()
          .filter(child => child.view && child.view.name === 'Template.ionItemOptions');
      let ionOptionsWidth = ionOptions.reduce((width, child) => width + child.width(), 0);
      if (!this.snapper) {
        this.snapper = new Snap({
          element: this.$('.item-content').get(0),
          disable: 'left',
          minPosition: -ionOptionsWidth
        });
      }

      this.snapper.settings({
        element: this.$('.item-content').get(0),  // In case the child template ionItemContent got changed.
        minPosition: -ionOptionsWidth
      });
      this.snapper.enable();

      this.snapper.on('start', () => {
        this.closeIonItemSiblings();
      });

      this.initDragTransitionHandler();
    } else {
      if (this.snapper) {
        this.destroyDragTransitionHandler();
        this.snapper.disable();
        this.snapper.close();
      }
    }
  });

  this.autorun(() => {
    this.itemComplex.set(this.isitemComplex());
  });
});

Template.ionItem.onDestroyed(function() {
  if (!!this.snapper) {
    this.destroyDragTransitionHandler();
    this.snapper.disable();
    this.snapper.close();
  }
});

Template.ionItem.helpers({
  idAttribute: function () {
    if (this.id) {
      return this.id;
    }
  },
  itemComplex: function() {
    return Template.instance().itemComplex.get();
  },

  isAnchor: function () {
    return _.some([this.href,this.path,this.url,this.route],function(path){return path != undefined});
  },

  target: function () {
    return this.target;
  },

  url: function () {
    if (this.href) {
      return this.href;
    }

    if ( this.path || this.url || this.route ) {

      var path = _.find([this.path,this.url,this.route],function(path){return path !=undefined});

      if ( this.query || this.hash || this.data ){

        var hash = {};
        hash.route = path;
        hash.query = this.query;
        hash.hash = this.hash;
        hash.data = this.data;
        var options = new Spacebars.kw(hash);

        // Devs may pass 'route=x' instead of 'path=' or 'url='
        // Should doing that throw an error? Not sure but we decided to
        // parse it as if the dev passed it as 'path='
        if (this.url){
          return Blaze._globalHelpers.urlFor(options)
        } else if( this.path || this.route ) {
          return Blaze._globalHelpers.pathFor(options)
        }

      } else {
        return Router.routes[path].path(Template.parentData(1));
      }
    }
  }
});