/**
 *  Zebra_Pin
 *
 *  Zebra_Pin is a lightweight (2KB minified, ~800 bytes gzipped) and adaptive (things work as expected when the browser
 *  window is resized) jQuery plugin for pinning elements to the page or to a container element, so that pinned elements
 *  stay visible even if the user scrolls the page. This type of elements are also referred to as "fixed position elements"
 *  or "sticky elements".
 *
 *  Use it to create sticky sidebars, sticky navigation, sticky headers and footers, or anything else you feel the need
 *  to make it stick to the page while the user scrolls.
 *
 *  You can have "hard" pinned elements - elements are pinned to their initial position and stay there, elements that
 *  become pinned only when the user scrolls to them, pinned elements that move only inside their parent element.
 *
 *  When elements become pinned a CSS class will be added to them, as specified by the plugin's "class_name" property.
 *
 *  Also, custom events are fired when elements are pinned/unpinned giving you even more power for customizing the result.
 *
 *  Note that this plugin will alter the target element(s) "position" property to "absolute" and/or "fixed", depending
 *  on the situation, so, before enabling the plugin, make sure that this will not affect your page's layout.
 *
 *  Works in all major browsers (Firefox, Opera, Safari, Chrome, Internet Explorer 7+)
 *
 *  Read more {@link https://github.com/stefangabos/Zebra_Tooltips/ here}
 *
 *  @author     Stefan Gabos <contact@stefangabos.ro>
 *  @version    1.1.2 (last revision: May 30, 2017)
 *  @copyright  (c) 2013 - 2017 Stefan Gabos
 *  @license    http://www.gnu.org/licenses/lgpl-3.0.txt GNU LESSER GENERAL PUBLIC LICENSE
 *  @package    Zebra_Pin
 */
(function($) {

    'use strict';

    $.Zebra_Pin = function(elements, options) {

        // so you can tell the version number even if all you have is the minified source
        this.version = '2.0.0';

        var defaults = {

                //  class to add to the element when it is becomes pinned
                class_name: 'Zebra_Pin',

                //  specifies whether the pinned element should be restricted to its parent element's boundaries or not.
                //
                //  default is FALSE
                contain: false,

                //  specifies whether the element should be "hard" pinned (pinned to its position from the beginning), or
                //  become pinned only when it is about to go out of view.
                //
                //  default is FALSE
                hard: false,

                //  distance, in pixels, from the browser window's top (or the container element's top, when element is
                //  contained to its parent element's boundaries) from which the element should become pinned.
                //  this only works if the "hard" property is set to FALSE.
                //
                //  default is 0
                top_spacing: 0,

                //  distance, in pixels, from the containing parent element's bottom which the pinned element must not
                //  exceed.
                //  this only works if the "hard" property is set to FALSE and the "contain" property is set to TRUE
                //
                //  default is 0
                bottom_spacing: 0,

                //  the value of zIndex CSS property to be set for pinned elements
                //  default is 1000
                z_index: 1000,

                //  callback function to be executed when an element becomes pinned
                //  the callback function receives 3 arguments:
                //  -   the vertical position, relative to the document, where the event occurred
                //  -   a reference to the pinned element
                //  -   the index of the element - if the plugin was attached to multiple elements (0 based)
                onPin: null,

                //  callback function to be executed when an element becomes unpinned (reverts to its original state)
                //  the callback function receives 3 arguments:
                //  -   the vertical position, relative to the document, where the event occurred
                //  -   a reference to the unpinned element
                //  -   the index of the element - if the plugin was attached to multiple elements (0 based)
                onUnpin: null

            },

            // to avoid confusions, we use "plugin" to reference the current instance of the object
            plugin = this,

            // generate a unique id to use for easily binding/unbinding events and not interfere with other instances of the plugin
            uniqueid = (Math.random() + 1).toString(36).substring(2, 7),

            $window = $(window);

        plugin.settings = {};

        /**
         *  Constructor method. Initializes the plugin.
         *
         *  @return void
         */
        var _init = function() {
            // reference to the window element
            $window = $(window),

            // the plugin's final properties are the merged default and
            // user-provided options (if any)
            plugin.settings = $.extend({}, defaults, options);

            // update elements' position
            plugin.update();

            // on window resize
            $window.on('resize', function() {

                // update elements' position
                plugin.update();

            });

        };

        /**
         *  Updates the pinned elements' positions in accordance with the scrolled amount and with the pinned elements'
         *  container elements (if any).
         *
         *  Useful if a pinned element's parent changes height.
         *
         *  <code>
         *  // initialize the plugin
         *  var zp = new Zebra_Pin($('#my_pinned_element'), {
         *      // element can move only inside
         *      // the parent element
         *      'contain':  true
         *  });
         *
         *  // if the parent element's height changes
         *  // update also the boundaries
         *  zp.update();
         *  </code>
         *
         *  @return void
         */
        plugin.update = function() {

            // iterate through elements that need to be pinned
            elements.each(function(index) {

                // if we haven't yet saved the element's original "position" value
                if (undefined === $(this).data('Zebra_Pin_Position'))

                    // store it now
                    $(this).data('Zebra_Pin_Position', $(this).css('position'));

                // if we have already saved the element's original "position" value
                else

                    // set the element's "position" property to its original state (in case it was modified)
                    // so we get the correct values in the next section
                    $(this).css('position', $(this).data('Zebra_Pin_Position'));

                var

                    // reference to the current element
                    $element = $(this),

                    // get the element's position relative to the document
                    offset = $element.offset(),

                    // get the element's position relative to the parent element
                    position = $element.position(),

                    // get the element's height, including padding and border
                    height = $element.outerHeight(),

                    // get margins, if any; we need this because position() takes margins into account while offset()
                    // doesn't and so we need to compensate
                    // see http://bugs.jquery.com/ticket/11606
                    margin_left = (parseInt($element.css('marginLeft'), 10) || 0),
                    margin_top = (parseInt($element.css('marginTop'), 10) || 0),

                    // we'll use these later on, if the pinned element needs to be contained in the parent element
                    $container, container_height, container_offset,

                    proxy;

                // adjust offset with margins
                offset.left -= margin_left;
                offset.top -= margin_top;

                // if element needs to be contained inside the parent element's boundaries
                if (plugin.settings.contain) {

                    // reference to the parent element
                    $container = $element.parent();

                    // get parent element's height
                    container_height = $container.height();

                    // get parent element's position relative to the document
                    container_offset = $container.offset();

                }

                // if element is "hard" pinned (the element is pinned to its position from the beginning)
                if (plugin.settings.hard)

                    // set element's CSS properties
                    $element.css({

                        position:   'fixed',
                        left:       offset.left,
                        top:        offset.top,
                        zIndex:     plugin.settings.z_index

                    // add a class indicating that the element is pinned
                    }).addClass(plugin.settings.class_name);

                // if element is not "hard" pinned
                else {

                    // set element's default properties
                    $element.css({

                        zIndex: plugin.settings.z_index

                    // remove the class indicating that the element is pinned
                    }).removeClass(plugin.settings.class_name);

                    // we generate a unique namespace for each element of each instance of the plugin
                    // we do this so that we can easily unbind them without affecting other elements
                    // and instances of the plugin
                    proxy = '.Zebra_Pin_' + uniqueid + '_' + index;

                    // unbind a previously set callback function (if any)
                    $window.off('scroll' + proxy)

                    // when the page is scrolled
                    .on('scroll' + proxy, function() {

                        // get scrolled amount
                        var scroll = $window.scrollTop();

                        // if
                        if (

                            // the user scrolled past the element's top (minus "top_spacing")
                            scroll >= offset.top - plugin.settings.top_spacing &&

                            // the element has no parent, or the element needs to be contained inside its parent's boundaries
                            // and the element is currently inside its parent's boundaries
                            (!plugin.settings.contain || (scroll <= container_offset.top + container_height - plugin.settings.top_spacing - height - plugin.settings.bottom_spacing)) &&

                            // element's position is not already set to "fixed"
                            $element.css('position') !== 'fixed'

                        ) {

                            // set element's CSS properties
                            $element.css({

                                position:   'fixed',
                                left:       offset.left,
                                top:        plugin.settings.top_spacing

                            // add a class indicating that the element is pinned
                            }).addClass(plugin.settings.class_name);

                            // if a callback function exists for when pinning an element
                            if (plugin.settings.onPin && typeof plugin.settings.onPin === 'function')

                                // execute the callback function and pass as arguments the scrolled amount, the element
                                // the plugin is attached to, and the index of the element from the list of elements the
                                // plugin is attached to
                                plugin.settings.onPin(offset.top - plugin.settings.top_spacing, $element, index);

                        // else if
                        } else if (

                            // the user scrolled up past the element's top (minus "top_spacing")
                            scroll < offset.top - plugin.settings.top_spacing &&

                            // element's position is not already set to "absolute"
                            $element.css('position') !== 'absolute'

                        ) {

                            // set element's CSS properties
                            $element.css({

                                position:   'absolute',
                                left:       position.left,
                                top:        position.top

                            // remove the class indicating that the element is pinned
                            }).removeClass(plugin.settings.class_name);

                            // if a callback function exists for when unpinning an element
                            if (plugin.settings.onUnpin && typeof plugin.settings.onUnpin === 'function')

                                // execute the callback function and pass as arguments the scrolled amount, the element
                                // the plugin is attached to, and the index of the element from the list of elements the
                                // plugin is attached to
                                plugin.settings.onUnpin(offset.top - plugin.settings.top_spacing, $element, index);

                        // else if
                        } else if (

                            // the element needs to be contained inside the parent element's boundaries
                            plugin.settings.contain &&

                            // the user scrolled past the container element's bottom
                            scroll >= container_offset.top + container_height - plugin.settings.top_spacing - height - plugin.settings.bottom_spacing &&

                            // element's position is not already set to "absolute"
                            $element.css('position') !== 'absolute'

                        ) {

                            // set element's CSS properties
                            $element.css({

                                position:   'absolute',
                                left:       position.left,
                                top:        container_height - height - plugin.settings.bottom_spacing - plugin.settings.bottom_spacing

                            // remove the class indicating that the element is pinned
                            }).removeClass(plugin.settings.class_name);

                            // if a callback function exists for when unpinning an element
                            if (plugin.settings.onUnpin && typeof plugin.settings.onUnpin === 'function')

                                // execute the callback function and pass as arguments the scrolled amount, the element
                                // the plugin is attached to, and the index of the element from the list of elements the
                                // plugin is attached to
                                plugin.settings.onUnpin(container_offset.top + container_height - height - plugin.settings.bottom_spacing, $element, index);

                        }

                    });

                    // trigger the scroll event so that the computations take effect
                    $window.trigger('scroll' + proxy);

                }

            });

        };

        // off we go!
        _init();

    };

})(jQuery);
