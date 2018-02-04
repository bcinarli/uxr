/**
 * dimensions
 **/

/* global removeUnit */

_.extend.contentWidth = _.extend.width = function (newWidth) {
    if (this.length > 0) {
        if (newWidth) {
            this.el.forEach(item => item.style.width = newWidth);
            return this;
        }

        else {
            return this.el[0].clientWidth - removeUnit(this.el[0].style.paddingLeft) - removeUnit(this.el[0].style.paddingRight);
        }
    }

    return false;
};

_.extend.clientWidth = _.extend.innerWidth = function () {
    return this.length > 0 ? this.el[0].clientWidth : false;
};

_.extend.offsetWidth = _.extend.outerWidth = function (includeMargins = false) {
    if (this.length > 0) {
        let outerWidth = this.el[0].offsetWidth;

        if (includeMargins) {
            outerWidth += removeUnit(this.el[0].style.marginLeft) + removeUnit(this.el[0].style.marginRight);
        }

        return outerWidth;
    }

    return false;
};

_.extend.contentHeight = _.extend.height = function (newHeight) {
    if (this.length > 0) {
        if (newHeight) {
            this.el.forEach(item => item.style.height = newHeight);
            return this;
        }

        else {
            return this.el[0].clientHeight - removeUnit(this.el[0].style.paddingTop) - removeUnit(this.el[0].style.paddingBottom);
        }
    }

    return false;
};

_.extend.clientHeight = _.extend.innerHeight = function () {
    return this.length > 0 ? this.el[0].clientHeight : false;
};

_.extend.offsetHeight = _.extend.outerHeight = function (includeMargins = false) {
    if (this.length > 0) {
        let outerHeight = this.el[0].offsetHeight;

        if (includeMargins) {
            outerHeight += removeUnit(this.el[0].style.marginTop) + removeUnit(this.el[0].style.marginBottom);
        }

        return outerHeight;
    }

    return false;
};