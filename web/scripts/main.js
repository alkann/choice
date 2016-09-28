"use strict";
var generalInterval = (function () {

    var options = {
            interval:100
        },
        fnArr = {
            elements:[],
            fn:[]
        };


    function callFuntions() {
        for(var x = 0; x<fnArr.elements.length; x++){
            fnArr.fn[x]()
        }
        resetAll()
    }

    function resetAll(){
        fnArr = {
            elements:[],
            fn:[]
        };
        setTimeout(callEachFuntions, options.interval)
    }

    function callEachFuntions(){
        callFuntions()
    }

    return {
        addFunction: function (data) {
            if($.inArray(data.name, fnArr.elements) == -1){
                fnArr.elements.push(data.name);
                fnArr.fn.push(data.fn);
            }
        },

        init: function (extend) {
            $.extend(options, extend);
            resetAll();
        }
    };
})();

generalInterval.init();
var $window = $(window);

$(document).scroll(function() {
    if($(window).width()>1024) {
        generalInterval.addFunction({
            name: 'section1',
            fn: function () {
                var el = $('#section-0');
                if (el.length) {
                    var left = $window.scrollTop() - 150;
                    if (left > 0) {
                        left = 0;
                    }
                    el.css({
                        backgroundPositionX: left - 5
                    })
                }

            }
        });
        generalInterval.addFunction({
            name: 'section3',
            fn: function () {
                var el = $('#section-2');
                if (el.length) {
                    var left = $window.scrollTop() - 1300;

                    if (left < -440) {
                        left = -460;
                        el.css({
                            opacity: 0
                        })
                    }

                    if (left >= -440) {
                        el.css({
                            opacity: 1
                        })
                    }

                    if (left > -230) {
                        left = -230;
                    }

                    el.css({
                        backgroundPositionX: left - 5
                    })
                }

            }
        });
        generalInterval.addFunction({
            name: 'section4',
            fn: function () {
                var el = $('#section-3');
                if (el.length) {
                    var left = $window.scrollTop() - 1900;

                    if (left < -340) {
                        el.css({
                            opacity: 0
                        })
                    }

                    if (left >= -340) {
                        el.css({
                            opacity: 1
                        })
                    }
                }

            }
        });
    }else{
        generalInterval.addFunction({
            name: 'section3',
            fn: function () {
                var el = $('#section-2');
                if (el.length) {
                    var left = $window.scrollTop() - 1300;

                    if (left < -440) {
                        left = -460;
                        el.css({
                            opacity: 0
                        })
                    }

                    if (left >= -440) {
                        el.css({
                            opacity: 1
                        })
                    }
                }

            }
        });
        generalInterval.addFunction({
            name: 'section4',
            fn: function () {
                var el = $('#section-3');
                if (el.length) {
                    var left = $window.scrollTop() - 1900;

                    if (left < -340) {
                        el.css({
                            opacity: 0
                        })
                    }

                    if (left >= -340) {
                        el.css({
                            opacity: 1
                        })
                    }
                }

            }
        });
    }
});

$(document).ready(function(){
    if($('.js-overlay').length){
        $('.js-overlay').click(function(){
            $('body').css({
                paddingRight:'15px',
                overflowY: 'hidden'
            });
            $('.js-overlay-inner')
                .html($('#'+$(this).data('description')).html());
            $('.js-overial-box').fadeIn(600)

            //var height = $('.js-overlay-inner>*').height() + 200;

           // if(height > $(window).height()*0.9){
            //    height = $(window).height()*0.9;
           // }

           // $('.js-overlay-inner').height(height);
        })
        $('.js-overial-box').click(function(e){
            if(e.target != this) return;
            $(this).fadeOut(600);
            setTimeout(function(){
                $('body').css({
                    paddingRight:'0',
                    overflowY: 'scroll'
                });
            }, 600)
        })
    }

    $(function() {
        $('a[href*="#"]:not([href="#"])').click(function() {
            if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                if (target.length) {
                    $('html, body').animate({
                        scrollTop: target.offset().top
                    }, 1000);
                    return false;
                }
            }
        });
    });
});

$( window ).on('load', function() {
    $('.js-spinner').fadeOut(300);
});

$(document).ready(function(){
    $('.js-sidebar').on('click', function(){
        var self = $(this);

        if(self.data('open')){
            $('.js-choice-app').css({
                marginLeft: 0
            });
            $('.choice__user__logout').fadeOut();
            $('.js-sidebar').data('open', false)
        }else{
            $('.js-choice-app').css({
                marginLeft: '-350px'
            });
            $('.choice__user__logout').fadeIn(300);
            $('.js-sidebar').data('open', false)
            $(this).data('open', true)
        }

        $('.js-asside>div').fadeOut(500);

        setTimeout(function(){
            $(self.data('destination')).fadeIn(500);
        }, 550)
    })
});

$(document).ready(function(){
    $(document).on('submit', '.js-register-form',function( event ) {

        if($(this).find('[name=pass-2]').val() == $(this).find('[name=pass]').val()){
            $.ajax({
                url: "./API/register.php",
                method: "POST",
                data: $( this ).serializeArray(),
                dataType: "json"
            }).done(function( data ) {
                if(data.succes){
                    window.location.reload();
                }
            });
        }else{
            alert('Hasło i jego potwierdzenie muszą być takie same')
        }
        event.preventDefault();
    });

    $(document).on('submit', '.js-login-form', function( event ) {
        $.ajax({
            url: "./API/login.php",
            method: "POST",
            data: $( this ).serializeArray(),
            dataType: "json"
        }).done(function( data ) {
            if(data.logged){
                window.location.reload();
            }
        });
        event.preventDefault();
    });

    $(document).on('submit', '.js-logout-form',function( event ) {
        $.ajax({
            url: "./API/logout.php",
            method: "POST",
            data: $( this ).serializeArray(),
            dataType: "json"
        }).done(function( data ) {
            if(!data.logged){
                window.location.reload();
            }
        });
        event.preventDefault();
    });

    $(document).on('click', '.js-one-order-link', function(){
       $('.js-order-inside').fadeOut(100);
        $.ajax({
            url: "./API/one_order.php",
            method: "POST",
            data: {
                order_id:$(this).data('order'),
                order_name:$(this).html()
            }
        }).done(function( data ) {
            $('.js-order-inside')
                .html(data)
                .fadeIn(400);
        });
    });

    $(document).on('click', '.js-user-data-link', function(){
        if(!$(this).data('open')){
            $('.js-user-data-content').css({
                height : $('.js-user-data-content>div').height(),
                marginBottom: '15px'
            });
            $(this).data('open', true)
        }else{
            $('.js-user-data-content').css({
                height : 0,
                marginBottom: 0
            });
            $(this).data('open', false)
        }
    });

    $(document).on('click', '.js-user-order-link', function(){
        if(!$(this).data('open')){
            $('.js-user-order-content').css({
                height : $('.js-user-order-content>div').height(),
                marginBottom: '15px'
            });
            $(this).data('open', true)
        }else{
            $('.js-user-order-content').css({
                height : 0,
                marginBottom: 0
            });
            $(this).data('open', false)
        }
    });

    $(".js-user-data-form :input").change(function() {
        $(this).closest('.js-user-data-form').data('changed', true);
    });

    function updateData(){
        var form = $('.js-user-data-form');
        if(form.length && form.data('changed')){
            var serializedForm = form.serialize();
            if(serializedForm != form.data('serialize-data')){
                $.ajax({
                    url: "./API/update_data.php",
                    method: "POST",
                    data: form.serializeArray(),
                    dataType: "json"
                }).done(function( data ) {
                    if(data.success){
                        form.data('serialize-data', serializedForm)
                        form.data('changed', false)
                    }
                });
            }
        }
    }
    setInterval(updateData, 2000)
});


var GeneralShopItems = [];

function calculateGeneralShop(){
    var shop_list = $('.js-market-item-svr');
    GeneralShopItems = [];
    for(var i = 0; i <shop_list.length; i++){
        var it = $(shop_list[i])
        GeneralShopItems.push(
            [
                it.data('size-id'),
                it.data('size'),
                it.data('color-id'),
                it.data('color-name'),
                it.data('color-code'),
                it.data('count'),
                it.data('type')
            ]
        )
    }
}

$(document).ready(function(){
    calculateGeneralShop();

    $(document).on('click','.js-count-operation', function(){
        $('.js-count-operation').attr('disabled', 'disabled');
        setTimeout(function(){
            calculateGeneralShop();
            $.ajax({
                url: "./API/_addItem.php",
                method: "POST",
                data: { shopitems: GeneralShopItems }
            }).done(function( data ) {
                data = jQuery.parseJSON(data);

                if(data.if_promotion){
                    $('.js-general-price').html('<span class="valut-promotion">'+data.if_promotion+' PLN</span>'+data.price)
                }else{
                    $('.js-general-price').html(data.price)
                }

                $('.js-count-operation').removeAttr( "disabled" );
                $('body').data('price', data.price);
            });
        },200);
    })

    $(document).on('click', '.js-count-add', function(){
        var market_id = $($(this).closest('.js-market-item-svr'));
        var newValue = parseInt(market_id.data('count')) + 1;
        market_id.data('count', newValue);
        $(market_id.find('.js-market-count')).html(newValue + ' szt.')
    });

    $(document).on('click', '.js-count-minus', function(){
        var market_id = $($(this).closest('.js-market-item-svr'));
        var newValue = parseInt(market_id.data('count')) - 1;

        if(newValue == 0){
            $($(this).closest('.js-market-item-svr')).remove()
        }else{
            market_id.data('count', newValue);
            $(market_id.find('.js-market-count')).html(newValue + ' szt.')
        }
    })
});

$(document).ready(function(){
    $(document).on('click', '.js-order-section', function(){
        if($(this).data('active')){
            $('.js-pay-section').fadeOut(200);
            setTimeout(function(){
                $('.js-order-section').css({
                    width:'33%',
                    height:'120%',
                    padding: '0 15px'
                })
            },300)
            $(this).data('active', false)
        }else{
            $('.js-order-section').attr('change-width', true);
            $(this).removeAttr('change-width').data('active', true);

            $('[change-width]').css({
                width:0,
                height:0,
                padding: 0
            });

            $('.js-pay').css('display', 'none');
            $($(this).data('dest')).css('display', 'block');

            setTimeout(function(){
                $('.js-pay-section').fadeIn(500);
            }, 600)
        }
    });

    $(document).on('click', '.js-chose-order', function(){
        $('.js-pay-section').fadeOut(1);
        $('.js-order-section').css({
            width:'33%',
            height:'120%',
            padding: '0 15px'
        })
    })
});

$(document).ready(function(){
    $('.js-chose-order').click(function(){

        console.log('test')

        $.ajax({
            url: "./API/_isloged.php",
            method: "POST",
            data: { islogged : true }
        }).done(function( data ) {
            if(jQuery.parseJSON(data).logged){
                $('.js-order-proces').fadeOut(100);
                $.ajax({
                    url: "./API/orderForm.php",
                    method: "POST"
                }).done(function( data ) {
                    $('.js-order-proces')
                        .html(data)
                        .fadeIn(400);
                });
            }
        });
    });
});

$(document).ready(function(){
    $(document).on('click', '.js-overlay-terms', function() {
        $('.js-overial-box-terms').fadeIn(600)
    });

    $('.js-overial-box-terms').click(function(e){
        if(e.target != this) return;
        $(this).fadeOut(600);
    });

    $(document).on('submit', '.js-pay-now', function() {
        $.ajax({
            url: "./API/_buyNow.php",
            method: "POST",
            data: $( this ).serializeArray()
        }).done(function( data ) {
            data = jQuery.parseJSON(data);
            if(data.success){
                $('.js-overial-text').fadeIn(100);
                if(data.pay_succes){
                   // window.location = 'http://choice.local/pay.php';
                    window.location = 'http://www.choiceunderwear.pl/pay.php';
                }
            }
        });
        event.preventDefault();
    });

    $(document).on('submit', '.js-withoutlogin-form', function() {
        $.ajax({
            url: "./API/_buyNowWidthoutRegister.php",
            method: "POST",
            data: $( this ).serializeArray()
        }).done(function( data ) {
            data = jQuery.parseJSON(data);
            if(data.success){
                $('.js-overial-text').fadeIn(100);
                if(data.pay_succes){
                    // window.location = 'http://choice.local/pay.php';
                    window.location = 'http://www.choiceunderwear.pl/pay.php';
                }
            }
        });
        event.preventDefault();
    });

    $('.js-first-overlay').click(function(){
        var overlay =$(this);
        overlay.fadeOut(500);
        overlay.removeClass('overlay js-overial-box');
        setTimeout(function(){
            overlay.remove()
        },500)
    });


    $(document).on('change','.js-transport-price', function(){
        $(' .js-actual-price').html(parseInt($('body').data('price'))+ parseInt($(this).val()));
    });

    $(document).on('click','.js-overial-text', function(){
        window.location.reload();
    });


    function checkHeight(){

        if($(window).width()<1024){
            if($(window).width()/$(window).height()>1.3){
                $('.home__section').css('height', 768)
            }else{
                $('.home__section').css('height', $(window).height())
            }
        }
    }

    checkHeight();

    $( window ).resize(function() {
        checkHeight()
    });
});