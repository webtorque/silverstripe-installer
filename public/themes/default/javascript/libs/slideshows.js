(function($){
	$.entwine('wte.slideshows', function($){
		$('.slideshow').entwine({
			onadd:function() {
				this.find('.item-container').cycle({
					fx: 'scrollHorz',
					speed: 1000,
					timeout: 5000,
					pager: '.cycle-pager',
                    slides: '> .item',
                    prev: '.prev',
                    next: '.next'
				});

				this._super();
			}
		});
	});
})(jQuery);