# UXR
[![npm][npm]][npm-url]
[![tests][tests]][tests-url]
[![coverage][cover]][cover-url]

A minimal in mind library for DOM related routines and element selections. UXR wraps some most used methods like CSS Classes, Event Management, Data Management, Attribute selections/updates. Supports chaining and plugins.

UXR has the philosophy of fewer code and low file size. Because of this, widely supported ES6 codes are not transpiled to ES5 versions and not trying to cover all JavaScript methods which are normally written without much effort. UXR provides easy to wrappers for normally complex once.

## Browser Support
| Browser | [![chrome][chrome]] | [![firefox][firefox]] | [![opera][opera]] | [![safari][safari]] | [![edge][edge]] |
| ------- | ------------------- | --------------------- | ----------------- | ------------------- | --------------- |
| Version  | 49+  | 36+ | 37+ | 10+ | 12+ |

## How To Use
After adding the `dist/uxr.min.js` to your page, you can select an element set from DOM and start to manipulate/modify the selection.

### Loading UXR methods
You can define UXR methods to run when page loads and content ready. Or run when needed.

``` js
uxr.ready(function(){
    // inner functions automatically runs when loading finished
    
});

```

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

// add multiple classes at once
el.addClass('.a set .of classes');
el.addClass(['array', 'of', 'classes']);

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

### Data Attributes
Data method gets or sets a data attribute. If `dataset` supported, gets or sets values via `dataset` otherwise, uses the `getAttribute` method to get value. Both supports _camelCase_ and _dashed_ attribute names.

``` js
let el = uxr(selector);

// get data value
el.data('uxr-demo');
el.data('uxrDemo');

// set data value
el.data('uxr-demo', true);
el.data('uxrDemo', true);
```

### Events
DOM events can easily attached to elements. Named events and anonymous events supported while attaching the event. Also _triggering_ an event is possible. 

#### Add Events

``` js
let myFunc = (e) => { console.log(e.currentTarget);}

// attach an event
uxr(selector).on('click', myFunc);

// attach an event to child
uxr(selector).on('click', '.clickable', myFunc);

// attach multiple event
uxr(selector).on('input focus', e => { console.log(e.currentTarget.value); }
```

#### Remove Events

``` js
// remove all click events
uxr(selector).off('click');

// remove only click event attached with myFunc
uxr(selector).off('click', myFunc);

// remove events attached with an anonymous function
uxr(selector).off('input focus', e => { console.log(e.currentTarget.value); }
```

#### Single Run Events
Single Run events are only run once then remove itself from the element.

``` js
// run once
uxr(selector).once('touchend', e => { console.log('touch ended'); })
```

### Wrapper Methods
With wrapper methods, you can wrap element or elements to a new parent or unwrap them.

``` js
let single = uxr('.single-element');
let list = uxr('.list-element');

// wrap element
single.wrap('div');

// wrap all elements in a single parent
list.wrapAll('<ul />');

// Unwrap the parent
single.unwrap();
```

Unwrap removes the immediate parent. If a selector also defined for the unwrap as `el.unwrap(selector)`, it check if the immediate parent matches the selector.

For wrapper definitions, you can define wrapper string without brackets, with brackets, with attributes etc. 
All of the following strings are valid wrapper definitions

* `div` _only name of the tag_
* `<div>` _tag name with brackets_
* `<div />`
* `<div></div>`
* `<div class="wrapper" />` _tag name with attributes_
* `<div class='wrapper' id="container"></div>`

### Element Insertions
By using `before`, `after`, `prepend` and `append` you can control where to insert newly created elements.

``` js
let el = uxr('.container');

// adds an element before selection
el.before('<p>This will before "el"</p>');
el.before(uxr('#new'));

// adds an element after selection
el.after('<p>This will before "el"</p>');
el.after(uxr('#new'));

// appends an element add the end of selection's content
el.append('<p>This will before "el"</p>');
el.append(uxr('#new'));

// appends an element add the beginning of selection's content
el.prepend('<p>This will before "el"</p>');
el.prepend(uxr('#new'));
```

[npm]: https://img.shields.io/npm/v/uxr.svg
[npm-url]: https://npmjs.com/package/uxr

[tests]: http://img.shields.io/travis/bcinarli/uxr.svg
[tests-url]: https://travis-ci.org/bcinarli/uxr

[cover]: https://codecov.io/gh/bcinarli/uxr/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/bcinarli/uxr

[chrome]: http://uxrocket.io/browsers/chrome.png
[firefox]: http://uxrocket.io/browsers/firefox.png
[opera]: http://uxrocket.io/browsers/opera.png
[safari]: http://uxrocket.io/browsers/safari.png
[edge]: http://uxrocket.io/browsers/edge.png