/**
 * filter
 **/

/* global mutated */

_.extend.filter = function (selector) {
    return mutated(this, this.el.filter(item => item.matches(selector)));
};

_.extend.find = _.extend.has = function (selector) {
    return mutated(this, this.el.map(item => [...item.querySelectorAll(selector)]).reduce((acc, cur) => acc.concat(cur), []));
};

_.extend.not = function (selector) {
    return mutated(this, this.el.filter(item => !item.matches(selector)));
};