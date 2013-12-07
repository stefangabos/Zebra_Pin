$(document).ready(function() {

    // Pin #1
    var

        pin = new $.Zebra_Pin($('#pin1'), {
            top_spacing: 10,
            contain: true
        }),
        $container = $('.pin1-container'),
        additional_height = -100;

    $('button').bind('click', function() {
        additional_height = additional_height * -1;
        $container.css('height', '+=' + additional_height);
        pin.update();
    });

    // Pin #2
    new $.Zebra_Pin($('#pin2'), {
        top_spacing: 10
    });

    // Pin #3
    new $.Zebra_Pin($('#pin3'), {
        hard: true
    });

});
