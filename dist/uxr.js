(function() {
/**
 * uxr
 **/

const _ = window.uxr = function (selector, context) {
    return new uxr(selector, context);
};

const uxr = function (selector, context) {
    this.selector = selector;
    this.context = context;
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

        this.prevObj = this.prevObj || {
            0: document,
            el: [document],
            length: 1,
            selector: null
        };

        this.el = [...this.el];

        for (let i = 0; i < this.el.length; i++) {
            _this[i] = this.el[i];
        }

        this.length = this.el.length;
    }
};

_.extend.init.prototype = _.extend;
_.internal = {};

// generate hashes for internal usage
_.internal.hashCode = s => s.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
}, 0);

// trims the string and replaces to multiple spaces in the string with single space
_.internal.justifyString = s => s.replace(/\s\s+/g, ' ').trim();

// split selector
_.internal.maybeMultiple = s => _.internal.justifyString(s).split(' ');
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

const _class = function (stack, className, type) {
    stack.el.forEach(function (item) {
        _.internal.maybeMultiple(className).filter(e => e !== '').map(className => item.classList[type](className));
    });

    return stack;
};

_.extend.addClass = function (className) {
    return _class(this, className, 'add');
};

_.extend.removeClass = function (className) {
    return _class(this, className, 'remove');
};

_.extend.hasClass = function (className) {
    return this.filter('.' + className).length > 0;
};

_.extend.toggleClass = function (className) {
    return this.el.forEach(item => {
        let classNames = _.internal.maybeMultiple(className);

        if (item.nodeType === 1) {
            classNames.forEach(_className => item.classList.toggle(_className));
        }
    });
};

/**
 * data
 **/

_.extend.data = function (name, value) {
    let item = this.el[0];

    if (typeof item.dataset !== 'undefined') {
        if (value) {
            item.dataset[name] = value;
        }

        else {
            return item.dataset[name];
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

_.extend.off = function (eventName, eventHandlerOrSelector, eventHandler) {
    let handler = eventHandlerOrSelector;
    let events = _.internal.maybeMultiple(eventName);

    if (typeof eventHandler !== 'undefined') {
        handler = eventHandler;
    }

    this.el.forEach(function (item) {
        events.forEach(event => {
            if (typeof handler === 'undefined') {
                Object.keys(item.uxrAttachedEvents[event]).forEach(function (fn) {
                    item.removeEventListener(event, item.uxrAttachedEvents[event][fn]);
                });
            }

            else {
                let hash = _.internal.hashCode((handler).toString());
                item.removeEventListener(event, item.uxrAttachedEvents[event][hash]);
            }
        });
    });
};

_.extend.on = function (eventName, eventHandlerOrSelector, eventHandler) {
    let handler = eventHandlerOrSelector;
    let events = _.internal.maybeMultiple(eventName);

    if (typeof eventHandler !== 'undefined') {
        handler = eventHandler;
    }

    let hash = _.internal.hashCode((handler).toString());

    this.el.forEach(function (item) {
        if (typeof item.uxrAttachedEvents === 'undefined') {
            item.uxrAttachedEvents = {};
        }

        events.forEach(event => {
            if (typeof item.uxrAttachedEvents[event] === 'undefined') {
                item.uxrAttachedEvents[event] = {};
            }

            item.uxrAttachedEvents[event][hash] = handler;

            item.addEventListener(event, item.uxrAttachedEvents[event][hash]);
        });
    });
};

_.extend.once = function (eventName, eventHandlerOrSelector, eventHandler) {
    let handler = eventHandlerOrSelector;
    let events = _.internal.maybeMultiple(eventName);

    if (typeof eventHandler !== 'undefined') {
        handler = eventHandler;
    }

    this.el.forEach(function (item) {
        events.forEach(event => {
            let oneHandler = function (e) {
                e.preventDefault();
                _(item).off(event, handler);
                _(item).off(event, oneHandler);
            };

            _(item).on(event, handler);
            _(item).on(event, oneHandler);
        });
    });
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

Element.prototype.matches = Element.prototype.matches ? Element.prototype.matches : Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
/**
 * manipulation
 **/

_.extend.empty = function () {
    return this.el.forEach(item => item.innerHTML = '');
};

_.extend.remove = function () {
    return this.el.forEach(item => item.parentNode.remove(item));
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
 * wrap
 **/

_.extend.wrap = function () {
    return this;
};

_.extend.unwrap = function () {
    return this;
};
})();