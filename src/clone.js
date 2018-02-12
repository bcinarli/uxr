/**
 * clone
 **/

/* global mutated */

_.extend.clone = function (deep = false) {
    return mutated(this, this.el.map(item => item.cloneNode(deep)));
};