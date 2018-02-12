/**
 * data
 **/

/* global toDomString */

_.extend.data = function (name, value) {
    let domName = toDomString(name);

    if (typeof value !== 'undefined') {
        this.el.forEach(item => item.dataset[domName] = value);
        return this;
    }

    return this.el[0].dataset[domName];
};