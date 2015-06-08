var TABLET_WIDTH = 1023;
var MOBILE_WIDTH = 767;

(function($){

    /**
     * Global handler for window resizing
     */
    $(window).on('resize', function(){
        $('*').trigger('windowresize');
    });


    // NAVIGATION FOR MOBILE
    $('header nav.mobile-nav').prepend('<div id="menu-icon"></div>');


	$.entwine('wt', function($){

        // Equalize columns height
        $('.equalizeHeight').entwine({
            onadd:function(){
                this.equalizeHeight();
                this._super();
            },
            equalizeHeight:function(){
                var maxHeight = 0;
                $('.equalizeHeight').each(function(index){
                    maxHeight = Math.max(maxHeight, $(this).height());

                    console.log(index + 1 + ': ' + $(this).text());
                });
                this.height(maxHeight);
            }
        });


        /* MOBILE MENU */
        $('#mobileMenuButton a').entwine({
            onclick: function (e) {
                e.preventDefault();

                var nav = $('.mobile-nav .menu');
                var self = $(this);

                if (nav.is(':visible')) {
                    nav.slideUp();
                    self.removeClass('hide');
                }
                else {
                    nav.slideDown();
                    self.addClass('hide');
                }

                this._super(e);
            }
        });

        $('.mobile-nav a').entwine({
            onclick: function (e) {
                var container = $(this).closest('li');

                //if it has a submenu
                if (container.find('ul').length) {
                    $('.mobile-nav li').find('ul').slideUp();
                    $('.mobile-nav li').not(container).removeClass('open');

                    //clicked for first second time - go to link
                    if (container.hasClass('open')) {
                        return true;
                    }
                    else {
                        e.preventDefault();
                        container.find('ul').slideDown();
                        container.addClass('open');
                    }
                }

                return true;
            }
        });


        $('.tiles .tile').entwine({
            onmouseover:function(e){
                e.preventDefault();
                var head = this.children('.tileHead'),
                    body = this.children('.tileBody'),
                    head_orig = head.height(),
                    body_orig = body.height(),
                    head_hover = head_orig - 100,
                    body_hover = body_orig + 100,
                    anim_speed = 500;

                head.stop().animate({
                    'height': head_hover
                }, anim_speed, 'easeOutExpo');

                body.stop().animate({
                    'height': body_hover
                }, anim_speed, 'easeOutExpo');
            },
            onmouseleave:function(){
                var head = this.children('.tileHead'),
                    body = this.children('.tileBody'),
                    head_orig = head.height(),
                    body_orig = body.height(),
                    anim_speed = 500;

                head.stop().animate({
                    'height': 145
                }, anim_speed, 'easeOutExpo');
                body.stop().animate({
                    'height': 82
                }, anim_speed, 'easeOutExpo');
            }
        });

	});

})(jQuery);