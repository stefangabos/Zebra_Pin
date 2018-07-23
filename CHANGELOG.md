## version 2.0.0 (July 23, 2018)

- pinned elements are not taken out of DOM when becoming pinned; instead, an invisible clone element is created so that layout doesn't break.
- fixed bug where elements without explicit width would break when becoming pinned
- fixed bug where elements pinned to a container element would incorrectly fire the callback events
- completely rewritten examples
- added version number as a public property - useful to find out the version number even if all you have is the minified source code

## version 1.1.2 (May 30, 2017)

- fixed a bug with contained pins where things were not working as expected if the container element would have a position other than "static"
- new folder structure
- performance improvements and source code tweaks
- the home of the library is now exclusively on GitHub
- files required in the build process are not included anymore when installing via npm nor when downloading from GitHub

## version 1.0.9 (January 26, 2016)

- it is available as a [Bower package](http://bower.io/) and as an [npm package](https://www.npmjs.com/package/zebra_pin)

## version 1.0.5 (January 20, 2016)

- better integration with [Bower package](http://bower.io/)

## version 1.0.0 (December 07, 2013)

- initial release