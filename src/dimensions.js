/**
 * dimensions
 **/

/* global removeUnit */

const contentSize = (stack, type, newSize) => {
    let vars = {
        client: type === 'width' ? 'clientWidth' : 'clientHeight',
        styleFirst: type === 'width' ? 'paddingLeft' : 'paddingTop',
        styleLast: type === 'width' ? 'paddingRight' : 'paddingBottom'
    };

    if (stack.length > 0) {
        if (newSize) {
            stack.el.forEach(item => item.style[type] = newSize);

            return stack;
        }

        else {
            let el = stack.el[0];

            return el[vars.client]
                - removeUnit(el.style[vars.styleFirst])
                - removeUnit(el.style[vars.styleLast]);
        }
    }

    return false;
};

const clientSize = (stack, type) => {
    return stack.length > 0 ? stack.el[0][type] : false;
};

const offsetSize = (stack, type, margins) => {
    let vars = {
        styleFirst: margins ? 'marginLeft' : 'marginTop',
        styleLast: margins ? 'marginRight' : 'marginBottom'
    };

    if (stack.length > 0) {
        let el = stack.el[0];
        let sizeType = el[type];

        if (margins) {
            sizeType += removeUnit(el.style[vars.styleFirst])
                + removeUnit(el.style[vars.styleLast]);
        }

        return sizeType;
    }

    return false;
};

_.extend.contentWidth = _.extend.width = function (newWidth) {
    return contentSize(this, 'width', newWidth);
};

_.extend.clientWidth = _.extend.innerWidth = function () {
    return clientSize(this, 'clientWidth');
};

_.extend.offsetWidth = _.extend.outerWidth = function (includeMargins = false) {
    return offsetSize(this, 'offsetWidth', includeMargins);
};

_.extend.contentHeight = _.extend.height = function (newHeight) {
    return contentSize(this, 'height', newHeight);
};

_.extend.clientHeight = _.extend.innerHeight = function () {
    return clientSize(this, 'clientHeight');
};

_.extend.offsetHeight = _.extend.outerHeight = function (includeMargins = false) {
    return offsetSize(this, 'offsetHeight', includeMargins);
};