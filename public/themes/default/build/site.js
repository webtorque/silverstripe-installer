(function($){

    $.entwine('wt', function($){

        // Use CustomSelect on select element.
        $('#Form_ContactForm_HearAboutUs').entwine({
            onadd:function(){
                this.customSelect();
                this._super();
            }
        });

    });


})(jQuery);
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
(function($){

    $.entwine('wt', function($){

        /* FULL WIDTH DROP-DOWN MENU */
        $('nav.full-width-nav li').entwine({
            onmouseover: function (e) {
                e.preventDefault();
                this.hideDropdowns();
                this.showDropdown();
            },
            onmouseleave: function () {
                this.hideDropdown();
            },
            showDropdown: function () {
                var dropdown = this.find('ul.nav-dropdown');
                var container = $('.dropdown-container');
                //var arrow = $('.page-scroll-button');
                var menu = $('ul.menu').find('li');
                this.each(function () {
                    $(this).addClass('show');
                })

                if (dropdown.length) {
                    //if (container.is(':visible')) container.hide();
//                    arrow.addClass('show');
                    container.showDropdown(dropdown.clone());
                    container.positionArrow(this.offset().left + (this.outerWidth() / 2));
                }
            },
            hideDropdown: function () {
                $('.dropdown-container').hideDropdown();
                //var arrow = $('.page-scroll-button');
                var menu = $('ul.menu li');
                menu.removeClass('show');
//                arrow.removeClass('show')
            },
            hideDropdowns: function () {
                //console.log('hiding dropdowns');

                var menu = $(this);
                menu.removeClass('show');

                $('.dropdown-container').each(function () {
                    //console.log(this);
                    clearTimeout($(this).stop().hide().removeClass('open').getCloseTimer());
                    clearTimeout($('ul.menu').find('li').getCloseTimer());
//                    clearTimeout($('page-scroll-button').stop().hide().removeClass('show').getCloseTimer());

                });

            }
        });

        $('.dropdown-container').entwine({
            HoverTimer: 300,
            CloseTimer: null,
            AnimationSpeed: 300,

            onmouseover: function (e) {
                this.showDropdown();
            },
            onmouseleave: function (e) {
                this.hideDropdown();
            },
            showDropdown: function (content) {
                var pos = this.offset().left;

                if (this.is(':visible') && this.getCloseTimer()) {
                    clearTimeout(this.getCloseTimer());
                    return;
                }

                //$('.page-scroll-button').addClass('open').html(content).fadeIn(this.getAnimationSpeed()));
                this.find('.nav-dropdown').remove();
                this.addClass('open').append(content).fadeIn(this.getAnimationSpeed());
            },
            hideDropdown: function () {
                var self = this;
                this.setCloseTimer(setTimeout(function () {

                    $('.dropdown-container').fadeOut(self.getAnimationSpeed());
                    $('.dropdown-container').removeClass('open');

                }, this.getHoverTimer()));

            },
            positionArrow: function (pos) {
                this.find('.page-scroll-button').css('left', pos - (this.find('.page-scroll-button').width() / 2));
            }
        });

    });

})(jQuery);
//;(function($){
//	$.entwine('wt.nav', function($){
//		$("#menu-icon").entwine({
//			onclick:function(){
//                $(".mobile-nav .menu").stop().slideToggle(800, 'easeOutQuart');
//                $(this).toggleClass("active");
//			}
//		});
//	});
//})(jQuery);

;(function($){

})(jQuery);
