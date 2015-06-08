(function($){

        var ieLink = 'http://windows.microsoft.com/en-US/internet-explorer/download-ie';
        var chromeLink = 'http://www.google.com/chrome';
        var firefoxLink = 'http://www.mozilla.org/en-US/firefox/';
        var operaLink = 'http://www.opera.com/download/';
        var safariLink = 'http://www.apple.com/safari/';

        var html = '<div id="IEWarning"><p>This website is not properly supported in your browser. We recommend upgrading to a more modern browser like the latest version if <a href="{IELINK}" target="_blank">IE</a>,';
        html += ' <a href="{CHROMELINK}" target="_blank">Chrome</a>, <a href="{FIREFOXLINK}" target="_blank">Firefox</a>, <a href="{OPERALINK}" target="_blank">Opera</a> or <a href="{SAFARILINK}" target="_blank">Safari</a></p></div>';

        $(document).ready(function(){

                if ($('html.canvas').length === 0) {
                        //if (!getCookie('IEWARNING')) {
                                html = html.replace('{IELINK}', ieLink).replace('{CHROMELINK}', chromeLink).replace('{FIREFOXLINK}', firefoxLink).replace('{OPERALINK}', operaLink).replace('{SAFARILINK}', safariLink);

                                var $element = $(html).css({
                                        position : 'static',
                                        display: 'none',
                                        width : '100%',
                                        'background-color' : '#e0cf4d',
                                        'border-bottom' : '1px solid #333'
                                });

                                $element.find('p').css({
                                        'margin' : 0,
                                        'font-size' : '18px',
                                        padding : '15px'
                                });

                                $('body').prepend($element);

                                setTimeout(function(){
                                        $($element).slideDown();
                                        //setCookie("IEWARNING", 1, 10);
                                }, 2000);
                        //}
                }

        });
})(jQuery);