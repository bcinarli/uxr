/**
 * dimensions
 **/

/* global removeUnit */

const contentSize = ({stack, type, newSize}) => {
    let client = type === 'width' ? 'clientWidth' : 'clientHeight';
    let styleFirst = type === 'width' ? 'paddingLeft' : 'paddingTop';
    let styleLast = type === 'width' ? 'paddingRight' : 'paddingBottom';

    if (stack.length === 0) {
        return false;
    }

    if (newSize) {
        stack.el.forEach(item => item.style[type] = newSize);

        return stack;
    }

    else {
        let el = stack.el[0];

        return el[client]
            - removeUnit(el.style[styleFirst])
            - removeUnit(el.style[styleLast]);
    }
};

const clientSize = ({stack, type}) => {
    return stack.length > 0 ? stack.el[0][type] : false;
};

const offsetSize = ({stack, type, margins}) => {
    let styleFirst = margins ? 'marginLeft' : 'marginTop';
    let styleLast = margins ? 'marginRight' : 'marginBottom';

    if (stack.length === 0) {
        return false;
    }

    let el = stack.el[0];
    let sizeType = el[type];

    if (margins) {
        sizeType += removeUnit(el.style[styleFirst]) + removeUnit(el.style[styleLast]);
    }

    return sizeType;
};

_.extend.contentWidth = _.extend.width = function (newWidth) {
    return contentSize({stack: this, type: 'width', newSize: newWidth});
};

_.extend.clientWidth = _.extend.innerWidth = function () {
    return clientSize({stack: this, type: 'clientWidth'});
};

_.extend.offsetWidth = _.extend.outerWidth = function (includeMargins = false) {
    return offsetSize({stack: this, type: 'offsetWidth', margins: includeMargins});
};

_.extend.contentHeight = _.extend.height = function (newHeight) {
    return contentSize({stack: this, type: 'height', newSize: newHeight});
};

_.extend.clientHeight = _.extend.innerHeight = function () {
    return clientSize({stack: this, type: 'clientHeight'});
};

_.extend.offsetHeight = _.extend.outerHeight = function (includeMargins = false) {
    return offsetSize({stack: this, type: 'offsetHeight', margins: includeMargins});
};