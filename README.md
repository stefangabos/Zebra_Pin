##Zebra_Pin

####A lightweight jQuery plugin for pinning any element to the page or to a container element

Zebra_Pin is a lightweight (around 2KB minified) and adaptive (things work as expected when you manually resize the browser window) jQuery plugin for pinning elements to the page or to a container element, so that the element stays visible even if the user scrolls the page. This type of elements are also referred to as "fixed position elements" or "sticky elements".

You can use it in your projects to create sticky sidebars, sticky navigation, sticky headers and footers, or anything else you feel the need to make it stick to the page while the user scrolls.

You can have "hard" pinned elements (elements are pinned to their initial position and stay there), elements that become pinned only when the user scrolls to them, pinned elements that move only inside their parent element.

When elements become pinned a CSS class will be added to them, as specified by the plugin's "class_name" property.

Also, custom events are fired when elements are pinned/unpinned giving you even more power for customizing the result.

Note that this plugin will alter the target element(s) "position" property to "absolute" and/or "fixed", depending on the situation, so before calling the plugin make sure that this change will not affect your page's layout.

Works in all major browsers (Firefox, Opera, Safari, Chrome, Internet Explorer 7+)

##Features

 - elements can be pinned inside a container element, not just to the page
 - custom events are fired when pinning/unpinning elements offering even more control
 - it is small – it weights around 2KB minified offering the best ratio of features per used bytes
 - it’s cross-browser – works in every major browser and IE7+

## Requirements

Zebra_Pin has no dependencies other than jQuery 1.4.2+

## How to use
First, load the latest version of jQuery from a CDN and provide a fallback to a local source, like:

```html
<script src="//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
<script>window.jQuery || document.write('<script src="public/javascript/jquery.min.js"><\/script>')</script>
```

Load the Zebra_Pin jQuery plugin:

```html
<script src="path/to/zebra_pin.js"></script>
```

Now, within the DOM-ready event, pin elements to page or to a container:

```javascript
$(document).ready(function() {

    // easiest way to get started: when the user scrolls to the element
    // the element will become pinned (sticky) and will scroll with the page

    new Zebra_Pin($('#myelement'));

    // in the example above, the element will be at the very top edge of the
    // screen. if you want to add some top margin simply set the "top_spacing"
    // property

    new Zebra_Pin($('#myelement'), {
        top_spacing: 10
    });

    // if you want the element to be restrained to the height of the container
    // element, simply set the value of the "container" property to TRUE
    // (make sure the container element has its "position" set to "relative" or
    // "absolute")

    new Zebra_Pin($('#myelement'), {
        contained: true
    });

    // or, you may want to pin an element *exactly* to the position where it's at
    // and make it stay there no matter what (we'll call this a "hard" pin)

    new Zebra_Pin($('#myelement'), {
        hard: true
    });

});
```

Configuration options and demos on the **[project's homepage](http://stefangabos.ro/jquery/zebra-pin/)**
