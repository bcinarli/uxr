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

const getStyles = (el, props) => {
    let list = {};

    props.forEach(prop => {
        list[prop] = el.style[prop];
    });

    return props.length === 1 ? list[props[0]] : list;
};


_.extend.css = function (prop, value) {
    let options = {
        properties: typeof prop === 'string' ? [toDomString(prop)] : [],
        values: value ? [value] : []
    };

    // if the prop is object for set of prop/value pair
    options = maybePropIsObject(prop) || options;

    if (Array.isArray(prop)) {
        options.properties = prop.map(p => toDomString(p));
    }

    if (options.values.length > 0) {
        return this.el.map(item => options.properties.forEach((p, i) => item.style[p] = options.values[i]));
    }

    // if no value set then we are asking for getting the values of properties
    // this breaks the chaining
    else {
        return getStyles(this.el[0], options.properties);
    }
};