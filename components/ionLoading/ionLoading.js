IonLoading = {
  show: function (userOptions) {
    IonBackdrop.retain();
    $('.backdrop').addClass('backdrop-loading');

    var userOptions = userOptions || {};
    var options = _.extend({
      delay: 0,
      duration: null,
      customTemplate: null
    }, userOptions);

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
    var $loadingEl = $(this.view.firstNode());
    $loadingEl.removeClass('active');

    Meteor.setTimeout(function () {
      IonBackdrop.release();
      $loadingEl.removeClass('visible');
      Blaze.remove(this.view);
    }.bind(this), 400);
  }
};
