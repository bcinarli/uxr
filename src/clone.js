/**
 * clone
 **/

/* global mutated */

_.extend.clone = function (deep = false) {
    let newStack = this.el.map(item => item.cloneNode(deep));

    return mutated(this, newStack);
};