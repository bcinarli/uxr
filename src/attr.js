/**
 * attr
 **/

/* global toDomString */

_.extend.attr = function (attr, value) {
    if (value) {
        return this.setAttribute(attr, value);
    }

    return this.getAttr(attr);
};

_.extend.setAttr = _.extend.setAttribute = function (attr, value) {
    this.el.forEach(item => item.setAttribute(toDomString(attr), value));

    return this;
};

_.extend.getAttr = _.extend.getAttribute = function (attr) {
    return this.el[0].getAttribute(toDomString(attr));
};

_.extend.removeAttr = _.extend.removeAttribute = function (attr) {
    this.el.forEach(item => item.removeAttribute(toDomString(attr)));

    return this;
};

_.extend.src = function (url) {
    return this.attr('src', url);
};

_.extend.href = function (url) {
    return this.attr('href', url);
};