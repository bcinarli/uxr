# UXR
[![npm][npm]][npm-url]
[![tests][tests]][tests-url]
[![coverage][cover]][cover-url]

A minimal in mind library for DOM related routines and element selections. UXR wraps some most used methods like CSS Classes, Event Management, Data Management, Attribute selections/updates. Supports chaining and plugins.

UXR has the philosophy of fewer code and low file size. Because of this, widely supported ES6 codes are not transpiled to ES5 versions and not trying to cover all JavaScript methods which are normally written without much effort. UXR provides easy to wrappers for normally complex once.

## How To Use
After adding the `dist/uxr.min.js` you can select an element set from DOM and start to manipulate/modify the selection.

### Element Selection
Every `uxr` methods starts with element selections. Basically selection uses `querySelectorAll` getting element from DOM or Arrays.

``` js
// selecting an element with querySelectorAll supported selector strings
uxr(selector);

// getting an array as selector
uxr([0, 1, 2, 3])
```

### Attribute Manipulation

With `uxr(selector).attr()` methods you can get an attribute's value or set a value

``` js
let el = uxr(selector);

// get the ID
let id = el.attr('id');

// set the ID
el.attr('id', 'new-id');

// get a data-attr value
// the following both samples gets the same attribute
el.attr('data-attr');
el.attr('dataAttr');
```

There are some, easy to use - easy to remember attribute methods

* `uxr(selector).text(value)` : if you send the `value` it sets the `innerText` value with the new one. Otherwise returns the `innerText` value. 
* `uxr(selector).html(value)` : if you send the `value` it sets the `innerHTML` value with the new one. Otherwise returns the `innerHTML` value. 
* `uxr(selector).src(value)` : if you send the `value` it sets the `src` of the element. Otherwise returns the `src` value. 
* `uxr(selector).href(value)` : if you send the `value` it sets the `href` value of the anchor with the new one. Otherwise returns the `href` value. 
* `uxr(selector).value(value)` : if you send the `value` it sets the value of form elements with the new one. Otherwise returns the value of the form element. 


[npm]: https://img.shields.io/npm/v/uxr.svg
[npm-url]: https://npmjs.com/package/uxr

[tests]: http://img.shields.io/travis/bcinarli/uxr.svg
[tests-url]: https://travis-ci.org/bcinarli/uxr

[cover]: https://codecov.io/gh/bcinarli/uxr/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/bcinarli/uxr