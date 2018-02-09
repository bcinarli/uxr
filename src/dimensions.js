/**
 * dimensions
 **/

/* global removeUnit */

const _getContentSize = (el, type) => {
    let client = type === 'width' ? 'clientWidth' : 'clientHeight';
    let styleFirst = type === 'width' ? 'paddingLeft' : 'paddingTop';
    let styleLast = type === 'width' ? 'paddingRight' : 'paddingBottom';

    return el[client] - removeUnit(el.style[styleFirst]) - removeUnit(el.style[styleLast]);
};

const _contentSize = type => {
    return function (newSize) {
        if (this.length === 0) {
            return false;
        }

        if (newSize) {
            this.el.forEach(item => item.style[type] = newSize);

            return this;
        }

        return _getContentSize(this.el[0], type);
    };
};

const _clientSize = type => {
    return function () {
        return this.length > 0 ? this.el[0][type] : false;
    };
};

const _getMarginSize = (el, type) => {
    let styleFirst = type === 'offsetWidth' ? 'marginLeft' : 'marginTop';
    let styleLast = type === 'offsetHeight' ? 'marginRight' : 'marginBottom';

    return removeUnit(el.style[styleFirst]) + removeUnit(el.style[styleLast]);
};

const _offsetSize = type => {
    return function (includeMargins = false) {

        if (this.length === 0) {
            return false;
        }

        let el = this.el[0];
        let sizeType = el[type];

        if (includeMargins) {
            sizeType += _getMarginSize(el, type);
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