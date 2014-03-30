(function($){

	$('wte').entwine(function($){

        $('.slide-item').entwine({
            onadd:function(){
                this.cycle({
                    fx: 'scrollHorz',
                    speed: 1000,
                    pager: '.cycle-pager'
                });
            }
        });

        $('.tabs').entwine({
            onmatch:function() {
                this.setupTabs();
                this._super();
            },
            setupTabs:function() {
                this.simpletabs({
                    tabs : '.gallery-tab a',
                    selectedClass : 'current',
                    onTabChange : function(tab, panel) {

                    }
                });
            }
        });
    });

    $(document).ready(function(){
        /* MOBILE NAVIGATION */
        //prepend menu icon
        $('header nav').prepend('<div id="menu-icon"></div>');

        /* toggle nav */
        $("#menu-icon").on("click", function(){
            $(".nav").slideToggle(800, 'easeInOutExpo');
            $(this).toggleClass("active");
        });

        $(window).resize(function() {
            if ( $(window).width() > 480 ) {
                $(".nav").removeAttr("style");
            }
        });
    });

})(jQuery);