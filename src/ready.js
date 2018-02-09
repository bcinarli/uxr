/**
 * ready
 **/

/* istanbul ignore next */
const _stateChange = (condition) => {
    return fn => {
        return document.addEventListener('readystatechange', e => {
            if (e.target.readyState === condition) {
                fn();
            }
        });
    };
};

_.ready = _stateChange('interactive');

_.load = _stateChange('complete');