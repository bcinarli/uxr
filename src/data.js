/**
 * data
 **/

/* global toDomString */

_.extend.data = function (name, value) {
    let item = this.el[0];
    let domName = toDomString(name);

    if (typeof value !== 'undefined') {
        item.dataset[domName] = value;
        return this;
    }

    return item.dataset[domName];
};