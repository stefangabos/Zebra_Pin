$(document).ready(function() {

    // using a timeout because of the syntax highlighter which alters content
    setTimeout(function() {

        new $.Zebra_Pin($('.sticky-sidebar'), {
            top_spacing: 10
        });

        new $.Zebra_Pin($('.sticky-navigation'), {
            contain: true
        });

        new $.Zebra_Pin($('.sticky-navigation-highlight'), {
            contain: true
        });

        new $.Zebra_Pin($('.sticky-navigation-callbacks'), {
            contain: true,
            onPin: function(scroll, $element) {
                $('li', $element).eq(2).addClass('hidden');
                $('li', $element).eq(3).removeClass('hidden');
            },
            onUnpin: function(scroll, $element) {
                $('li', $element).eq(2).removeClass('hidden');
                $('li', $element).eq(3).addClass('hidden');
            }
        });

        new $.Zebra_Pin($('.sticky-navigation-nocallbacks'), {
            contain: true
        });

    }, 500);

});
