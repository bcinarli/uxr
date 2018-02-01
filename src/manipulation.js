/**
 * manipulation
 **/

/* global getInsertableElement */
/* global insertBefore */

_.extend.empty = function () {
    return this.el.forEach(item => item.innerHTML = '');
};

_.extend.remove = function () {
    return this.el.forEach(item => item.parentNode.removeChild(item));
};

_.extend.append = function (stringOrObject) {
    return this.el.forEach(item => item.appendChild(getInsertableElement(stringOrObject)));
};

_.extend.prepend = function (stringOrObject) {
    return this.el.forEach(
        item => insertBefore(stringOrObject, item, 'firstChild', false));
};

_.extend.after = function (stringOrObject) {
    return this.el.forEach(
        item => insertBefore(stringOrObject, item, 'nextSibling', true));
};

_.extend.before = function (stringOrObject) {
    return this.el.forEach(
        item => insertBefore(stringOrObject, item, 'self', true));
};

_.extend.replaceWith = function (stringOrObject) {
    return this.el.map(
        item => item.parentNode.replaceChild(getInsertableElement(stringOrObject), item)
    );
};