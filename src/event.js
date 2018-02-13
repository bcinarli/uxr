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