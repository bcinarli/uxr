/**
 * filter
 **/

_.extend.filter = function (criteria) {
    let _this = this;
    let filtered = _(_this.el.filter(item => item.matches(criteria)));

    filtered.prevObj = this;

    return filtered;
};

_.extend.find = function (criteria) {
    let _this = this;
    let found = _(_this.el[0].querySelectorAll(criteria));

    found.prevObj = this;

    return found;
};

Element.prototype.matches = Element.prototype.matches ? Element.prototype.matches : Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;