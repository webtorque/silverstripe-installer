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