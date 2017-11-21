/**
 * data
 **/

(function (_) {
    'use strict';

    _.extend.data = function (name, value) {
        let item = this.el[0];

        if (typeof item.dataset !== 'undefined') {
            if (value) {
                item.dataset[name] = value;
            }

            else {
                return item.dataset[name];
            }
        }

        else {
            return item.getAttribute('data-' + name);
        }
    };

})(uxr);