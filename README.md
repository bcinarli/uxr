<img src="http://uxrocket.io/browsers/uxrocket.png" width="64" align="right" />

# UXR
[![npm][npm]][npm-url]
[![tests][tests]][tests-url]
[![coverage][cover]][cover-url]
[![devDependencies Status][dm]][dm-url]
[![Maintainability][cc]][cc-url]
[![Open Source Love][os]][os-url]
[![PRs Welcome][pr]][pr-url]


A minimal in mind library for DOM related routines and element selections. UXR wraps some most used methods like CSS Classes, Event Management, Data Management, Attribute selections/updates. Supports chaining and plugins.

UXR has the philosophy of fewer code and low file size. Because of this, widely supported ES6 codes are not transpiled to ES5 versions and not trying to cover all JavaScript methods which are normally written without much effort. UXR provides easy to wrappers for normally complex once.

## Browser Support
| Browser | <img src="http://uxrocket.io/browsers/chrome.png" width="24" /> | <img src="http://uxrocket.io/browsers/firefox.png" width="24" /> | <img src="http://uxrocket.io/browsers/opera.png" width="24" /> | <img src="http://uxrocket.io/browsers/safari.png" width="24" /> | <img src="http://uxrocket.io/browsers/edge.png" width="24" /> |
| ------- | ----------------- | ------------------- | --------------- | ----------------- | ------------- |
| Version  | 49+  | 36+ | 37+ | 10+ | 12+ |

## How To Use
You can install UXR via Node package managers
``` js
$ npm install uxr
// or
$ yarn add uxr
```

Or you can directly include you `dist` files to your project after downloading the desired version.

After adding the `dist/uxr.min.js` to your page, you can select an element set from DOM and start to manipulate/modify the selection.

### Loading UXR methods
You can define UXR methods to run when page loads and content ready. Or run when needed.

``` js
uxr.ready(function(){
    // inner functions automatically runs when document is ready
});

uxr.load(function(){
    // inner functions automatically runs when document is fully loaded
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
With `uxr(selector).attr()` methods you can get an attribute's value or set a value in HTML tags

``` js
let el = uxr(selector);

// get the ID
let id = el.attr('id');
// getAttr method is an alias to attr(name)
let id = el.getAttr('id');

// set the ID
el.attr('id', 'new-id');
// setAttr method is an alias to attr(name, value);
el.setAttr('id', 'new-id');

// get a data-attr value
// the following both samples gets the same attribute
el.attr('data-attr');
el.attr('dataAttr');

// Remove an attribute from HTML
el.removeAttr('id');
el.removeAttribute('id');
```

There are some, easy to use - easy to remember attribute methods


* `uxr(selector).src(value)` : if you send the `value` it sets the `src` of the element. Otherwise returns the `src` value. 
* `uxr(selector).href(value)` : if you send the `value` it sets the `href` value of the anchor with the new one. Otherwise returns the `href` value. 

### Props
With `uxr(selector).prop()` methods you can get an DOM node element's properties. This is different than attr methods where it get native elements properties rather than HTML attributes.

``` js
let el = uxr(selector);

// get a property
let innerText = el.prop('innerText');

// set a property
el.prop('innerText', 'New Text');
```

There are some, easy to use - easy to remember property methods
* `uxr(selector).text(value)` : if you send the `value` it sets the `innerText` value with the new one. Otherwise returns the `innerText` value. 
* `uxr(selector).html(value)` : if you send the `value` it sets the `innerHTML` value with the new one. Otherwise returns the `innerHTML` value. 
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

#### Trigger Events
Native and custom events can be triggered by using trigger method. Similar to event bindings, event trigger can be triggered on children elements. Despite event binding, where you can bind multiple events at once, you can trigger one event at a time.

``` js
// trigger a click event
uxr(selector).trigger('click');

// trigger a custom event
uxr(selector).trigger('custom');

// trigger a focus event in children
uxr(selector).trigger('focus', 'input[type=text]');

// trigger event with params
uxr(selector).trigger('click', {custom: 'params', another: {custom: 'paramater'}});

// trigger event with params in children
uxr(selector).trigger('blur', 'textarea', {custom: 'params', another: {custom: 'paramater'}});
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
By using `before`, `after`, `prepend` and `append` you can control where to insert newly created elements. Also with `replaceWith` you can swap the element with a new one.

``` js
let el = uxr('.container');

// adds an element before selection
el.before('<p>This will be before of "el"</p>');
el.before(uxr('#new'));

// adds an element after selection
el.after('<p>This will be after of "el"</p>');
el.after(uxr('#new'));

// appends an element add the end of selection's content
el.append('<p>This will be at the end of "el"</p>');
el.append(uxr('#new'));

// appends an element add the beginning of selection's content
el.prepend('<p>This will be at the beginning of "el"</p>');
el.prepend(uxr('#new'));

// replaces the element with new one
el.replaceWith('<div id="replaced">Previous element replaced</div>');
```

### Filtering and Finding
Filtering methods help to find or filter elements in a UXR object.

``` js
// create a subset of elements in a UXR object
uxr(selector).filter(anotherSelector);

// create a subset of elements that a not matched the selector in a UXR object
uxr(selector).not(anotherSelector);

// find / select children elements in a UXR object
// has method is an alias to find
uxr(selector).find(childrenSelector);
uxr(selector).has(childrenSelecotr);
```

### Traversing
With traversal methods, you can find adjacent or parent elements accordingly. Almost all traversal methods returns a `uxr` object. You can return the previous `uxr` by chaining `end()` 

``` js

let el = uxr('li');

// get the immediate parent
el.closest();

// get the grandparent
el.closest().closest();

// filter the parents and get the first matched
el.closest(selector);

// get the next sibling
el.next();

// get the next sibling if matched 
el.next(selector);

// get the previous sibling
el.prev();

// get the previous sibling if matched
el.prev(selector);

// get the first element in uxr object - selection
el.first();

// get the last element in uxr object - selection
el.last();

// get the immediate parent
el.parent();

// get the immediate parent if matched to selector
el.parent(selector);

// get the all children element
el.children();

// get the all matched children
el.children(selector);

// get the all siblings
el.siblings();

// get the all matched siblings
el.siblings(selector);
``` 

### CSS
`css` method helps to set or get style attributes of the elements.

``` js
let el = uxr(selector);

// get a style property
el.css('display'); // returns the display property value

// get a list of style properties
// returns an object with listed values. 
// note that, you can ask for properties both kebap-case and camelCase
el.css(['display', 'margin', 'padding-top', 'borderLeft']); 
// returns {display: value, margin: value, paddingTop: value, borderLeft: value}

// sets or updates a single property
el.css('padding', '10px');
el.css('background-color', '#ccc');
el.css('backgroundSize', '100% auto');

// sets or updates a list of properties
// note that, you can send a object contains property:value pairs
el.css({width: '100px', height: '50px', 'margin-bottom': '5px'});
```

### Dimensions
Dimension related methods returns or sets content width or height according to dimension method. Except setting `width` and `height` methods, all other usages break the chaining.

``` js
let el = uxr(selector);

// returns the first elements content width
// note that: this return only the content width, no-border, no-padding, no-margin
el.width();
el.contentWidth(); // alias method

// sets the width of elements in the uxr object.
// similar method to el.css('width', value); 
el.width('100px');
el.contentWidth('100%');

// returns the clientWidth of the first element
// note that: this is only differs from width method with addition of padding
el.innerWidth();
el.clientWidth(); // alias method


// returns the offsetWidth of the first element
// note that: this calculates width with border, padding and content-width altogether
el.outerWidth();
el.offsetWidth(); // alias method

// returns the offsetWidth of the first element including margins
// note that: this calculates width with margin, border, padding and content-width altogether
el.outerWidth(true);
el.offsetWidth(true); // alias method

// returns the first elements content height
// note that: this return only the content height, no-border, no-padding, no-margin
el.height();
el.contentHeight(); // alias method

// sets the height of elements in the uxr object.
// similar method to el.css('height', value); 
el.height('100px');
el.contentHeight('100%');

// returns the clientHeight of the first element
// note that: this is only differs from width method with addition of padding
el.innerHeight();
el.clientHeight(); // alias method


// returns the offsetHeight of the first element
// note that: this calculates height with border, padding and content-height altogether
el.outerHeight();
el.offsetHeight(); // alias method

// returns the offsetHeight of the first element including margins
// note that: this calculates height with margin, border, padding and content-height altogether
el.outerHeight(true);
el.offsetHeight(true); // alias method
```

### Cloning
Clone methods, clones the nodes in a UXR object. 

``` js
let el = uxr(selector);

// clones the all elements in uxr object
let clone = el.clone();

// deep clones (child elements and inner contents) the all elements in uxr object
let cloneDeep = el.clone(true);
```

[npm]: https://img.shields.io/npm/v/uxr.svg
[npm-url]: https://npmjs.com/package/uxr

[tests]: http://img.shields.io/travis/bcinarli/uxr.svg
[tests-url]: https://travis-ci.org/bcinarli/uxr

[cover]: https://codecov.io/gh/bcinarli/uxr/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/bcinarli/uxr

[os]:https://badges.frapsoft.com/os/v2/open-source.svg?v=103
[os-url]:(https://github.com/ellerbrock/open-source-badges/)

[pr]:https://img.shields.io/badge/PRs-welcome-brightgreen.svg
[pr-url]:http://makeapullrequest.com

[cc]:https://api.codeclimate.com/v1/badges/2da503653af06036b031/maintainability
[cc-url]: https://codeclimate.com/github/bcinarli/uxr/maintainability

[dm]:https://david-dm.org/bcinarli/uxr/dev-status.svg
[dm-url]:https://david-dm.org/bcinarli/uxr?type=dev
