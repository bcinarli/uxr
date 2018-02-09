/**
 * dimensions
 **/

/* global removeUnit */

const _contentSize = type => {
    return function (newSize) {
        let client = type === 'width' ? 'clientWidth' : 'clientHeight';
        let styleFirst = type === 'width' ? 'paddingLeft' : 'paddingTop';
        let styleLast = type === 'width' ? 'paddingRight' : 'paddingBottom';

        if (this.length === 0) {
            return false;
        }

        if (newSize) {
            this.el.forEach(item => item.style[type] = newSize);

            return this;
        }

        return this.el[0][client] - removeUnit(this.el[0].style[styleFirst]) - removeUnit(this.el[0].style[styleLast]);
    };
};

const _clientSize = type => {
    return function () {
        return this.length > 0 ? this.el[0][type] : false;
    };
};

const _offsetSize = type => {
    return function (includeMargins = false) {
        let styleFirst = includeMargins ? 'marginLeft' : 'marginTop';
        let styleLast = includeMargins ? 'marginRight' : 'marginBottom';

        if (this.length === 0) {
            return false;
        }

        let el = this.el[0];
        let sizeType = el[type];

        if (includeMargins) {
            sizeType += removeUnit(el.style[styleFirst]) + removeUnit(el.style[styleLast]);
        }

        return sizeType;
    };
};

_.extend.contentWidth = _.extend.width = _contentSize('width');
_.extend.clientWidth = _.extend.innerWidth = _clientSize('clientWidth');
_.extend.offsetWidth = _.extend.outerWidth = _offsetSize('offsetWidth');

_.extend.contentHeight = _.extend.height = _contentSize('height');
_.extend.clientHeight = _.extend.innerHeight = _clientSize('clientHeight');
_.extend.offsetHeight = _.extend.outerHeight = _offsetSize('offsetHeight');