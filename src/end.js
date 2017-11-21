/**
 * end
 **/

(function (_) {
    'use strict';

    _.extend.end = function () {
        return this.prevObj || this;
    };
})(uxr);