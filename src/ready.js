/**
 * ready
 **/

/* istanbul ignore next */
_.ready = function (fn) {
    document.addEventListener('readystatechange', (e) => {
        if(e.target.readyState === 'interactive') {
            fn();
        }
    });
};

/* istanbul ignore next */
_.load = function(fn) {
    document.addEventListener('readystatechange', (e) => {
        if(e.target.readyState === 'complete') {
            fn();
        }
    });
};