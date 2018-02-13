(function() {
/**
 * uxr
 **/

const _ = window['uxr'] = function (selector) {
    return new uxr(selector);
};

const uxr = function (selector) {
    this.selector = selector;
    this.init();
};

_.extend = uxr.prototype = {
    constructor: uxr,

    init: function () {
        const _this = this;

        if (typeof this.selector === 'string') {
            this.el = document.querySelectorAll(this.selector);
        }

        else if (this.selector.length) {
            this.el = this.selector;
        }

        else {
            this.el = [];
        }

        this.el = [...this.el];

        for (let i = 0; i < this.el.length; i++) {
            _this[i] = this.el[i];
        }

        this.length = this.el.length;
    }
};

_.extend.init.prototype = _.extend;
/**
 * attr
 **/

/* global toDomString */

_.extend.attr = function (attr, value) {
    if (value) {
        return this.setAttribute(attr, value);
    }

    return this.getAttr(attr);
};

_.extend.setAttr = _.extend.setAttribute = function (attr, value) {
    this.el.forEach(item => item.setAttribute(toDomString(attr), value));

    return this;
};

_.extend.getAttr = _.extend.getAttribute = function (attr) {
    return this.el[0].getAttribute(toDomString(attr));
};

_.extend.removeAttr = _.extend.removeAttribute = function (attr) {
    this.el.forEach(item => item.removeAttribute(toDomString(attr)));

    return this;
};

_.extend.src = function (url) {
    return this.attr('src', url);
};

_.extend.href = function (url) {
    return this.attr('href', url);
};
/**
 * clone
 **/

/* global mutated */

_.extend.clone = function (deep = false) {
    return mutated(this, this.el.map(item => item.cloneNode(deep)));
};
/**
 * css-classes
 **/

/* global normalizeClassName */
/* global maybeMultiple */

const _class = type => {
    return function (className) {
        this.el.forEach(item => {
            if (item.nodeType === 1) {
                maybeMultiple(className).map(className => item.classList[type](normalizeClassName(className)));
            }
        });

        return this;
    };
};

_.extend.addClass = _class('add');

_.extend.removeClass = _class('remove');

_.extend.hasClass = function (className) {
    return this.el[0].nodeType === 1 && this.filter('.' + normalizeClassName(className)).length > 0;
};

_.extend.toggleClass = function (className) {
    this.el.forEach(item => {
        let classNames = maybeMultiple(className);

        if (item.nodeType === 1) {
            classNames.forEach(className => item.classList.toggle(normalizeClassName(className)));
        }
    });

    return this;
};

/**
 * css
 **/

/* global toDomString */
/* global isObject */

const maybePropIsObject = prop => {
    let properties = [];
    let values = [];

    if (isObject(prop)) {
        Object.keys(prop).forEach(p => {
            properties.push(toDomString(p));
            values.push(prop[p]);
        });
        return {properties, values};
    }

    return false;
};

const setProps = (props) => {
    if (typeof props === 'string') {
        return [toDomString(props)];
    }

    if (Array.isArray(props)) {
        return props.map(p => toDomString(p));
    }
};

const getStyles = (el, props) => {
    let list = {};

    props.forEach(prop => {
        list[prop] = el.style[prop];
    });

    return props.length === 1 ? list[props[0]] : list;
};


_.extend.css = function (prop, value) {
    let options = {
        properties: [],
        values: value ? [value] : []
    };

    options.properties = setProps(prop);

    // if the prop is object for set of prop/value pair
    options = maybePropIsObject(prop) || options;

    if (options.values.length > 0) {
        this.el.map(item => options.properties.forEach((p, i) => item.style[p] = options.values[i]));

        return this;
    }

    // if no value set then we are asking for getting the values of properties
    // this breaks the chaining
    return getStyles(this.el[0], options.properties);
};
/**
 * data
 **/

/* global toDomString */

_.extend.data = function (name, value) {
    let domName = toDomString(name);

    if (typeof value !== 'undefined') {
        this.el.forEach(item => item.dataset[domName] = value);
        return this;
    }

    return this.el[0].dataset[domName];
};
/**
 * dimensions
 **/

/* global removeUnit */

const _getContentSize = (el, type) => {
    let client = type === 'width' ? 'clientWidth' : 'clientHeight';
    let styleFirst = type === 'width' ? 'paddingLeft' : 'paddingTop';
    let styleLast = type === 'width' ? 'paddingRight' : 'paddingBottom';

    return el[client] - removeUnit(el.style[styleFirst]) - removeUnit(el.style[styleLast]);
};

const _contentSize = type => {
    return function (newSize) {
        if (this.length === 0) {
            return false;
        }

        if (newSize) {
            this.el.forEach(item => item.style[type] = newSize);

            return this;
        }

        return _getContentSize(this.el[0], type);
    };
};

const _clientSize = type => {
    return function () {
        return this.length > 0 ? this.el[0][type] : false;
    };
};

const _getMarginSize = (el, type) => {
    let styleFirst = type === 'offsetWidth' ? 'marginLeft' : 'marginTop';
    let styleLast = type === 'offsetHeight' ? 'marginRight' : 'marginBottom';

    return removeUnit(el.style[styleFirst]) + removeUnit(el.style[styleLast]);
};

const _offsetSize = type => {
    return function (includeMargins = false) {

        if (this.length === 0) {
            return false;
        }

        let el = this.el[0];
        let sizeType = el[type];

        if (includeMargins) {
            sizeType += _getMarginSize(el, type);
        }

        return sizeType;
    };
};

_.extend.contentWidth = _.extend.width = _contentSize('width');
_.extend.clientWidth = _.extend.innerWidth = _clientSize('clientWidth');
_.extend.offsetWidth = _.extend.outerWidth = _offsetSize('offsetWidth');

_.extend.contentHeight = _.extend.height = _contentSize('height');
_.extend.clientHeight = _.extend.innerHeight = _clientSize('clientHeight');
_.extend.offsetHeight = _.extend.outerHeight = _offsetSize('offsetHeight');
/**
 * end
 **/

_.extend.end = function () {
    return this.prevObj || this;
};
/**
 * event
 **/

/* global hashCode */
/* global maybeMultiple */
/* global isObject */

/*const events = {
    animation: ['animationend', 'animationiteration', 'animationstart'],
    drag: ['drag', 'dragend', 'dragenter', 'dragleave', 'dragover', 'dragstart', 'drop'],
    frame: ['abort', 'beforeunload', 'error', 'hashchange', 'load', 'pageshow', 'pagehide', 'resize', 'scroll', 'unload'],
    form: ['blur', 'change', 'focus', 'focusin', 'focusout', 'input', 'invalid', 'reset', 'search', 'select', 'submit'],
    keyboard: ['keydown', 'keypress', 'keyup'],
    media: ['abort', 'canplay', 'canplaythrough', 'durationchange', 'emptied', 'ended', 'error', 'loadeddata', 'loadedmetadata', 'loadstart', 'pause', 'play', 'progress', 'ratechange', 'seeked', 'seeking', 'stalled', 'suspend', 'timeupdate', 'volumechange', 'waiting'],
    misc: ['message', 'mousewheel', 'online', 'offline', 'popstate', 'show', 'storage', 'toggle', 'wheel'],
    mouse: ['click', 'contextmenu', 'dblclick', 'mousedown', 'mouseenter', 'mouseleave', 'mousemove', 'mouseover', 'mouseout', 'mouseup'],
    print: ['afterprint', 'beforeprint'],
    server: ['error', 'message', 'open'],
    transition: ['transitionend'],
    touch: ['touchcancel', 'touchend', 'touchmove', 'touchstart']
};

const allEvents = Object.keys(events).reduce((acc, cur) => acc.concat(events[cur]), []);*/

const removeEventFromItem = (item, event, fn) => {
    item.removeEventListener(event, item.uxrAttachedEvents[event][fn]);
    delete item.uxrAttachedEvents[event][fn];

    return item;
};

_.extend.off = function (eventName, eventHandlerOrSelector, eventHandler) {
    let stack = this;
    let handler = eventHandlerOrSelector;
    let events = maybeMultiple(eventName);

    if (typeof eventHandlerOrSelector === 'string'
        || typeof eventHandler !== 'undefined') {
        handler = eventHandler;
        stack = this.find(eventHandlerOrSelector);
    }

    stack.el.forEach(item => {
        item.uxrAttachedEvents = item.uxrAttachedEvents || {};

        events.forEach(event => {
            // make sure not to give an error, if user tried to remove unattached event
            if (typeof item.uxrAttachedEvents[event] !== 'undefined') {
                if (typeof handler === 'undefined') {
                    Object.keys(item.uxrAttachedEvents[event]).forEach(fn => {
                        removeEventFromItem(item, event, fn);
                    });
                }

                else {
                    let hash = hashCode((handler).toString());
                    removeEventFromItem(item, event, hash);
                }
            }
        });
    });

    return this;
};

_.extend.on = function (eventName, eventHandlerOrSelector, eventHandler) {
    let stack = this;
    let handler = eventHandlerOrSelector;
    let events = maybeMultiple(eventName);

    if (typeof eventHandler !== 'undefined') {
        handler = eventHandler;
        stack = this.find(eventHandlerOrSelector);
    }

    let hash = hashCode((handler).toString());

    stack.el.forEach(item => {
        item.uxrAttachedEvents = item.uxrAttachedEvents || {};

        events.forEach(event => {
            item.uxrAttachedEvents[event] = item.uxrAttachedEvents[event] || {};
            item.uxrAttachedEvents[event][hash] = handler;

            item.addEventListener(event, item.uxrAttachedEvents[event][hash]);
        });
    });

    return this;
};

_.extend.once = function (eventName, eventHandlerOrSelector, eventHandler) {
    let stack = this;
    let handler = eventHandlerOrSelector;
    let events = maybeMultiple(eventName);

    if (typeof eventHandler !== 'undefined') {
        handler = eventHandler;
        stack = this.find(eventHandlerOrSelector);
    }

    stack.el.forEach(item => {
        events.forEach(event => {
            /* istanbul ignore next */
            let oneHandler = e => {
                e.preventDefault();
                _(item).off(event, handler);
                _(item).off(event, oneHandler);
            };

            _(item).on(event, handler);
            _(item).on(event, oneHandler);
        });
    });

    return this;
};

_.extend.trigger = function (eventName, eventParamsOrSelector, eventParams) {
    let stack = this;
    let event;

    if (eventParamsOrSelector !== 'undefined' && typeof eventParamsOrSelector === 'string') {
        stack = this.find(eventParamsOrSelector);
    }

    if (!_eventHasParams(eventParamsOrSelector, eventParams)) {
        event = getNativeEvent(eventName);
    }

    else {
        event = getCustomEvent(eventName, eventParamsOrSelector, eventParams);
    }

    stack.el.forEach(item => item.dispatchEvent(event));

    return this;
};

const _eventHasParams = (eventParamsOrSelector, eventParams) => {
    return (typeof eventParamsOrSelector !== 'undefined' && isObject(eventParamsOrSelector)) || typeof eventParams !== 'undefined';
};

const getNativeEvent = (eventName) => {
    return new Event(eventName);
};

const getCustomEvent = (eventName, eventParamsOrSelector, eventParams) => {
    let params = eventParams;

    if (typeof eventParamsOrSelector !== 'undefined'
        && isObject(eventParamsOrSelector)) {
        params = eventParamsOrSelector;
    }

    return new CustomEvent(eventName, {detail: params});
};
/**
 * filter
 **/

/* global mutated */

_.extend.filter = function (selector) {
    return mutated(this, this.el.filter(item => item.matches(selector)));
};

_.extend.find = _.extend.has = function (selector) {
    return mutated(this, this.el.map(item => [...item.querySelectorAll(selector)]).reduce((acc, cur) => acc.concat(cur), []));
};

_.extend.not = function (selector) {
    return mutated(this, this.el.filter(item => !item.matches(selector)));
};
/**
 * manipulation
 **/

/* global getInsertableElement */
/* global insertBefore */

const _insert = ({where, parent}) => {
    return function(stringOrObject) {
        this.el.forEach(
            item => insertBefore(stringOrObject, item, where, parent));

        return this;
    };
};

_.extend.empty = function () {
    this.el.forEach(item => item.innerHTML = '');

    return this;
};

_.extend.remove = function () {
    this.el.forEach(item => item.parentNode.removeChild(item));

    return this;
};

_.extend.append = function (stringOrObject) {
    this.el.forEach(item => item.appendChild(getInsertableElement(stringOrObject)));

    return this;
};

_.extend.prepend = _insert({where: 'firstChild', parent: false});

_.extend.after = _insert({where: 'nextSibling', parent: true});

_.extend.before = _insert({where: 'self', parent: true});

_.extend.replaceWith = function (stringOrObject) {
    this.el.map(
        item => item.parentNode.replaceChild(getInsertableElement(stringOrObject), item)
    );

    return this;
};
/**
 * prop
 **/

_.extend.prop = function (prop, value) {
    if (value) {
        return this.setProp(prop, value);
    }

    return this.getProp(prop);
};

_.extend.setProp = function (prop, value) {
    this.el.forEach(item => item[prop] = value);

    return this;
};

_.extend.getProp = function (prop) {
    return this[0][prop];
};

_.extend.text = function (txt) {
    return this.prop('innerText', txt);
};

_.extend.html = function (html) {
    return this.prop('innerHTML', html);
};

_.extend.value = function (value) {
    return this.prop('value', value);
};
/**
 * ready
 **/

/* istanbul ignore next */
const _stateChange = (condition) => {
    return fn => {
        return document.addEventListener('readystatechange', e => {
            if (e.target.readyState === condition) {
                fn();
            }
        });
    };
};

_.ready = _stateChange('interactive');

_.load = _stateChange('complete');
/**
 * traversing
 **/

/* global mutated */

const _mapFilterAndMutate = map => {
    return function (selector) {
        return mutated(
            this,
            this.el.map(item => item[map]).filter(item => selector ? item.matches(selector) : item));
    };
};

_.extend.closest = function (selector) {
    let el = this.el[0];

    if (!selector) {
        return mutated(this, [el.parentNode]);
    }

    while (el !== null && el.nodeType === 1) {
        if (el.matches(selector)) {
            return mutated(this, [el]);
        }

        el = el.parentNode;
    }

    return mutated(this, []);
};

_.extend.parent = _mapFilterAndMutate('parentNode');

_.extend.children = function (selector) {
    return mutated(
        this,
        this.el.map(item => Array.from(item.children))
            .reduce((acc, cur) => acc.concat(cur), [])
            .filter(item => selector ? item.matches(selector) : item));
};

_.extend.siblings = function (selector) {
    return mutated(
        this,
        this.el.map(item =>
            Array.from(item.parentNode.children)
                .filter(child => !child.isEqualNode(item)))
            .reduce((acc, cur) => acc.concat(cur), [])
            .filter(item => selector ? item.matches(selector) : item));
};

_.extend.next = _mapFilterAndMutate('nextElementSibling');

_.extend.prev = _mapFilterAndMutate('previousElementSibling');

_.extend.first = function () {
    return mutated(this, this.el.filter((item, index) => index === 0));
};

_.extend.last = function () {
    let last = this.length - 1;
    return mutated(this, this.el.filter((item, index) => index === last));
};

/**
 * utils
 **/

Element.prototype.matches = Element.prototype.matches ? Element.prototype.matches : Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;

// eslint-disable-next-line
const normalizeClassName = className => className.charAt(0) === '.' ? className.substr(1) : className;

// generate hashes for internal usage
// eslint-disable-next-line
const hashCode = s => s.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
}, 0);

// trims the string and replaces to multiple spaces in the string with single space
// eslint-disable-next-line
const justifyString = s => s.replace(/\s\s+/g, ' ').trim();

// split selector
// eslint-disable-next-line
const maybeMultiple = s => typeof s === 'string' ? justifyString(s).split(' ') : s;

// Dom String Format
// eslint-disable-next-line
const toDomString = s => s.substr(0, 1).toLowerCase() + s.split('-').map(chunk => chunk.charAt(0).toUpperCase() + chunk.slice(1)).join('').substring(1);

// Element from string
// eslint-disable-next-line
const elementFromString = s => {
    if (typeof s === 'string') {
        let template = document.createElement('template');
        template.innerHTML = s.trim();

        return template.content.firstChild;
    }

    return s;
};

// Insertable Element
// eslint-disable-next-line
const getInsertableElement = s => {
    let insertableElement = elementFromString(s);

    if (insertableElement instanceof uxr) {
        let template = document.createElement('template');
        insertableElement.el.forEach(item => template.content.appendChild(item));
        insertableElement = template.content;
    }

    return insertableElement;
};

// InserBefore
// eslint-disable-next-line
const insertBefore = (insert, target, ref, parent) => {
    let to = parent === true ? target.parentNode : target;
    let where = ref === 'self' ? target : target[ref];

    to.insertBefore(getInsertableElement(insert), where);
};

// mutatedObj
// eslint-disable-next-line
const mutated = (orgObj, newSet) => {
    let obj = _(newSet);

    obj.prevObj = orgObj;

    return obj;
};

// Is Object => {key: value}
// eslint-disable-next-line
const isObject = objLike => ({}.toString.call(objLike) === '[object Object]');

// Remove Unit
// eslint-disable-next-line
const removeUnit = number => parseInt(number, 10);
/**
 * wrap
 **/

/* global elementFromString */

const getWrapper = wrapperStr => {
    let wrapperString = wrapperStr.toString();

    return wrapperString.charAt(0) !== '<' ?
        document.createElement(wrapperString) :
        elementFromString(wrapperString);
};

_.extend.wrap = function (wrapper) {
    let newWrap = getWrapper(wrapper);

    let parent = this.el[0].parentNode;
    let siblings = this.el[0].nextSibling;

    newWrap.appendChild(this.el[0]);

    if (siblings) {
        parent.insertBefore(newWrap, siblings);
    }
    else {
        parent.appendChild(newWrap);
    }

    return this;
};

_.extend.wrapAll = function (wrapper) {
    let firstSibling = true;
    let newWrap = getWrapper(wrapper);

    this.el.forEach(item => {
        if (firstSibling) {
            let parent = item.parentNode;
            let siblings = item.nextSibling;

            newWrap.appendChild(item);

            if (siblings) {
                parent.insertBefore(newWrap, siblings);
            }
            else {
                parent.appendChild(newWrap);
            }

            firstSibling = false;
        }

        else {
            newWrap.appendChild(item);
        }
    });

    return this;
};

_.extend.unwrap = function (selector) {
    let parent = this.el[0].parentNode;

    // if the parent is not the desired one, skip unwrapping
    if (selector && !parent.matches(selector.toString())) {
        return this;
    }

    parent.parentNode.appendChild(this.el[0]);

    if (parent.children.length === 0) {
        parent.parentNode.removeChild(parent);
    }

    return this;
};
_.uxr = { version: '0.7.0' };
})();