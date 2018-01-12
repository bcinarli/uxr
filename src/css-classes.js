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
