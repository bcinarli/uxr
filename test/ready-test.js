/**
 * ready-test
 **/

describe('Ready', () => {
    it('should run a function when Document is ready', () => {
        let i = 0;

        _.ready(() => i++);
    });
});

describe('Load', () => {
    it('should run a function when Document is loaded', () => {
        let i = 1;

        _.load(() => i++);
    });
});