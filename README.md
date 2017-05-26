<img src="https://raw.githubusercontent.com/stefangabos/zebrajs/master/docs/images/logo.png" alt="zebrajs" align="right">

# Zebra_Pin

*A lightweight jQuery plugin for pinning any element to the page or to a container element*

[![npm](https://img.shields.io/npm/v/zebra_pin.svg)](https://www.npmjs.com/package/zebra_pin) [![Total](https://img.shields.io/npm/dt/zebra_pin.svg)](https://www.npmjs.com/package/zebra_pin) [![Monthly](https://img.shields.io/npm/dm/zebra_pin.svg)](https://www.npmjs.com/package/zebra_pin) [![License](https://img.shields.io/npm/l/zebra_pin.svg)](https://www.npmjs.com/package/zebra_pin)

Zebra_Pin is a lightweight (2KB minified, ~1KB gzipped) and adaptive (things work as expected when the browser window is resized) jQuery plugin for pinning elements to the page or to a container element, so that the element stays visible even if the user scrolls the page. This type of elements are also referred to as *fixed position elements* or *sticky elements*.

You can use it to create sticky sidebars, sticky navigation, sticky headers and footers, or anything else you feel the need to make it stick to the page while the user scrolls.

You can have *hard* pinned elements - elements are pinned to their initial position and stay there, elements that become pinned only when the user scrolls to them and pinned elements whose movement is restricted to their container element's size.

When elements become pinned a CSS class will be added to them, as specified by the plugin's *class_name* property.

Also, custom events are fired when elements are pinned/unpinned giving you even more power for customizing the result.

Note that this plugin will alter the target element(s) "position" property to *absolute* and/or *fixed*, depending on the situation, so, before enabling the plugin, make sure that this will not affect your page's layout.

Works in all major browsers (Firefox, Opera, Safari, Chrome, Internet Explorer 7+)

## Features

 - elements can be pinned inside a container element, not just to the page
 - custom events are fired when pinning/unpinning elements for more control
 - it is really small – it weights 2KB minified (~1.2KB gzipped) offering a very good ratio of features per used bytes
 - it's cross-browser – works in every major browser and IE7+

## Requirements

Zebra_Pin has no dependencies other than jQuery 1.4.2+

## Installation

Zebra_Pin is available as a [npm package](https://www.npmjs.com/). To install it use:

```
npm install zebra_pin
```

Zebra_Pin is also available as a [Bower package](http://bower.io/). To install it use:

```
bower install zebra_pin
```

## How to use

First, load the latest version of jQuery from a CDN and provide a fallback to a local source, like:

```html
<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
<script>window.jQuery || document.write('<script src="path/to/jquery-3.2.1.js"><\/script>')</script>
```

Load the Zebra_Pin jQuery plugin:

```html
<script src="path/to/zebra_pin.min.js"></script>
```

Now, within the DOM-ready event, pin elements to page or to a container:

```javascript
$(document).ready(function() {

    // easiest way to get started: when the user scrolls to the element
    // the element will become pinned (sticky) and will scroll with the page
    new $.Zebra_Pin($('#element'));

    // in the example above, the element will be at the very top edge of the
    // screen. if you want to add some top margin simply set the "top_spacing"
    // property
    new $.Zebra_Pin($('#element'), {
        top_spacing: 10
    });

    // if you want the element to be restrained to the height of the container
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
        <td valign="top">Zebra_Pin</td>
        <td valign="top">Class to add to the element when it is "sticky"</td>
    </tr>
    <tr>
        <td valign="top"><code>contain</code></td>
        <td valign="top"><em>boolean</em></td>
        <td valign="top">FALSE</td>
        <td valign="top">
            Specifies whether the pinned element should be restrained to its parent element's boundaries or not.<br><br>
            <blockquote>The container element <strong>must</strong> have the <code>position</code> CSS property set to
            something other than <strong>static</strong></blockquote>
        </td>
    </tr>
    <tr>
        <td valign="top"><code>hard</code></td>
        <td valign="top"><em>boolean</em></td>
        <td valign="top">FALSE</td>
        <td valign="top">
            Specifies whether the element should be "hard" pinned (the element is pinned to its position from the
            beginning), or become pinned only when it is about to be hidden.
        </td>
    </tr>
    <tr>
        <td valign="top"><code>top_spacing</code></td>
        <td valign="top"><em>integer</em></td>
        <td valign="top">0</td>
        <td valign="top">
            Margin, in pixels, from the container element's (or the browser window's) top.<br>
            This only works if the "hard" property is set to FALSE.
        </td>
    </tr>
    <tr>
        <td valign="top"><code>bottom_spacing</code></td>
        <td valign="top"><em>integer</em></td>
        <td valign="top">0</td>
        <td valign="top">
            Margin, in pixels, from the container element's bottom<br>
            This only works if the "hard" property is set to FALSE and it is used only if the "contain" property is TRUE
        </td>
    </tr>
    <tr>
        <td valign="top"><code>z_index</code></td>
        <td valign="top"><em>integer</em></td>
        <td valign="top">9999</td>
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
            Callback function to be executed when an element is pinned<br>
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
            Callback function to be executed when an element is unpinned<br>
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

## Demo

See the [demos](http://stefangabos.github.io/Zebra_Pin/)