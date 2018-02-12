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
