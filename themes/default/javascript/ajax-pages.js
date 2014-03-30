(function ($) {

	var NAVIGATION_LEFT = 95;
	var EASING = 'easeInOutExpo';
	var HOME_ANIMATION_DURATION = 1000;

	$('wt').entwine(function ($) {


		$('*').entwine({
			EasingFunction: '',
			EffectDuration: 1000,
			IsLoading: false,
			Opacity: 0.5,

			setLoading: function (callback, dontAnimate) {
				var self = this;
				this.setIsLoading(true);

				//hide open menu, and deselect links
				this.closeMenus();

				if (!dontAnimate) {
					//fade out content
					this.animate({
						opacity: this.getOpacity()
					}, this.getEffectDuration(), function () {

						//fix height to avoid scrolling when content changes
						self.height(self.height());

						self.insertLoadingDiv();

						if (callback && typeof(callback) === 'function') {
							callback();
						}
					});
				}
				else {
					self.insertLoadingDiv();

					if (callback && typeof(callback) === 'function') {
						callback();
					}
				}
			},
			insertLoadingDiv: function () {
				var id = 'ajax-loader-' + Math.ceil(Math.random()*10000).toString();

				//check if one is already showing
				if ($('#AjaxLoader').length) {
					return;
				}

				//add loading spinner
				//moved to overlay whole page so user can't click other links while it is loading
				$('body').append(
					$('<div class="loading ajax-loader ' + id + '" id="AjaxLoader"><span id="LoadingIcon"></span></div>').css({
						height: $(window).height(),
						width: $(window).width(),
						position: 'fixed',
						left: 0,
						top: 0,
						zIndex: 100000,
						background: 'url(/themes/sigmoid/images/blank.gif)'
					})
				);

				//close after timer in case it hangs
				setTimeout(function(){
					var loader = $('.' + id);
					if (loader.length) loader.remove();
				}, 4000);
			},

			/**
			 * This is used for updating content, resets height and fades content back in
			 */
			finishLoading: function (bgColour) {
				var self = this;

				//set height back to normal
				this.css({
					height: ''
				});

				this.unsetLoading();

				//fade content back in
				this.animate({
					opacity: 1
				}, this.getEffectDuration());

				if (bgColour) {
					$('body').animate({
						backgroundColor: '#' + bgColour
					})
				}

			},
			/**
			 * This function just removes the loading element
			 */
			unsetLoading: function () {
				var self = this;
				//remove loading
				$('.ajax-loader').fadeOut(this.getEffectDuration(), function () {
					$(this).remove();
					self.setIsLoading(false);
				});


			},
			closeMenus: function () {

				/*// Hides any currently opened dropdowns
				$('.overlaySuper').removeClass('overlaySuper');

				// If the open menu is a secondary nav dropdown
				if ($('.opened').parents('#secondary').length) {
					$('#secondary_overlay').trigger('mouseover');
				}
				// Otherwise, use the close button to hide currently opened menu
				else {
					$('#primary_overlay').trigger('mouseover');
					//$('.opened').find('.closeDropdown').click();
				}

				//close any open menus
				$('.dropdown.opened').each(function () {
					$(this).removeClass('opened');
					$(this).find('.down').fadeOut();
				});

				$('#minimus a.triggered').removeClass('triggered');*/

			}
		});

		//functions for changing content
		$('#AjaxContainer').entwine({

			updateContent: function (content, preventScrolling) {
				var self = this;

				//force JSON object if just passed a string
				if (typeof(content) !== 'object') {
					content = $.parseJSON(content);
				}

				if (content && content.Content) {

					if (preventScrolling) {
						self.setContent(content);
					}
					else {

						$('html,body').scrollTop(0);
						self.setContent(content);

					}

				}
			},
			setContent: function(content) {
				var self = this;
				//html
				this.html(content.Content);

				//title
				//funny stuff to prevent escaping of entities
				$(document).attr('title', $("<div>" + content.Title + "</div>").text());
				$('meta[name="page-id"]').attr('content', content.PageID);
				$('body').attr('id', content.Segment);

				if (self.getIsLoading()) {
					self.finishLoading(content.PageColour);
				}
				self.trigger('contentupdated', content);

			},
			/**
			 * Load in the home page, sliding in from with the navigation
			 * @param data
			 * @param preventScrolling
			 */
			loadHomePage: function(data, preventScrolling) {
				this.finishLoading();
				var windowWidth = $(window).width();
				var windowHeight = $(window).height();
				//scroll to top page
				$('html,body').scrollTop(0);

				//load in new content
				var $oldContent = $('section.section');
				var $homePage = $(data.Content);

				$oldContent.css({
					position:'fixed',
					left:0,
					top:0,
					width:windowWidth,
					height:windowHeight
				});

				//slideout home page
				$homePage.css({
					position:'fixed',
					left:(-1 * windowWidth) + NAVIGATION_LEFT,
					top:0,
					width:windowWidth,
					height:windowHeight,
					backgroundColor:'#' + data.PageColour
				}).animate({
						left: 0
					}, HOME_ANIMATION_DURATION, EASING, function(){
						$('body').css('background-color', '#' + data.PageColour).attr('id', data.Segment);
						$(this).css({
							position: 'static',
							height: '',
							width: ''
						});

					});
				this.append($homePage);

				//slide nav
				var $nav = $('nav.nav-main');
				var navDistance = $nav.width() - NAVIGATION_LEFT;
				//proportion time so it moves at same speed as pages sliding
				$nav.css({
					right:windowWidth - NAVIGATION_LEFT,
					left:'auto'
				}).animate({
						right: 0
					}, HOME_ANIMATION_DURATION, EASING, function(){

					});

				//slide in new content
				$oldContent.animate({
					left:windowWidth
				}, HOME_ANIMATION_DURATION, EASING, function(){
					$oldContent.remove();
				});
			},
			/**
			 * Load another page when on home page, home page slides to the left with navigation
			 * with new page sliding in from right
			 * @param data
			 * @param preventScrolling
			 */
			loadFromHomePage: function(data, preventScrolling) {
				this.finishLoading();
				var windowWidth = $(window).width();
				var windowHeight = $(window).height();
				//scroll to top page
				$('html,body').scrollTop(0);

				//load in new content
				var $newContent = $(data.Content);
				$newContent.css({
					position:'fixed',
					left:$(window).width(),
					top:0,
					width:windowWidth,
					height:windowHeight,
					backgroundColor:'#' + data.PageColour
				});
				this.append($newContent);

				//slideout home page
				$('section#homepage').css({
					position:'fixed',
					left:0,
					top:0,
					width:windowWidth,
					height:windowHeight
				}).animate({
					left: (-1 * windowWidth) + NAVIGATION_LEFT
				}, HOME_ANIMATION_DURATION, EASING, function(){
					$(this).remove();
				});

				//slide nav
				var $nav = $('nav.nav-main');
				var navDistance = $nav.width() - NAVIGATION_LEFT;
				//proportion time so it moves at same speed as pages sliding
				$nav.css({
					right:'',
					left:windowWidth - $nav.width()
				}).animate({
					left: -1 * navDistance
				}, HOME_ANIMATION_DURATION, EASING, function(){
				});

				//slide in new content
				$newContent.animate({
					left:0
				}, HOME_ANIMATION_DURATION, EASING, function(){
					$('body').css('background-color', '#' + data.PageColour).attr('id', data.Segment);
					$newContent.css({
						position: 'static',
						height: '',
						width: ''
					});
				});
			},
			loadPage:function(state) {
				var contentContainer = this;
				var newURL = state.url;

				var previousState = History.getStateByIndex(History.getCurrentIndex() - 1);
				//var data = previousState ? {BackURL: previousState.url} : {};

				contentContainer.setLoading(function () {

					$.ajax({
						type: 'GET',
						url: newURL,
                                                headers: {'X-Referer': previousState.url},
						//data: data,
						complete: function (data) {
							loadingPage = false;
						},
						success: function (data) {

                                                        if (typeof ga !== 'undefined') {
                                                                ga('send', 'pageview', {
                                                                        page: newURL,
                                                                        title: data.Title
                                                                });
                                                        }

							if (data.Title) {
								document.title = decodeURIComponent($('<div>' + data.Title.replace(/\+/g, ' ') + '</div>').html());
							}

							if (data.Redirect) {
								History.pushState(data, data.Title, data.Redirect);
							}
							else if (wt.isHomePage()) {
								contentContainer.loadFromHomePage(data, state.data.preventScrolling);
							}
							else if (data.Segment == 'home' && !wt.isMobile()) {
								contentContainer.loadHomePage(data, state.data.preventScrolling);
							}
							else {
								contentContainer.updateContent(data, state.data.preventScrolling);
							}

							//if (data.Segment) $('nav#primary a.' + data.Segment).makeActive();
						}
					});
				});
			}

		});

		var loadingPage = false;

		$('a').entwine({
			//bind to specific links
			onclick: function (e) {
				//make sure we have a link, and that this anchor doesn't already have an event handler
				// and that is doesn't have target = _blank (external link)
				if (	this.attr('href')
					&& this.attr('href').indexOf('#') === -1
					&& this.attr('href').indexOf('javascript:') === -1
					&& !this.hasClass('ajax-ignore')
					&& this.attr('target') != '_blank'
					&& window.history && window.history.pushState //supports history
					) {

					if (e) e.preventDefault();
					History.pushState({
						preventScrolling:this.hasClass('no-scroll')
					}, '', this.attr('href'));

					//this.ajaxLoad();
				}
				this._super();

			},
			ajaxLoad: function () {
				if (loadingPage) return;

				loadingPage = true;

				var self = this;
				var contentContainer = $('#AjaxContainer');
				var newURL = self.attr('href');

				contentContainer.setLoading(function () {

					$.ajax({
						type: 'GET',
						url: newURL,
						complete: function (data) {
							loadingPage = false;
						},
						success: function (data) {
                                                        // add tracking based on the new URL

							contentContainer.updateContent(data, self.hasClass('no-scroll'));
							//if (data.Segment) $('nav#primary a.' + data.Segment).makeActive();
						}
					});
				});

			},
			/**
			 * Makes a link in the navigation active
			 */
			makeActive:function() {
				/*this.removeNavClasses();

				if (!this.hasClass('noClass')) {
					this.addClass('current');

					if (this.hasClass('river')) {
						this.closest('.dropdown').find('.drop').addClass('section');
					}
					else if (!this.hasClass('drop')) {
						this.closest('.dropdown').find('.drop').addClass('section');
						this.closest('.cliff').find('.river').addClass('section');
					}
				}*/
			},
			removeNavClasses:function() {
				/*($('nav#primary a.current').removeClass('current');
				$('nav#primary a.section').removeClass('section');*/
			}
		});


		/*$('a.ajaxLink').entwine({
		 onclick: function (e) {
		 e.preventDefault();

		 this.ajaxLoad();
		 this._super();
		 }
		 });*/

		//update content if history changes

	});

	$('.ajax-get-form').entwine({
		onsubmit:function(e) {
			e.preventDefault();

			var url = this.attr('action');
			var rand = "rand=" + Math.floor(Math.random() * 10000);

			History.pushState(null, '', url + '?' + this.serialize() + '&' + rand);
		}
	});

	History.Adapter.bind(window, 'statechange', function () {

		var state = History.getState();
		if (History.getCurrentIndex() != 0 && state) {//chrome sometimes triggers this on first page load
			$('#AjaxContainer').loadPage(state);
		}
	});

	// global ajax handlers
	/*$(document).ajaxComplete(function (e, xhr, settings) {

		//update history, url, only if get request, not for posts
		if (settings.type.toLowerCase() == 'get') {

			//only update if json and has Title
			if (isJSON(xhr.responseText)) {

				var json = $.parseJSON(xhr.responseText);

				if (json.Title) {
					if (window.historyhistory && window.history.pushState) {
						History.pushState(xhr.responseText, '', settings.url);
					}

					//analytics
					if (typeof ga !== 'undefined') {
						ga('send', 'pageview', {
							page: settings.url,
							title: json.Title
						});
					}
				}
			}


		}

		//error
		if (xhr.status < 200 || xhr.status > 399) {
			if ($('#content').getIsLoading()) {
				$('#content').unsetLoading()
			}
			//geni.statusMessage('An error has occurred loading the requested content', 'bad');
		}

	});*/



	function isJSON(str) {
		if (!str) return false;
		str = str.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@');
		str = str.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']');
		str = str.replace(/(?:^|:|,)(?:\s*\[)+/g, '');
		return (/^[\],:{}\s]*$/).test(str);
	}
})(jQuery);