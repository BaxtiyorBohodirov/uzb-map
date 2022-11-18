ymaps.ready(init);

function init() {
    var map = new ymaps.Map('map', {
        center: [41.503093, 64.373970],
        // center: [50, 15],
        zoom: 7,
        type: 'yandex#hybrid',
        controls: ['zoomControl']
    }, {
        // Ограничим область карты.
        // restrictMapArea: [
        //     [45.862392, 54.736799],
        //     [36.821592, 73.529281]
        // ]
        restrictMapArea: [
            [50.862392, 50.736799],
            [30.821592, 80.529281]
        ]
        // restrictMapArea: [[48, 11], [51.5, 20]]
    });
    map.controls.get('zoomControl').options.set({size: 'small'});

    // Загрузим регионы.
    ymaps.borders.load('001', {
        lang: 'ru',
        quality: 2
    }).then(function (result) {

        // Создадим многоугольник, который будет скрывать весь мир, кроме заданной страны.
        var background = new ymaps.Polygon([
            [
                [85, -179.99],
                [85, 179.99],
                [-85, 179.99],
                [-85, -179.99],
                [85, -179.99]
            ]
        ], {}, {
            fillColor: '#ffffff',
            strokeWidth: 0,
            // Для того чтобы полигон отобразился на весь мир, нам нужно поменять
            // алгоритм пересчета координат геометрии в пиксельные координаты.
            coordRendering: 'straightPath'
        });

        // Найдём страну по её iso коду.
        var region = result.features.filter(function (feature) { return feature.properties.iso3166 == 'UZ'; })[0];

        // Добавим координаты этой страны в полигон, который накрывает весь мир.
        // В полигоне образуется полость, через которую будет видно заданную страну.
        var masks = region.geometry.coordinates;
        masks.forEach(function(mask){
            background.geometry.insert(1, mask);
        });

        // Добавим многоугольник на карту.
        map.geoObjects.add(background);
    })
}
