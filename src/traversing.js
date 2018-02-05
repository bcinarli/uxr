/**
 * traversing
 **/

/* global mutated */

const mapAndFilter = ({stack, map, filter}) => {
    return stack.el.map(item => item[map]).filter(item => filter ? item.matches(filter) : item);
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

_.extend.parent = function (selector) {
    return mutated(
        this,
        mapAndFilter({stack: this, map: 'parentNode', filter: selector}));
};

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

_.extend.next = function (selector) {
    return mutated(
        this,
        mapAndFilter({stack: this, map: 'nextElementSibling', filter: selector}));
};

_.extend.prev = function (selector) {
    return mutated(this,
        mapAndFilter({stack: this, map: 'previousElementSibling', filter: selector}));
};

_.extend.first = function () {
    return mutated(this, this.el.filter((item, index) => index === 0));
};

_.extend.last = function () {
    let last = this.length - 1;
    return mutated(this, this.el.filter((item, index) => index === last));
};
