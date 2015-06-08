/*!
 * popup.js v0.1
 * 
 * Copyright 2014, Conrad Dobbs
 * This content is released under the MIT license
 */

;
(function ($, window, document, undefined) {

	var pluginName = 'popup',
		defaults = {
			popupHTML: '<div class="popup"><h3 class="title">{Title}</h3><div class="popup-content"></div><p class="buttons"></p></div>',
			overlayHTML: '<div class="popup-overlay"></div>',
			buttonHTML: '<a href="#">{Name}</a>',
			responsive: true,
			title: '',
			extraCSS: '',
			extraTitleCSS: '',
			buttons: {},
			fixed: true,
			modal: true,
			appendTo: 'body',
			clickableOverlay: true,
			topOffset: 10
		};


	function Plugin(element, options) {
		this.element = element;
		this.options = $.extend({}, window.popup.defaults, options);

		this._defaults = window.popup.defaults;
		this._name = pluginName;

		this.init();
	}

	Plugin.prototype = {
		init: function () {
			this.options.name = pluginName + '_' + Math.floor(Math.random() * 1e9);
			this._defineElements();
			this._handleWindowLoadAndResize();
			this._detectViewport();
			this.refresh({ firstLoad: true });
		},
		_defineElements: function () {
			//if (this.element === document.body) this.element = window;
			this.$scrollElement = $(window);
			this.$element = (this.element === window ? $('body') : this.$scrollElement);
			this.$viewportElement = (this.options.viewportElement !== undefined ? $(this.options.viewportElement) : (this.$scrollElement[0] === window || this.options.scrollProperty === 'scroll' ? this.$scrollElement : this.$scrollElement.parent()) );
		},
		refresh: function (options) {
			var self = this;

			if (options && options.firstLoad) {
				this._setupButtons();

				//setup popup
				this.popup = $(this.options.popupHTML.replace('{Title}', this.options.title))
					.hide();

				//insert content
				this.popup.find('.popup-content').html(this._getContent());

				//add any extra classes
				if (this.options.extraCSS) this.popup.addClass(this.options.extraCSS);

				//hide title if nothing
				if (!this.options.title) this.popup.find('.title').hide();
				//add any extra classes
				else if (this.options.extraTitleCSS) this.popup.find('.title').addClass(this.options.extraTitleCSS);

				//add or hide buttons
				if (this.buttons.length) this.popup.find('.buttons').append(this.buttons);
				else this.popup.find('.buttons').hide();

				this.popup.appendTo(this.options.appendTo);

				if (this.options.modal) {

					this.overlay = $(this.options.overlayHTML).on('click', function (e) {
						e.preventDefault();
						if (self.options.clickableOverlay) {
							self.close();
						}
					});
					this.overlay.appendTo(this.options.appendTo);
				}

				this._position().show();
			}

			this._position();
		},
		show: function () {
			var self = this;

			this.popup.fadeIn('fast', function () {
				if (self.options.modal) self.overlay.show();
			});

			return this;
		},
		close: function () {
			var self = this;
			this.overlay.hide();
			this.popup.fadeOut('fast', function () {
				self.destroy();
			});

			return this;
		},
		_getContent: function () {
			return this.element && this.element.jquery ? this.element.html() : this.element;
		},
		_position: function () {

			var positioning = this.options.fixed ? 'fixed' : 'absolute';

			//check if too large
			if (this.popup.height() >= this.$scrollElement.height()) {
				positioning = 'absolute';
			}

			//this needs to run first otherwise width is full width
			this.popup.css({
				position: positioning
			});

			var doHide = false;

			//make visible so we can get width and height
			if (this.popup.css('display') == 'none') {
				this.popup.css({
					visibility: 'hidden',
					display: 'block'
				});
				doHide = true;
			}

			var width = this.popup.width();
			var height = this.popup.height();

			if (doHide) this.popup.css({
				visibility: 'visible',
				display: 'none'
			});

			var baseLeftPosition = (this.viewportWidth / 2) - (width / 2),
				baseTopPosition = (this.viewportHeight / 2) - (height / 2),
				leftPosition = positioning === 'fixed' ? baseLeftPosition : baseLeftPosition + this.viewportOffsetLeft,
				topPosition = positioning === 'fixed' ? baseTopPosition : baseTopPosition + this.viewportOffsetTop;

			//don't go off screen;
			if (topPosition < this.options.topOffset) {
				topPosition = 10;
			}

			if (positioning !== 'fixed' && topPosition <= (this.viewportOffsetTop + this.options.topOffset)) {
				topPosition = this.viewportOffsetTop + 10;
			}

			//fixed is based on top left, absolute needs to take into account scroll position
			this.popup.css({
				left: leftPosition,
				top: topPosition
			});

			return this;
		},
		_handleWindowLoadAndResize: function () {
			var self = this,
				$window = $(window);

			/*if (self.options.responsive) {
			 $window.bind('load.' + this.name, function() {
			 self.refresh();
			 });
			 }*/

			$window.bind('resize.' + this.name, function () {
				self._detectViewport();

				if (self.options.responsive) {
					self.refresh();
				}
			});
		},

		_setupButtons: function () {
			var self = this;
			this.buttons = [];

			//create buttons and bind click
			$.each(this.options.buttons, function (name) {
				var callback = this;
				var $button = $(self.options.buttonHTML.replace('{Name}', name)).on('click', function (e) {
					e.preventDefault();

					if (typeof(callback) === 'function') {
						callback.call(self, e);
					}
				});

				self.buttons.push($button);

			});

			return this.buttons;
		},
		_detectViewport: function () {
			var viewportOffsets = this.$viewportElement.offset(),
				hasOffsets = viewportOffsets !== null && viewportOffsets !== undefined;

			this.viewportWidth = this.$viewportElement.width();
			this.viewportHeight = this.$viewportElement.height();

			this.viewportOffsetTop = (hasOffsets ? viewportOffsets.top : 0);
			this.viewportOffsetLeft = (hasOffsets ? viewportOffsets.left : 0);

			if (this.viewportOffsetTop == 0) {
				this.viewportOffsetTop = this.$scrollElement.scrollTop()
					? this.$scrollElement.scrollTop()
					: 0;
			}
		},

		_reset: function () {

		},
		destroy: function () {
			this._reset();

			this.$scrollElement.unbind('resize.' + this.name);

			$(window).unbind('resize.' + this.name);

			if (this.buttons.length) {
				$.each(this.buttons, function () {
					$(this).off();
				});
			}

			if (this.popup) this.popup.remove();
			if (this.overlay) this.overlay.remove();
		}
	};

	$.fn[pluginName] = function (options) {
		var args = arguments;
		if (options === undefined || typeof options === 'object') {
			return this.each(function () {
				if (!$.data(this, 'plugin_' + pluginName)) {
					$.data(this, 'plugin_' + pluginName, new Plugin(this, options));
				}
			});
		} else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {
			return this.each(function () {
				var instance = $.data(this, 'plugin_' + pluginName);
				if (instance instanceof Plugin && typeof instance[options] === 'function') {
					instance[options].apply(instance, Array.prototype.slice.call(args, 1));
				}
				if (options === 'destroy') {
					$.data(this, 'plugin_' + pluginName, null);
				}
			});
		}
	};

	$[pluginName] = function (options) {
		var $window = $(window);
		return $window[pluginName].apply($window, Array.prototype.slice.call(arguments, 0));
	};

	// Expose the plugin class so it can be modified
	window.popup = Plugin;
	window.popup.defaults = defaults;
}(jQuery, this, document));