let ionSlidesController = function() {
    this.initialize = ($scope, $element) => {
        let $timeout = Meteor.setTimeout;
        var _this = this;

        this.update = function () {
            $timeout(function () {
                if (!_this.__slider) {
                    return;
                }

                _this.__slider.update();
                if (_this._options.loop) {
                    _this.__slider.createLoop();
                }

                // Don't allow pager to show with > 10 slides
                if (_this.__slider.slides.length > 10) {
                    $scope.showPager = false;
                }
            });
        };

        this.rapidUpdate = ionic.debounce(function () {
            _this.update();
        }, 50);

        this.getSlider = function () {
            return _this.__slider;
        };

        var options = $scope.options || {};

        var newOptions = _.extend({
            pagination: '.swiper-pagination',
            paginationClickable: true,
            lazyLoading: true,
            preloadImages: false
        }, options);

        this._options = newOptions;

        $timeout(function () {
            var slider = new ionic.views.Swiper($element.children()[0], newOptions, $scope);

            _this.__slider = slider;
            $scope.slider = _this.__slider;

            $scope.on('$destroy', function () {
                slider.destroy();
            });
        });

        $(this).trigger('$initialize');
    };
};

Template.ionSlides.onCreated(function () {
    this.ionSlidesCtrl = new ionSlidesController();
    this.showPager = new ReactiveVar(true);

    this.onScopeCreated = function() {
        this.scope.options = {};
        this.scope.ionSlidesCtrl = this.ionSlidesCtrl;

        this.autorun(() => {
            let td = Template.currentData();
            if (!td) return;

            this.showPager.set(!_.isUndefined(td.showPager) ? td.showPager : true);
            if (td.options) { _.extend(this.scope.options, td.options); }
        });
    };
});

Template.ionSlides.onRendered(function () {
    let $scope = _.extend($(this.scope), this.scope);
    let $element = this.$('ion-slides');
    this.ionSlidesCtrl.initialize($scope, $element);
});

Template.ionSlides.helpers({
    showPager: function() {
        return Template.instance().showPager.get();
    }
});

Template.ionSlidePage.onRendered(function() {
    let ionSlidesCtrl = this.scope.ionSlidesCtrl;
    $(ionSlidesCtrl).on('$initialized', () => {
        ionSlidesCtrl.rapidUpdate();
    });
});