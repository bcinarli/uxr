/**
 * manipulation
 **/

_.extend.empty = function () {
    return this.el.forEach(item => item.innerHTML = '');
};

_.extend.remove = function () {
    return this.el.forEach(item => item.parentNode.remove(item));
};