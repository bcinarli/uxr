/**
 * filter
 **/

/* global mutated */

_.extend.filter = function (criteria) {
    return mutated(this, this.el.filter(item => item.matches(criteria)));
};

_.extend.find = function (criteria) {
    return mutated(this, this.el[0].querySelectorAll(criteria));
};