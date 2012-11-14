
jQuery(document).ready(function() {

    (function( $ ){

        $.fn.seemore = function(options) {

            var settings = $.extend( {
                'InitialLines' : 2, // Начальное количество линий
                'ButtonId' : '#see_more', // ID кнопки на которую повешан клик
                'AmountOfAdded' : 6, // количество добавляемых элементов
                'SpeedTransition' : 1, // время анимации в секундах для одного ряда,
                'Prefix' : 'all' // префикс для страницы с полным колечесвтом элементов в спискеЫ
            }, options);

            var CurretLenght = this.find('li').length; //текущее количество элементов в списке
            var LinesOfAdded = settings.AmountOfAdded/3; //количество добавляемых линий, считаем что в линии 3 элемента
            var HeightItem = this.find('li').outerHeight(); // высота одного пункта или одной линии
            var IdList = '#'+this.attr('id'); // ID списка к которому мы обращаемся
            var TimeTransition = settings.SpeedTransition*LinesOfAdded; // время анимации
            var InitialVisibleItems = settings.InitialLines*3; //начальное количество видимых элементов, считаем что в линии 3 элемента

            if ((CurretLenght) > InitialVisibleItems )  { //если текущих элементов меньше чем занадо в области видимости то высоту не устанавливаем
            SetHeight(HeightItem*settings.InitialLines); //устанавливает начальную высоту UL элемента
            }

            $(settings.ButtonId).click(function () {
                AddList(); // добавляем дополнительные элементы по ajax запросу
                IncreaseHeigh (HeightItem*LinesOfAdded);//увеличиваем высоту по клику списка в соответствии с количеством добавляемых элементов
                return false;
            });


            function AddList(){
                $.ajax({
                    url: 'index'+settings.Prefix+'.html',
                    cashe: false,
                    dataType: "html",
                    success: function(data) {
                        var AllLenght = $(data).find(IdList+'_'+settings.Prefix+' li').length;

                        if ((CurretLenght) < AllLenght) {
                            //console.log('AllLenght = '+AllLenght, 'CurretLenght='+CurretLenght);
                            for (i=CurretLenght;i<=CurretLenght+settings.AmountOfAdded-1;i++) {

                                $(data).find(IdList+'_'+settings.Prefix+' li').eq(i).appendTo(IdList);
                               // console.log(i);
                            }
                            CurretLenght=CurretLenght+settings.AmountOfAdded;

                        } else {
                           // console.log('AllLenght = '+AllLenght, 'CurretLenght='+CurretLenght);
                            $(settings.ButtonId).hide();
                        }
                    }

                });
            }

            function IncreaseHeigh(HeightShift){

                if ($('html').hasClass('no-csstransitions')) // изпользуем polyfill из modernizr'a
                {
                    $(IdList).animate({
                        height: '+='+HeightShift
                    }, TimeTransition*1000 );
                }
                else {
                    $(IdList).css("transition", TimeTransition+'s' );
                    $(IdList).css('height', $(IdList).height()+HeightShift);
                }
            }

            function SetHeight(beginheight) {
                $(IdList).css('height', beginheight);
            }

        };
    })( jQuery );


});