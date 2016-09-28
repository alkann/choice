var fotoramaGeneral = null;

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

    if($('.fotorama').length){
        $('.fotorama')
    }

    if($('.slider').length){
        fotoramaGeneral =  $('.slider').fotorama({
            data: [
                {img: 'foto/aqua_przod.jpg', thumb: 'foto/aqua_przod.jpg'},
                {img: 'foto/aqua_bok.jpg', thumb: 'foto/aqua_bok.jpg'},
                {img: 'foto/aqua_tyl.jpg', thumb: 'foto/aqua_tyl.jpg'}
            ],
            width: '100%',
            ratio: 1024/768,
            nav: 'thumbs',
            allowfullscreen: true
        });

        $('.slider').on('fotorama:load', function (e, fotorama, extra) {
            $('.js-slider').css('opacity', 1);
            $('.js-slider-spinner-block').fadeOut(500)
        });
    }

    if($('.js-colors-inner')) {
        var list = $('.js-colors-inner');
        for (var i = 0; i < list.length; i++) {
            var item = $(list[i]);
            item.css({
                background: item.data('color')
            })
        }

        var sliderData = {
            aqua :[
                {img: 'foto/aqua_przod.jpg', thumb: 'foto/aqua_przod.jpg'},
                {img: 'foto/aqua_bok.jpg', thumb: 'foto/aqua_bok.jpg'},
                {img: 'foto/aqua_tyl.jpg', thumb: 'foto/aqua_tyl.jpg'}
            ],
            chili :[
                {img: 'foto/chili_przod.jpg', thumb: 'foto/chili_przod.jpg'},
                {img: 'foto/chili_bok.jpg', thumb: 'foto/chili_bok.jpg'},
                {img: 'foto/chili_tyl.jpg', thumb: 'foto/chili_tyl.jpg'}
            ],
            coffee :[
                {img: 'foto/coffe_przod.jpg', thumb: 'foto/coffe_przod.jpg'},
                {img: 'foto/coffe_bok.jpg', thumb: 'foto/coffe_bok.jpg'},
                {img: 'foto/coffe_tyl.jpg', thumb: 'foto/coffe_tyl.jpg'}
            ],
            green :[
                {img: 'foto/green_przod.jpg', thumb: 'foto/green_przod.jpg'},
                {img: 'foto/green_bok.jpg', thumb: 'foto/green_bok.jpg'},
                {img: 'foto/green_tyl.jpg', thumb: 'foto/green_tyl.jpg'}
            ],
            ink :[
                {img: 'foto/ink_przod.jpg', thumb: 'foto/ink_przod.jpg'},
                {img: 'foto/ink_bok.jpg', thumb: 'foto/ink_bok.jpg'},
                {img: 'foto/ink_tyl.jpg', thumb: 'foto/ink_tyl.jpg'}
            ],
            kiwi :[
                {img: 'foto/kiwi_przod.jpg', thumb: 'foto/kiwi_przod.jpg'},
                {img: 'foto/kiwi_bok.jpg', thumb: 'foto/kiwi_bok.jpg'},
                {img: 'foto/kiwi_tyl.jpg', thumb: 'foto/kiwi_tyl.jpg'}
            ],
            orange :[
                {img: 'foto/orange_przod.jpg', thumb: 'foto/orange_przod.jpg'},
                {img: 'foto/orange_bok.jpg', thumb: 'foto/orange_bok.jpg'},
                {img: 'foto/orange_tyl.jpg', thumb: 'foto/orange_tyl.jpg'}
            ],
            semisweet :[
                {img: 'foto/semisweet_przod.jpg', thumb: 'foto/semisweet_przod.jpg'},
                {img: 'foto/semisweet_bok.jpg', thumb: 'foto/semisweet_bok.jpg'},
                {img: 'foto/semisweet_tyl.jpg', thumb: 'foto/semisweet_tyl.jpg'}
            ]
        };

        $('.js-store-colors').on('click', '.js-colors-inner', function(){
            $('.js-slider').css('opacity', 0);
            $('.js-add-product').css('opacity', 0);
            $('.js-slider-spinner-block').fadeIn(500);
            var item = $(this);

            $('.js-store-title-color').css({
                opacity:0
            });

            setTimeout(function(){
                $('.js-store-title-color')
                    .css({
                        opacity:1,
                        color:item.data('color')
                    }).html(item.data('title'));
                $('.js-add-product')
                    .css({
                        opacity:1,
                        background:item.data('color'),
                        borderColor:item.data('color')
                    });
            },550);

            var fotorama = fotoramaGeneral.data('fotorama');
            fotorama.load(sliderData[item.data('title')]);

            $('.js-add-product')
                .data('color', item.data('title'))
                .data('color-id', item.data('color-id'))
                .data('color-name', item.data('color'))
        })

    }
});

$(document).ready(function() {
    $('select').niceSelect();

    $('.js-select-size').on('change',function(){
        $('.js-add-product')
            .data('size-id', $('.js-select-size option:checked').val())
            .data('size', $('.js-select-size option:checked').html())
    })


    $('.js-add-product').click(function(){
        var self = $(this),
            existed = $('[data-code='+self.data("size-id")+''+self.data("color-id")+']');

        if(existed.length){
            var newValue = parseInt(existed.data('count'))+1;

            existed.data('count',newValue);
            $(existed.find('.js-market-count')).html(newValue + ' szt.')
        }else{
            if(self.data('size') && self.data('color')){
                var item = $(
                    '<div class="market__item transition-all-500 js-market-item-svr" ' +
                    'data-count="1" ' +
                    'data-color-id='+self.data("color-id")+' ' +
                    'data-color-name='+self.data("color")+' ' +
                    'data-color-code='+self.data("color-name")+' ' +
                    'data-size='+self.data("size")+' ' +
                    'data-size-id='+self.data("size-id")+' ' +
                    'data-type="slipy_m"' +
                    'data-code="'+self.data("size-id")+''+self.data("color-id")+'">'+
                    '<div class="market__item__name">Slipy Męskie <span class="market__item__size">'+self.data("size")+'</span> kolor <span class="market__item__color" style="color:'+self.data("color-name")+'">'+self.data("color")+'</span></div>'+
                    '<div class="market__item__count">'+
                    '<div class="js-market-count">1 szt.</div>'+
                    '<div class="pull-right">'+
                    '<button class="js-count-operation js-count-add"><i class="icon-add"></i></button>'+
                    '<button class="js-count-operation js-count-minus"><i class="icon-minus"></i></button>'+
                    '</div>'+
                    '</div>'+
                    '</div>'
                );

                $('.js-market-content')
                    .append(item);

                $('.js-choice-app').css({
                    marginLeft: '-350px'
                });
                $('.choice__user__logout').fadeIn(300);
                $('.js-sidebar').data('open', false);
                $('#asside_market').fadeIn(500);


                setTimeout(function(){
                    item.css({
                        opacity:1
                    })
                }, 200)
            }
        }
    })
});