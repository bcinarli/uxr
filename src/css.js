/**
 * css
 **/

/* global toDomString */
/* global isObject */

_.extend.css = function (prop, value) {
    let properties = [];
    let values = value ? [value] : [];
    let list = {};

    if (typeof prop === 'string') {
        properties = [toDomString(prop)];
    }

    else if (isObject(prop)) {
        Object.keys(prop).forEach(p => {
            properties.push(toDomString(p));
            values.push(prop[p]);
        });
    }

    else if (Array.isArray(prop)) {
        properties = prop.map(p => toDomString(p));
    }

    if (values.length > 0) {
        return this.el.map(item => properties.forEach((p, i) => item.style[p] = values[i]));
    }

    if (properties.length > 1) {
        properties.forEach(prop => {
            list[prop] = this.el[0].style[prop];
        });
    }
    else {
        list = this.el[0].style[properties[0]];
    }

    return list;
};