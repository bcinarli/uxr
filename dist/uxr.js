(function() {
/**
 * uxr
 **/

const _ = window.uxr = function (selector) {
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
    return stack.el[0].nodeType === 1 && stack.el.forEach(item => maybeMultiple(className).map(className => item.classList[type](normalizeClassName(className))));
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

_.extend.filter = function (criteria) {
    let _this = this;
    let filtered = _(_this.el.filter(item => item.matches(criteria)));

    filtered.prevObj = this;

    return filtered;
};

_.extend.find = function (criteria) {
    let _this = this;
    let found = _(_this.el[0].querySelectorAll(criteria));

    found.prevObj = this;

    return found;
};

Element.prototype.matches = Element.prototype.matches ? Element.prototype.matches : Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
/**
 * manipulation
 **/

/* global getInsertableElement */
/* global insertBefore */

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

_.extend.prepend = function (stringOrObject) {
    this.el.forEach(
        item => insertBefore(stringOrObject, item, 'firstChild'));

    return this;
};

_.extend.after = function (stringOrObject) {
    this.el.forEach(
        item => insertBefore(stringOrObject, item, 'nextSibling', true));

    return this;
};

_.extend.before = function (stringOrObject) {
    this.el.forEach(
        item => insertBefore(stringOrObject, item, 'self', true));

    return this;
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
 * utils
 **/

/* exported createElementFromString */

// eslint-disable-next-line
const createElementFromString = str => {
    let elementString = str.toString();

    const tagRegex = /([<])?([a-zA-Z]+)/;
    const theTag = elementString.match(tagRegex);
    const attrRegex = /(\S+)=["']?((?:.(?!["']?\s+(?:\S+)=|[>"']))+.)["']?/g;
    const mayHaveAttributes = elementString.match(attrRegex) || [];

    const newElement = document.createElement(theTag[2]);

    mayHaveAttributes.forEach(attr => {
        let singleAttrRegex = /([a-zA-Z-]+)=(?:['"])(.*)(?:['"])/g;
        let theAttr = singleAttrRegex.exec(attr);

        newElement.setAttribute(theAttr[1], theAttr[2]);
    });

    return newElement;
};

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
/**
 * wrap
 **/

/* global createElementFromString */

_.extend.wrap = function (wrapper) {
    let newWrap = createElementFromString(wrapper);

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
    let newWrap = createElementFromString(wrapper);

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
})();