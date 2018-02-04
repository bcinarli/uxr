/**
 * css
 **/

/* global toDomString */
/* global isObject */

const maybePropIsObject = prop => {
    let properties = [];
    let values = [];

    if (isObject(prop)) {
        Object.keys(prop).forEach(p => {
            properties.push(toDomString(p));
            values.push(prop[p]);
        });
        return {properties, values};
    }

    return false;
};

_.extend.css = function (prop, value) {
    let options = {
        properties: typeof prop === 'string' ? [toDomString(prop)] : [],
        values: value ? [value] : []
    };
    let list = {};

    // if the prop is object for set of prop/value pair
    options = maybePropIsObject(prop) || options;

    if (Array.isArray(prop)) {
        options.properties = prop.map(p => toDomString(p));
    }

    if (options.values.length > 0) {
        return this.el.map(item => options.properties.forEach((p, i) => item.style[p] = options.values[i]));
    }

    // if no value set and only prop name set, return the values of asked prop(s)
    if (options.properties.length > 1) {
        options.properties.forEach(prop => {
            list[prop] = this.el[0].style[prop];
        });
    }
    else {
        list = this.el[0].style[options.properties[0]];
    }

    return list;
};