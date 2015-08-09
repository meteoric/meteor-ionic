Template.ionSlideBox.created = function () {
  this.data = this.data || {};
  this.doesContinue = this.data.doesContinue || false;
  this.autoPlay = this.data.autoPlay || false;
  this.slideInterval = this.data.slideInterval || 4000;
  this.showPager = typeof this.data.showPager != 'undefined' ? this.data.showPager : true;
  this.initialSlide = this.data.initialSlide || Session.get('ion-slide-initial-slide') || 0;
};

Template.ionSlideBox.rendered = function () {
  this.$('.ion-slide-box').slick({
    infinite: this.doesContinue,
    autoplay: this.autoPlay,
    autoplaySpeed: this.slideInterval,
    arrows: false,
    dots: this.showPager,
    dotsClass: 'slider-pager',
    initialSlide: this.initialSlide,
    customPaging: function(slider, i) {
      return '<span class="slider-pager-page icon ion-record"></span>';
    }
  });
  this.$('.ion-slide-box').on('afterChange', function (event, slick, currentSlide) {
    $(this).trigger({type: 'onSlideChanged', index: currentSlide});
  });
};

Template.ionSlideBox.destroyed = function () {
  var $slideBox = this.$('.ion-slide-box');
  if ($slideBox.hasClass('slick-initialized')) $slideBox.slick('unslick');
};
