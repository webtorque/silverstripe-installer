(function ($) {

	$.entwine('wt.ajax', function ($) {

		var body = $('body');

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

					if (!body.getIsLoading()) {
						History.pushState({}, '', this.attr('href'));
					}
				}
				this._super();

			}
		});


		$('body').entwine({
			IsLoading: false,

			loadPage:function(state) {

				if (this.getIsLoading()) return;

				this.setIsLoading(true);

				var self = this,
					previousState = History.getStateByIndex(History.getCurrentIndex() - 1);

				this.addClass('loading');

				$.ajax({
					type: 'GET',
					url: state.url,
					headers: {'X-Referer': previousState ? previousState.url : ''},
					complete: function (data) {
						self.removeClass('loading');
					},
					success: function (data) {

						//set title
						if (data.Title) {
							document.title = decodeURIComponent($('<div>' + data.Title.replace(/\+/g, ' ') + '</div>').html());
						}

						//is redirect
						if (data.Redirect) {
							History.pushState(data, data.Title, data.Redirect);
							return;
						}

						if (data.Content) {
							self.loadContent(data.Content);
						}

					}
				});
			},
			getContentContainer:function() {
				return $('#content')
			},
			loadContent:function(content) {
				this.unloadOldPage();
				this.loadNewPage(content);
			},
			unloadOldPage:function() {
				var current = this.getContentContainer().find('[role=layout]').first();

				$('footer').fadeOut('fast');
				current.addClass('mid-transition');
				TweenMax.to(current, 1.2, {
					right: '-200%',
					opacity: 0,
					startAt: { opacity: 1 },
					onComplete: function () {
						current.slideUp('fast')
							.removeClass('mid-transition')
							.remove();
					}
				});
			},
			loadNewPage:function(content) {

				var newContent = $(content),
					self = this;

				this.getContentContainer().append(newContent);

				newContent.addClass('mid-transition');
				TweenMax.from(newContent, 1.2, {
					right: '200%',
					opacity: 0,
					onComplete: function () {
						newContent.removeClass('mid-transition');
						$('footer').fadeIn('fast');
						self.setIsLoading(false);
					}
				});
			}
		});

		History.Adapter.bind(window, 'statechange', function () {
			var state = History.getState();

			if (History.getCurrentIndex() !== 0 && state) {
				//some urls require custom actions, this will
				// trigger a state change on the dom element if it exists
				if (state.data && state.data.id && $('#' + state.data.id).length) {
					$('#' + state.data.id).trigger('historystatechange');
				}
				else {
					$('body').loadPage(state);
				}
			}
			else {
			}
		});

		$('.ajax-get-form').entwine({
			onsubmit:function(e) {
				e.preventDefault();

				var url = this.attr('action');
				var rand = "rand=" + Math.floor(Math.random() * 10000);

				History.pushState({}, '', url + '?' + this.serialize() + '&' + rand);
			}
		});

	});

})(jQuery);