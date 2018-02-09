/**
 * ready
 **/

const _stateChange = (condition) => {
    return fn => {
        return document.addEventListener('readystatechange', e => {
            if (e.target.readyState === condition) {
                fn();
            }
        });
    };
};

/* istanbul ignore next */
_.ready = _stateChange('interactive');

/* istanbul ignore next */
_.load = _stateChange('complete');