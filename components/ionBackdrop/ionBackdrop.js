IonBackdrop = {
  holds: 0,
  retain: function () {
    this.holds++;

    if (this.holds === 1) {
      this.template = Template['ionBackdrop'];
      this.view = Blaze.renderWithData(this.template, {}, $('.ionic-body').get(0));

      var $backdropEl = $(this.view.firstNode());
      $backdropEl.addClass('visible');

      Meteor.setTimeout(function () {
        $backdropEl.addClass('active');
      }, 10);
    }
  },

  release: function () {
    this.holds--;

    if (this.holds === 0) {
      var $backdropEl = $(this.view.firstNode());
      $backdropEl.removeClass('active');

      Meteor.setTimeout(function () {
        $backdropEl.removeClass('visible');
        Blaze.remove(this.view);
      }.bind(this), 400);
    }
  }
};
