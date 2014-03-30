var Utils = {};

(function ($) {

        Utils.functions = {

                themeDir: '',
                live: false,
                notificationTimer: 6000,

                blankField: function (field, defaultValue) {
                        $(field).focus(function () {
                                if ($(this).val() == defaultValue) {
                                        $(this).val('');
                                }
                        });

                        $(field).blur(function () {
                                if ($(this).val() == '') {
                                        $(this).val(defaultValue);
                                }
                        });

                        $($(field)[0].form).submit(function () {
                                if ($(field).val() == defaultValue) {
                                        $(field).val('');
                                }
                        });
                },

                insertLoading: function (container, clear) {
                        if (clear) {
                                $(container).html('');
                        }
                        Utils.removeLoading();

                        var top = container ? $(container).height() / 2 - 20 : $(window).height() / 2 - 20;
                        if (top < 0) top = 0;

                        var left = container ? $(container).width() / 2 - 50 : $(window).width() / 2 - 50;
                        if (left < 0) left = 0;

                        var position = container ? 'absolute' : 'fixed';

                        if (!container) container = 'body';

                        $(container).append(
                                        $('<div id="AjaxLoading"><img src="' + Utils.themeDir + '/images/loading.gif" alt="Loading" /></div>')
                                                .css({
                                                        'position': position,
                                                        'left': left,
                                                        'top': top
                                                })
                                )
                                .css({
                                        'position': 'relative'//,
                                        //'border' : '1px solid red'
                                });


                },

                removeLoading: function () {
                        $('#AjaxLoading').remove();
                },


                activeTableRows: function (cssSelector) {

                        if (cssSelector) {
                                $(document).on('click', cssSelector + ':not(thead tr)', 'click', function (e) {

                                        $(this).siblings().removeClass('active');
                                        $(this).addClass('active');

                                        if (Utils.checkClickTarget(e.target.nodeName.toLowerCase())) {
                                                $(this).find('a.default').trigger('click');
                                        }

                                });
                                $(cssSelector + ':not(thead tr)').css('cursor', 'pointer');
                        } else {
                                $(document).on('click', '#Content table tr:not(thead tr)', function (e) {

                                        $(this).siblings().removeClass('active');
                                        $(this).addClass('active');

                                        if (Utils.checkClickTarget(e.target.nodeName.toLowerCase())) {
                                                $(this).find('a.default').trigger('click');
                                        }
                                });
                                $('#Content table tr:not(thead tr)').css('cursor', 'pointer');
                        }
                },

                checkClickTarget: function (target) {
                        if (target != 'a' && target != 'input' && target != 'select' && target != 'textarea') {
                                return true;
                        }

                        return false;
                },

                notificationsTimeout: null,

                notify: function (message, type) {
                        //remove any previous notifications which haven't already cleared
                        $('#Notification').remove();

                        var hideNotification = true;

                        if (Utils.notificationsTimeout) clearTimeout(Utils.notificationsTimeout);

                        var container = $('#NotificationContainer');

                        if (container.length) {
                                container = '#NotificationContainer';
                                hideNotification = false;
                        }
                        else { //if no NotificationContainer use body
                                container = 'body';
                        }

                        if (!type) type = 'good';
                        $(container).append(
                                $('<div id="Notification"></div>').html(message)
                                        .addClass(type)
                                        .css({
                                                'position': hideNotification ? 'fixed' : 'static',
                                                'top': 50,
                                                //'left' : 500,
                                                'right': 0,
                                                'display': 'none',
                                                'z-index': 10000
                                        })
                        );

                        //var left = $(window).width()/2 - $('#Notification').width()/2;
                        $('#Notification')
                                //.css('right', 50)
                                .slideDown('slow', function () {
                                        if (hideNotification) {
                                                Utils.notificationsTimeout = setTimeout(function () {
                                                        $('#Notification').fadeOut('slow', function () {
                                                                $('#Notification').fadeOut('fast');
                                                        });
                                                }, Utils.notificationTimer);
                                        }
                                        else {
                                                Utils.scrollTo('#Notification');
                                                $('#Notification').click(function (e) {
                                                        $(this).hide('slow');
                                                });
                                        }
                                });


                },

                log: function (message) {
                        if (!Utils.live) {
                                console.log(message);
                        }
                },

                scrollTo: function (selector, offset) {
                        var moveTo = $(selector).offset().top;
                        if (offset) moveTo += offset;

                        if (!$(selector).isViewable()) {
                                $('html,body').animate({scrollTop: moveTo}, 'slow');
                        }
                },

                ajaxLinks: function () {
                        $('a').each(function () {
                                var href = $(this).attr('href');

                                if (href.indexOf('#popup') != -1) {
                                        $(this).unbind();
                                        $(this).click(function (e) {
                                                e.preventDefault();

                                                $.get(href, function (data) {
                                                        $.modal(data);
                                                });
                                        });
                                }
                                else if (href.indexOf('#widepopup') != -1) {
                                        $(this).unbind();
                                        $(this).click(function (e) {
                                                e.preventDefault();
                                                var hrefNoHash = href.substr(0, href.indexOf('#'));

                                                $.get(hrefNoHash + "?wide=true", function (data) {
                                                        $.modal(data);
                                                });
                                        })
                                }
                        });
                },

                setupForm: function (formSelector) {
                        //add delay to allow for elements to load
                        setTimeout(function () {
                                $(formSelector).find('.field.text,.field.textarea,.field.email,.field.dropdown').each(function () {
                                        //console.log($(this).attr('id'));
                                        var field = $(this).find('input, textarea, select');
                                        var label = $(this).find('label');

                                        //if (!field.val()) {
                                        if (label.length > 0)    
                                        field.attr('placeholder', label.html());
                                        //}
                                });

                                if (!$.support.placeholder) {
                                        $('input.text, input.email, input.password, textarea').placeholder();
                                }
                        }, 50);

                },

                clearForm: function (formSelector) {
                        $(formSelector).find('input[type=text],input[type=password],textarea').val('');
                        $(formSelector).find('select').find('option').removeAttr('selected');
                        $(formSelector).find('input[type=checkbox],input[type=radio]').removeAttr('checked');
                },

                confirm: function (title, message, okCallback, cancelCallback) {
                        $('<p>' + message + '</p>').dialog({
                                modal: true,
                                title: title,
                                buttons: {
                                        "Ok": function () {
                                                if (typeof(okCallback) === 'function') {
                                                        okCallback.call();
                                                }

                                                $(this).dialog("close");
                                        },
                                        Cancel: function () {
                                                if (typeof(cancelCallback) === 'function') {
                                                        cancelCallback.call();
                                                }

                                                $(this).dialog("close");
                                        }
                                }
                        });
                }
        };
        Utils = $.extend(Utils, Utils.functions);

        $.fn.isViewable = function () {

                var $elem = $(this);

                var docViewTop = $(window).scrollTop();
                var docViewBottom = docViewTop + $(window).height();

                var elemTop = $elem.offset().top;
                var elemBottom = elemTop + $elem.height();

                return ((elemBottom >= docViewTop) && (elemTop <= docViewBottom)
                        && (elemBottom <= docViewBottom) && (elemTop >= docViewTop) );

        }

        $.support.placeholder = (function () {
                var i = document.createElement('input');
                return 'placeholder' in i;
        })();

        /* $.ajax({
         complete : function(ajax, status) {

         if (status == 'abort') {
         alert('here');
         Utils.removeLoading();
         }
         }
         });*/

        var prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
        $.supportsCSSCalc = function () {
                var prop = 'width:';
                var value = 'calc(10px);';
                var el = document.createElement('div');

                el.style.cssText = prop + prefixes.join(value + prop);

                return !!el.style.length;
        };

        $.supportsBorderRadius = function () {
                var prop = 'border-radius:';
                var value = '8px 8px 8px 8px;';
                var el = document.createElement('div');

                el.style.cssText = prop + prefixes.join(value + prop);

                return !!el.style.length;
        }

})(jQuery);

//Dates
Date.prototype.addDays = function (days) {
        this.setDate(this.getDate() + days);
        return this;
}

Date.prototype.addHours = function (hours) {
        this.setHours(this.getHours() + hours);
        return this;
}

Date.prototype.addMilliseconds = function (milliseconds) {
        this.setMilliseconds(this.getMilliseconds() + milliseconds);
        return this;
}

Date.prototype.addMinutes = function (minutes) {
        this.setMinutes(this.getMinutes() + minutes, this.getSeconds(), this.getMilliseconds());
        return this;
}

Date.prototype.addMonths = function (months) {
        this.setMonth(this.getMonth() + months, this.getDate());
        return this;
}

Date.prototype.addSeconds = function (seconds) {
        this.setSeconds(this.getSeconds() + seconds, this.getMilliseconds());
        return this;
}

Date.prototype.addYears = function (years) {
        this.setFullYear(this.getFullYear() + years);
        return this;
}