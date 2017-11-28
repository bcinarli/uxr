/**
 * filter
 **/

_.extend.filter = function (criteria) {
    let _this = this;
    let filtered = _(_this.el.filter(item => item.matches(criteria)));

    filtered.prevObj = this;

    return filtered;
};

if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}