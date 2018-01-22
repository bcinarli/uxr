/**
 * data
 **/

/* global toDomString */

_.extend.data = function (name, value) {
    let item = this.el[0];
    let domName = toDomString(name);

    if (typeof item.dataset !== 'undefined') {
        if (typeof value !== 'undefined') {
            item.dataset[domName] = value;
        }

        else {
            return item.dataset[domName];
        }
    }

    else {
        return item.getAttribute('data-' + name);
    }
};