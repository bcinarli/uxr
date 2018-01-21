# UXR
[![npm][npm]][npm-url]
[![tests][tests]][tests-url]
[![coverage][cover]][cover-url]

A minimal in mind library for DOM related routines and element selections. UXR wraps some most used methods like CSS Classes, Event Management, Data Management, Attribute selections/updates. Supports chaining and plugins.

UXR has the philosophy of fewer code and low file size. Because of this, widely supported ES6 codes are not transpiled to ES5 versions and not trying to cover all JavaScript methods which are normally written without much effort. UXR provides easy to wrappers for normally complex once.

## How To Use
After adding the `dist/uxr.min.js` to your page, you can select an element set from DOM and start to manipulate/modify the selection.

### Element Selection
Every `uxr` methods starts with element selections. Basically selection uses `querySelectorAll` getting element from DOM or Arrays.

``` js
// selecting an element with querySelectorAll supported selector strings
uxr(selector);

// getting an array as selector
uxr([0, 1, 2, 3])
```

### Chaining
`uxr` methods supports chaining. So you can call `uxr` methods one after another.

``` js
uxr(selector)
    .addClass('hello')
    .find('a')
    .on('click', e => { 
        e.preventDefault();
        console.log('Hello World!')
    })
    .end()
    .attr('id', 'my-id');
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


### Class Manipulation
With `uxr` it is easier to add/remove or check classes. All for class manipulation methods supports multiple class names separated with space and setting class starting with dot (`.`) 

``` js
let el = uxr(selector);

// add a new css class
el.addClass('new-class');
el.addClass('.new-class');

// remove a css class
el.removeClass('old-class');
el.removeClass('.old-class');

// toggles a class
el.toggleClass('class-to-toggle');
el.toggleClass('.class-to-toggle');

// checks if has the class or not
el.hasClass('class-to-check');
el.hasClass('.class-to-check');
```

[npm]: https://img.shields.io/npm/v/uxr.svg
[npm-url]: https://npmjs.com/package/uxr

[tests]: http://img.shields.io/travis/bcinarli/uxr.svg
[tests-url]: https://travis-ci.org/bcinarli/uxr

[cover]: https://codecov.io/gh/bcinarli/uxr/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/bcinarli/uxr