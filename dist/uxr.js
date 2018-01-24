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

_.extend.attr = function (attr, value) {
    if (value) {
        return this.el.forEach(item => item[attr] = value);
    }

    return this.el[0][attr];
};

_.extend.text = function (txt) {
    return this.attr('innerText', txt);
};

_.extend.html = function (html) {
    return this.attr('innerHTML', html);
};

_.extend.src = function (url) {
    return this.attr('src', url);
};

_.extend.href = function (url) {
    return this.attr('href', url);
};

_.extend.value = function (value) {
    return this.attr('value', value);
};
/**
 * css-classes
 **/

/* global normalizeClassName */
/* global maybeMultiple */

const _class = function (stack, className, type) {
    stack.el[0].nodeType === 1 && stack.el.forEach(item => maybeMultiple(className).map(className => item.classList[type](normalizeClassName(className))));

    return stack;
};

_.extend.addClass = function (className) {
    return _class(this, className, 'add');
};

_.extend.removeClass = function (className) {
    return _class(this, className, 'remove');
};

_.extend.hasClass = function (className) {
    return this.el[0].nodeType === 1 && this.filter('.' + normalizeClassName(className)).length > 0;
};

_.extend.toggleClass = function (className) {
    return this.el.forEach(item => {
        let classNames = maybeMultiple(className);

        if (item.nodeType === 1) {
            classNames.forEach(className => item.classList.toggle(normalizeClassName(className)));
        }
    });
};

/**
 * data
 **/

/* global toDomString */

_.extend.data = function (name, value) {
    let item = this.el[0];
    let domName = toDomString(name);

    if (typeof item.dataset !== 'undefined') {
        if (typeof value !== 'undefined') {
            item.dataset[domName] = value;
        }

        else {
            return item.dataset[domName];
        }
    }

    else {
        return item.getAttribute('data-' + name);
    }
};
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

_.extend.off = function (eventName, eventHandlerOrSelector, eventHandler) {
    let stack = this;
    let handler = eventHandlerOrSelector;
    let events = maybeMultiple(eventName);

    if (typeof eventHandlerOrSelector === 'string') {
        handler = eventHandler;
        stack = this.find(eventHandlerOrSelector);
    }

    if (typeof eventHandler !== 'undefined') {
        handler = eventHandler;
        stack = this.find(eventHandlerOrSelector);
    }

    stack.el.forEach(item => {
        item.uxrAttachedEvents = item.uxrAttachedEvents || {};

        events.forEach(event => {
            // make sure not to give an error, if user tried to remove unattached event
            if (typeof item.uxrAttachedEvents[event] === 'undefined') {
                return;
            }

            else if (typeof handler === 'undefined') {
                Object.keys(item.uxrAttachedEvents[event]).forEach(fn => {
                    item.removeEventListener(event, item.uxrAttachedEvents[event][fn]);
                    delete item.uxrAttachedEvents[event];
                });
            }

            else {
                let hash = hashCode((handler).toString());
                item.removeEventListener(event, item.uxrAttachedEvents[event][hash]);
                delete item.uxrAttachedEvents[event][hash];
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

_.extend.trigger = function (eventName, selector) {
    let stack = this;
    let event = document.createEvent('HTMLEvents');

    event.initEvent(eventName, true, true);

    if (typeof selector !== 'undefined') {
        stack = this.find(selector);
    }

    stack.el.forEach(item => item.dispatchEvent(event));

    return this;
};
/**
 * filter
 **/

/* global mutated */

_.extend.filter = function (criteria) {
    return mutated(this, this.el.filter(item => item.matches(criteria)));
};

_.extend.find = function (criteria) {
    return mutated(this, this.el[0].querySelectorAll(criteria));
};
/**
 * manipulation
 **/

/* global getInsertableElement */
/* global insertBefore */

_.extend.empty = function () {
    return this.el.forEach(item => item.innerHTML = '');
};

_.extend.remove = function () {
    return this.el.forEach(item => item.parentNode.removeChild(item));
};

_.extend.append = function (stringOrObject) {
    return this.el.forEach(item => item.appendChild(getInsertableElement(stringOrObject)));
};

_.extend.prepend = function (stringOrObject) {
    return this.el.forEach(
        item => insertBefore(stringOrObject, item, 'firstChild'));
};

_.extend.after = function (stringOrObject) {
    return this.el.forEach(
        item => insertBefore(stringOrObject, item, 'nextSibling', true));
};

_.extend.before = function (stringOrObject) {
    return this.el.forEach(
        item => insertBefore(stringOrObject, item, 'self', true));
};

_.extend.replaceWith = function (stringOrObject) {
    return this.el.map(
        item => item.parentNode.replaceChild(getInsertableElement(stringOrObject), item)
    );
};
/**
 * ready
 **/

_.ready = function (fn) {
    if (document.readyState !== 'loading') {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
};
/**
 * traversing
 **/

/* global mutated */

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

_.extend.next = function (selector) {
    return mutated(this, this.el.map(item => item.nextElementSibling).filter(item => selector ? item.matches(selector) : item));
};

_.extend.prev = function (selector) {
    return mutated(this, this.el.map(item => item.previousElementSibling).filter(item => selector ? item.matches(selector) : item));
};

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
        insertableElement = insertableElement.el[0];
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
_.uxr = { version: '0.4.2' };
})();