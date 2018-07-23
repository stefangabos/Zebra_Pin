<img src="https://raw.githubusercontent.com/stefangabos/zebrajs/master/docs/images/logo.png" alt="zebrajs" align="right">

# Zebra Pin &nbsp;[![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=Zebra%20Pin%20-%20a%20lightweight%20and%20adaptive%20jQuery%20plugin%20for%20pinning%20elements%20to%20the%20page%20or%20to%20container%20elementsurl=https://github.com/stefangabos/Zebra_Pin&via=stefangabos&hashtags=jquery,pin,sticky,pinned)

*A lightweight jQuery plugin for creating sticky elements pinned to the page or to a container element*

[![npm](https://img.shields.io/npm/v/zebra_pin.svg)](https://www.npmjs.com/package/zebra_pin) [![Total](https://img.shields.io/npm/dt/zebra_pin.svg)](https://www.npmjs.com/package/zebra_pin) [![Monthly](https://img.shields.io/npm/dm/zebra_pin.svg)](https://www.npmjs.com/package/zebra_pin) [![](https://data.jsdelivr.com/v1/package/npm/zebra_pin/badge?style=rounded)](https://www.jsdelivr.com/package/npm/zebra_pin) [![License](https://img.shields.io/npm/l/zebra_pin.svg)](https://github.com/stefangabos/Zebra_Pin/blob/master/LICENSE.md)

Zebra_Pin is a lightweight (2.5KB minified, ~800 bytes gzipped) and adaptive (things work as expected when the browser window is resized) jQuery plugin for pinning elements to the page or to a container element, so that pinned elements remain visible when they are about to be scrolled out of view. This type of elements are also referred to as *fixed position elements* or *sticky elements*.

Use it to create sticky sidebars, sticky navigation, sticky headers and footers, or anything else you feel the need to make it stick to the page while the user scrolls.

You can have "hard" pinned elements - elements are pinned to their initial position and stay there, elements that become pinned when they are about to be scrolled out of view, as well as pinned elements that can move only inside their parent element's boundaries.

Pinned elements are added a user-defined CSS class so you can adjust their looks when pinned. Additionally, custom events are fired when elements become pinned/unpinned giving you even more power for customizing the result.

Works in pretty much any browser - Firefox, Chrome, Safari, Edge, Opera and Internet Explorer 7+

## Features

 - elements can be pinned inside a container element, not just to the page
 - pinned elements are added a user-defined CSS class so you can adjust their looks when pinned
 - custom events are fired when elements become pinned/unpinned giving you even more power for customizing the result
 - it is really small – it weights 2.5KB minified (~800 bytes gzipped) offering a very good ratio of features per used bytes
 - it's cross-browser – works in every major browser and IE7+

## Demo

See the [demos](https://stefangabos.github.io/Zebra_Pin/)

## Requirements

Zebra Pin has no dependencies other than jQuery 1.7+

## Installation

Zebra Pin is available as a [npm package](https://www.npmjs.com/package/zebra_pin). To install it use:

```bash
# the "--save" argument adds the plugin as a dependency in packages.json
npm install zebra_pin --save
```

Zebra Pin is also available as a [Bower package](https://bower.io/). To install it use:

```bash
# the "--save" argument adds the plugin as a dependency in bower.json
bower install zebra_pin --save
```

## How to use

First, load the latest version of jQuery from a CDN and provide a fallback to a local source, like:

```html
<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
<script>window.jQuery || document.write('<script src="path/to/jquery-3.3.1.js"><\/script>')</script>
```

Load the Zebra Pin jQuery plugin:

```html
<script src="path/to/zebra_pin.min.js"></script>
```

Alternatively, you can load Zebra Pin from [JSDelivr CDN](https://www.jsdelivr.com/package/npm/zebra_pin) like this:

```html
<!-- for the most recent version, not recommended in production -->
<script
    src="https://cdn.jsdelivr.net/npm/zebra_pin@latest/dist/zebra_pin.min.js"></script>

<!-- for a specific version -->
<script
    src="https://cdn.jsdelivr.net/npm/zebra_pin@2.0.0/dist/zebra_pin.min.js"></script>

<!-- replacing "min" with "src" will serve you the non-compressed version -->
```

Now, within the DOM-ready event, pin elements to page or to a container:

```javascript
$(document).ready(function() {

    // easiest way to get started: when the user scrolls to the element
    // the element will become pinned (sticky)
    new $.Zebra_Pin($('#element'));

    // in the example above, the element will be at the very top edge of the
    // screen. if you want to add some top margin simply set the "top_spacing"
    // property
    new $.Zebra_Pin($('#element'), {
        top_spacing: 10
    });

    // if you want the element to be restricted to the height of the container
    // element, simply set the value of the "container" property to TRUE
    // (make sure the container element has its "position" set to "relative" or
    // "absolute")
    new $.Zebra_Pin($('#element'), {
        contained: true
    });

    // or, you may want to pin an element *exactly* to the position where it's at
    // and make it stay there no matter what (we'll call this a "hard" pin)
    new $.Zebra_Pin($('#element'), {
        hard: true
    });

});
```

## Configuration options

## Properties

<table width="100%">
    <thead>
    <tr>
        <th>Property</th>
        <th>Type</th>
        <th>Default</th>
        <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td valign="top"><code>class_name</code></td>
        <td valign="top"><em>string</em></td>
        <td valign="top">"Zebra_Pin"</td>
        <td valign="top">CSS class to be added to the element when it becomes pinned</td>
    </tr>
    <tr>
        <td valign="top"><code>contain</code></td>
        <td valign="top"><em>boolean</em></td>
        <td valign="top">false</td>
        <td valign="top">
            Specifies whether the pinned element should be restricted to its parent element's boundaries or not.<br><br>
            <blockquote>The container element <strong>must</strong> have its <code>position</code> set to something other than the default <code>static</code></blockquote>
        </td>
    </tr>
    <tr>
        <td valign="top"><code>hard</code></td>
        <td valign="top"><em>boolean</em></td>
        <td valign="top">false</td>
        <td valign="top">
            Specifies whether the element should be "hard" pinned (the element is pinned to its position from the
            beginning), or become pinned only when it is about to go out of view.
        </td>
    </tr>
    <tr>
        <td valign="top"><code>top_spacing</code></td>
        <td valign="top"><em>integer</em></td>
        <td valign="top">0</td>
        <td valign="top">
            Distance, in pixels, from the browser window's top (or the container element's top, when the element is contained to its parent element's boundaries) from which the element should become pinned.<br>
            This only works if the <code>hard</code> property is set to <code>false</code>.
        </td>
    </tr>
    <tr>
        <td valign="top"><code>bottom_spacing</code></td>
        <td valign="top"><em>integer</em></td>
        <td valign="top">0</td>
        <td valign="top">
            Distance, in pixels, from the containing parent element's bottom which the pinned element must not exceed.<br>
            This only works if the <code>hard</code> property is set to <code>false</code> and the <cpde>contain</code> property is set to <code>true</code>
        </td>
    </tr>
    <tr>
        <td valign="top"><code>z_index</code></td>
        <td valign="top"><em>integer</em></td>
        <td valign="top">1000</td>
        <td valign="top">
            The value of zIndex CSS property to be set for pinned elements
        </td>
    </tr>
    </tbody>
</table>

## Events

<table width="100%">
    <thead>
    <tr>
        <th>Event</th>
        <th width="100%">Description</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td valign="top"><code>onPin</code></td>
        <td valign="top">
            Callback function to be executed when an element becomes pinned<br>
            The callback function receives 3 arguments:<br><br>
            <ul>
                <li>the vertical position, relative to the document, where the event occurred</li>
                <li>a reference to the pinned element</li>
                <li>the index of the element - if the plugin was attached to multiple elements (0 based)</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td valign="top"><code>onUnpin</code></td>
        <td valign="top">
            Callback function to be executed when an element becomes unpinned (reverts to its original state)<br>
            The callback function receives 3 arguments:<br><br>
            <ul>
                <li>the vertical position, relative to the document, where the event occurred</li>
                <li>a reference to the unpinned element</li>
                <li>the index of the element - if the plugin was attached to multiple elements (0 based)</li>
            </ul>
        </td>
    </tr>
    </tbody>
</table>

## Methods

### `update()`

Updates the pinned elements' positions in accordance with the scrolled amount and with the pinned elements' container elements (if any).

*Useful if a pinned element's parent changes height.*

```javascript
// initialize the plugin
var zp = new $.Zebra_Pin($('#element'), {

    // element can move only inside
    // the parent element
    contain:  true

});

// if the parent element's height changes
// update also the boundaries
zp.update();
```

## Support the development of this project

[![Donate](https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=K8HEUNMPV65R4)

## Sponsors

Cross browser/device testing is done with

[![BrowserStack](https://github.com/stefangabos/Zebra_Dialog/raw/master/examples/browserstack.png)](https://www.browserstack.com/)
