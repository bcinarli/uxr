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
                    delete item.uxrAttachedEvents[event];
                });
            }

            else {
                let hash = _.internal.hashCode((handler).toString());
                item.removeEventListener(event, item.uxrAttachedEvents[event][hash]);
                delete item.uxrAttachedEvents[event][hash];
            }
        });
    });

    return this;
};

_.extend.on = function (eventName, eventHandlerOrSelector, eventHandler) {
    let handler = eventHandlerOrSelector;
    let events = _.internal.maybeMultiple(eventName);

    if (typeof eventHandler !== 'undefined') {
        handler = eventHandler;
    }

    let hash = _.internal.hashCode((handler).toString());

    this.el.forEach(function (item) {
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
    let handler = eventHandlerOrSelector;
    let events = _.internal.maybeMultiple(eventName);

    if (typeof eventHandler !== 'undefined') {
        handler = eventHandler;
    }

    this.el.forEach(item => {
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
    let stack = this.el;
    let event = document.createEvent('HTMLEvents');

    event.initEvent(eventName, true, true);

    if (selector) {
        stack = this.find(selector);
    }

    stack.forEach(item => item.dispatchEvent(event));

    return this;
};