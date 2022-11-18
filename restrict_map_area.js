ymaps.ready(function () {
    var myMap = new ymaps.Map('map', {
        center: [41.311151, 69.279737],
        zoom: 7,
        controls: ['smallMapDefaultSet']
    }, 
    {
    //     // Зададим ограниченную область прямоугольником, 
    //     // примерно описывающим Санкт-Петербург.
        restrictMapArea: [
            [46.562392, 58.736799],
            [39.721592, 73.229281]
        ]
    }
    );
});