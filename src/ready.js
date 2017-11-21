/**
 * ready
 **/

(function (_) {
    'use strict';

    _.ready = function (fn) {
        if (document.readyState !== 'loading') {
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }
    };
})(uxr);