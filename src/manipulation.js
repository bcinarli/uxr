/**
 * manipulation
 **/

/* global getInsertableElement */
/* global insertBefore */

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

_.extend.prepend = function (stringOrObject) {
    this.el.forEach(
        item => insertBefore(stringOrObject, item, 'firstChild'));

    return this;
};

_.extend.after = function (stringOrObject) {
    this.el.forEach(
        item => insertBefore(stringOrObject, item, 'nextSibling', true));

    return this;
};

_.extend.before = function (stringOrObject) {
    this.el.forEach(
        item => insertBefore(stringOrObject, item, 'self', true));

    return this;
};