IonLoading = {
  show: function (options) {
    IonBackdrop.retain();
    $('.backdrop').addClass('backdrop-loading');

    var delay = options.delay || 0;
    var duration = options.duration;
    var customTemplate = options.template;

    Meteor.setTimeout(function () {
      this.template = Template['ionLoading'];
      this.view = Blaze.renderWithData(this.template, {template: customTemplate}, $('.ionic-body').get(0));

      var $loadingEl = $(this.view.firstNode());
      $loadingEl.addClass('visible');

      Meteor.setTimeout(function () {
        $loadingEl.addClass('active');
      }, 10);
    }.bind(this), delay);

    if (duration) {
      Meteor.setTimeout(function () {
        this.hide();
      }.bind(this), duration);
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
