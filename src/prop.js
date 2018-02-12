/**
 * prop
 **/

_.extend.prop = function (prop, value) {
    if (value) {
        return this.setProp(prop, value);
    }

    return this.getProp(prop);
};

_.extend.setProp = function (prop, value) {
    this.el.forEach(item => item[prop] = value);

    return this;
};

_.extend.getProp = function (prop) {
    return this[0][prop];
};

_.extend.text = function (txt) {
    return this.prop('innerText', txt);
};

_.extend.html = function (html) {
    return this.prop('innerHTML', html);
};

_.extend.value = function (value) {
    return this.prop('value', value);
};