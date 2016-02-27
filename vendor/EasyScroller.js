var EasyScroller = function(content, options) {
	
	this.content = content;
	this.container = content.parentNode;

	options = options || {};
	options.content = content;
	this.options = options;
	this.options.stopPropagation = typeof this.options.stopPropagation !== "undefined" ? this.options.stopPropagation : true;

	// create Scroller instance
	var that = this;
	this.scroller = new Scroller(function(left, top, zoom) {
		that.render(left, top, zoom);
	}, options);

	// bind events
	this.bindEvents();

	// the content element needs a correct transform origin for zooming
	this.content.style[EasyScroller.vendorPrefix + 'TransformOrigin'] = "left top";

	let MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window[EasyScroller.vendorPrefix + 'MutationObserver'];
	this._mutationObserver = new MutationObserver(this._domChanged.bind(this));

	if (this._mutationObserver) {
		this._mutationObserver.observe(this.container, {
			childList: true,
			characterData: true,
			subtree: true
		});
	} else {
		this.container.addEventListener('DOMSubtreeModified', function (e) {
			// Ignore changes to nested FT Scrollers - even updating a transform style
			// can trigger a DOMSubtreeModified in IE, causing nested scrollers to always
			// favour the deepest scroller as parent scrollers 'resize'/end scrolling.
			if (e && (e.srcElement === that.container)) {
				return;
			}

			that._domChanged(e);
		}, true);
	}

	// reflow for the first time
	this.reflow();
};

EasyScroller.prototype._domChanged = function(e) {
	var self = this;
	// If the timer is active, clear it
	if (this._domChangeDebouncer) {
		window.clearTimeout(this._domChangeDebouncer);
	}

	// React to resizes at once
	if (e && e.type === 'resize') {
		this.reflow();

		// For other changes, which may occur in groups, set up the DOM changed timer
	} else {
		this._domChangeDebouncer = setTimeout(self.reflow.bind(self), 100);
	}
};

EasyScroller.prototype.render = (function() {
	
	var docStyle = document.documentElement.style;
	
	var engine;
	if (window.opera && Object.prototype.toString.call(opera) === '[object Opera]') {
		engine = 'presto';
	} else if ('MozAppearance' in docStyle) {
		engine = 'gecko';
	} else if ('WebkitAppearance' in docStyle) {
		engine = 'webkit';
	} else if (typeof navigator.cpuClass === 'string') {
		engine = 'trident';
	}
	
	var vendorPrefix = EasyScroller.vendorPrefix = {
		trident: 'ms',
		gecko: 'Moz',
		webkit: 'Webkit',
		presto: 'O'
	}[engine];
	
	var helperElem = document.createElement("div");
	var undef;
	
	var perspectiveProperty = vendorPrefix + "Perspective";
	var transformProperty = vendorPrefix + "Transform";
	
	if (helperElem.style[perspectiveProperty] !== undef) {
		
		return function(left, top, zoom) {
			this.content.style[transformProperty] = 'translate3d(' + (-left) + 'px,' + (-top) + 'px,0) scale(' + zoom + ')';
		};	
		
	} else if (helperElem.style[transformProperty] !== undef) {
		
		return function(left, top, zoom) {
			this.content.style[transformProperty] = 'translate(' + (-left) + 'px,' + (-top) + 'px) scale(' + zoom + ')';
		};
		
	} else {
		
		return function(left, top, zoom) {
			this.content.style.marginLeft = left ? (-left/zoom) + 'px' : '';
			this.content.style.marginTop = top ? (-top/zoom) + 'px' : '';
			this.content.style.zoom = zoom || '';
		};
		
	}
})();

EasyScroller.prototype.reflow = function() {

	// set the right scroller dimensions
	this.scroller.setDimensions();
};

EasyScroller.prototype.bindEvents = function() {

	var that = this;

	// reflow handling
	window.addEventListener("resize", that.reflow.bind(that), false);

	// touch devices bind touch events
	if ('ontouchstart' in window) {

		this.container.addEventListener("touchstart", function(e) {

			// Don't react if initial down happens on a form element
			if (e.touches[0] && e.touches[0].target && e.touches[0].target.tagName.match(/input|textarea|select/i)) {
				return;
			}

			that.scroller.doTouchStart(e.touches, e.timeStamp);
			that.options.stopPropagation && e.stopPropagation();
		}, false);

		document.addEventListener("touchmove", function(e) {
			that.scroller.doTouchMove(e.touches, e.timeStamp, e.scale);
			that.options.stopPropagation && e.stopPropagation();
		}, false);

		document.addEventListener("touchend", function(e) {
			that.scroller.doTouchEnd(e.timeStamp);
			that.options.stopPropagation && e.stopPropagation();
		}, false);

		document.addEventListener("touchcancel", function(e) {
			that.scroller.doTouchEnd(e.timeStamp);
		}, false);

	// non-touch bind mouse events
	} else {
		
		var mousedown = false;

		this.container.addEventListener("mousedown", function(e) {

			if (e.target.tagName.match(/input|textarea|select/i)) {
				return;
			}

			that.options.stopPropagation && e.stopPropagation();
		
			that.scroller.doTouchStart([{
				pageX: e.pageX,
				pageY: e.pageY
			}], e.timeStamp);

			mousedown = true;
		}, false);

		document.addEventListener("mousemove", function(e) {

			if (!mousedown) {
				return;
			}

			that.options.stopPropagation && e.stopPropagation();
			
			that.scroller.doTouchMove([{
				pageX: e.pageX,
				pageY: e.pageY
			}], e.timeStamp);

			mousedown = true;

		}, false);

		document.addEventListener("mouseup", function(e) {

			if (!mousedown) {
				return;
			}

			that.options.stopPropagation && e.stopPropagation();
			
			that.scroller.doTouchEnd(e.timeStamp);

			mousedown = false;

		}, false);

		this.container.addEventListener("mousewheel", function(e) {
			if(that.scroller.options.zooming) {
				that.scroller.doMouseZoom(e.wheelDelta, e.timeStamp, e.pageX, e.pageY);
			}
		}, false);

	}

	// Stolen from ft-scroller.
	// By removing preventDefault() above and only allowing click if not dragging and not decelerating,
	// we can allow click when not scrolling or decelerating.
	document.addEventListener("click", function(e) {
		var preventClick = that.scroller.__isDragging || that.scroller.__isDecelerating;

		if (!preventClick) { return true; }

		e.preventDefault();
		e.stopPropagation();
		return false;
	});
};

// automatically attach an EasyScroller to elements found with the right data attributes
document.addEventListener("DOMContentLoaded", function() {
	
	var elements = document.querySelectorAll('[data-scrollable],[data-zoomable]'), element;
	for (var i = 0; i < elements.length; i++) {

		element = elements[i];
		var scrollable = element.dataset.scrollable;
		var zoomable = element.dataset.zoomable || '';
		var zoomOptions = zoomable.split('-');
		var minZoom = zoomOptions.length > 1 && parseFloat(zoomOptions[0]);
		var maxZoom = zoomOptions.length > 1 && parseFloat(zoomOptions[1]);

		new EasyScroller(element, {
			scrollingX: scrollable === 'true' || scrollable === 'x',
			scrollingY: scrollable === 'true' || scrollable === 'y',
			zooming: zoomable === 'true' || zoomOptions.length > 1,
			minZoom: minZoom,
			maxZoom: maxZoom
		});

	};

}, false);

window.EasyScroller = EasyScroller;