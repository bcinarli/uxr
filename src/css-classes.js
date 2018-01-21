/**
 * css-classes
 **/

/* global normalizeClassName */

const _class = function (stack, className, type) {
    return stack.el[0].nodeType === 1 && stack.el.forEach(item => _.internal.maybeMultiple(className).map(className => item.classList[type](normalizeClassName(className))));
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
        let classNames = _.internal.maybeMultiple(className);

        if (item.nodeType === 1) {
            classNames.forEach(className => item.classList.toggle(normalizeClassName(className)));
        }
    });
};
