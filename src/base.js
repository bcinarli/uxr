/**
 * uxr
 **/

const _ = window.uxr = function (selector, context) {
    return new uxr(selector, context);
};

const uxr = function (selector, context) {
    this.selector = selector;
    this.context = context;
    this.init();
};

_.extend = uxr.prototype = {
    constructor: uxr,

    init: function () {
        const _this = this;

        if (typeof this.selector === 'string') {
            this.el = document.querySelectorAll(this.selector);
        }

        else if (this.selector.length) {
            this.el = this.selector;
        }

        else {
            this.el = [];
        }

        if (typeof this.prevObj === 'undefined') {
            this.prevObj = {
                0: document,
                el: [document],
                length: 1,
                selector: null
            };
        }

        this.el = [].slice.call(this.el);

        for (let i = 0; i < this.el.length; i++) {
            _this[i] = this.el[i];
        }

        this.length = this.el.length;
    }
};

_.extend.init.prototype = _.extend;

// generate hashes for internal usage
_.hashCode = function (s) {
    return s.split('').reduce(function (a, b) {
        a = ((a << 5) - a) + b.charCodeAt(0);
        return a & a;
    }, 0);
};