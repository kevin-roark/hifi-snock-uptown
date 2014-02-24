$(function() {
  var rainbowColors = [
        '#FF0000',
        '#f26522',
        '#fff200',
    ];
    var rainbowOptions = {
        colors: rainbowColors,
        animate: true,
        animateInterval: 250,
        pad: false,
        pauseLength: 250
    };

    var header = $('.hot-posts-header');
    header.rainbow(rainbowOptions);
});