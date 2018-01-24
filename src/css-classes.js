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
    this.el.forEach(item => {
        let classNames = maybeMultiple(className);

        if (item.nodeType === 1) {
            classNames.forEach(className => item.classList.toggle(normalizeClassName(className)));
        }
    });

    return this;
};
