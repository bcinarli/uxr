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