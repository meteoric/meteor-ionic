IonLoading = {
  show: function (userOptions) {
    var userOptions = userOptions || {};
    var options = _.extend({
      delay: 0,
      duration: null,
      customTemplate: null,
      backdrop: false
    }, userOptions);

    if (options.backdrop) {
      IonBackdrop.retain();
      $('.backdrop').addClass('backdrop-loading');
    }

    Meteor.setTimeout(function () {
      this.template = Template['ionLoading'];
      this.view = Blaze.renderWithData(this.template, {template: options.customTemplate}, $('.ionic-body').get(0));

      var $loadingEl = $(this.view.firstNode());
      $loadingEl.addClass('visible');

      Meteor.setTimeout(function () {
        $loadingEl.addClass('active');
      }, 10);
    }.bind(this), options.delay);

    if (options.duration) {
      Meteor.setTimeout(function () {
        this.hide();
      }.bind(this), options.duration);
    }
  },

  hide: function () {
    if (this.view) {
      var $loadingEl = $(this.view.firstNode());
      $loadingEl.removeClass('active');

      Meteor.setTimeout(function () {
        IonBackdrop.release();
        $loadingEl.removeClass('visible');
        Blaze.remove(this.view);
        this.view = null;
      }.bind(this), 0);
    }
    Meteor.setTimeout(function() {
      $('.loading-container').remove();
    }, 0)
  }
};
