/**
 * traversing
 **/

/* global mutated */

const _mapFilterAndMutate = map => {
    return function (selector) {
        return mutated(
            this,
            this.el.map(item => item[map]).filter(item => selector ? item.matches(selector) : item));
    };
};

_.extend.closest = function (selector) {
    let el = this.el[0];

    if (!selector) {
        return mutated(this, [el.parentNode]);
    }

    while (el !== null && el.nodeType === 1) {
        if (el.matches(selector)) {
            return mutated(this, [el]);
        }

        el = el.parentNode;
    }

    return mutated(this, []);
};

_.extend.parent = _mapFilterAndMutate('parentNode');

_.extend.children = function (selector) {
    return mutated(
        this,
        this.el.map(item => Array.from(item.children))
            .reduce((acc, cur) => acc.concat(cur), [])
            .filter(item => selector ? item.matches(selector) : item));
};

_.extend.siblings = function (selector) {
    return mutated(
        this,
        this.el.map(item =>
            Array.from(item.parentNode.children)
                .filter(child => !child.isEqualNode(item)))
            .reduce((acc, cur) => acc.concat(cur), [])
            .filter(item => selector ? item.matches(selector) : item));
};

_.extend.next = _mapFilterAndMutate('nextElementSibling');

_.extend.prev = _mapFilterAndMutate('previousElementSibling');

_.extend.first = function () {
    return mutated(this, this.el.filter((item, index) => index === 0));
};

_.extend.last = function () {
    let last = this.length - 1;
    return mutated(this, this.el.filter((item, index) => index === last));
};
