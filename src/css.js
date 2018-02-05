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

const setProps = (props) => {
    if (typeof props === 'string') {
        return [toDomString(props)];
    }

    if (Array.isArray(props)) {
        return props.map(p => toDomString(p));
    }
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
        properties: [],
        values: value ? [value] : []
    };

    options.properties = setProps(prop);

    // if the prop is object for set of prop/value pair
    options = maybePropIsObject(prop) || options;

    if (options.values.length > 0) {
        return this.el.map(item => options.properties.forEach((p, i) => item.style[p] = options.values[i]));
    }

    // if no value set then we are asking for getting the values of properties
    // this breaks the chaining
    return getStyles(this.el[0], options.properties);
};