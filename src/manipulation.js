/**
 * manipulation
 **/

/* global getInsertableElement */
/* global insertBefore */

const _insert = ({where, parent}) => {
    return function(stringOrObject) {
        this.el.forEach(
            item => insertBefore(stringOrObject, item, where, parent));

        return this;
    };
};

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

_.extend.prepend = _insert({where: 'firstChild', parent: false});

_.extend.after = _insert({where: 'nextSibling', parent: true});

_.extend.before = _insert({where: 'self', parent: true});

_.extend.replaceWith = function (stringOrObject) {
    this.el.map(
        item => item.parentNode.replaceChild(getInsertableElement(stringOrObject), item)
    );

    return this;
};