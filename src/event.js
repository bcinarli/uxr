/**
 * event
 **/

(function (_) {
    'use strict';

    _.extend.off = function (eventName, eventHandlerOrSelector, eventHandler) {
        let handler = eventHandlerOrSelector;
        let events = eventName.split(' ').map(event => event.trim());

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
                    let hash = _.hashCode((handler).toString());
                    item.removeEventListener(event, item.uxrAttachedEvents[event][hash]);
                }
            });
        });
    };

    _.extend.on = function (eventName, eventHandlerOrSelector, eventHandler) {
        let handler = eventHandlerOrSelector;
        let events = eventName.split(' ').map(event => event.trim());

        if (typeof eventHandler !== 'undefined') {
            handler = eventHandler;
        }

        let hash = _.hashCode((handler).toString());

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
        let events = eventName.split(' ').map(event => event.trim());

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
})(uxr);