/**
 * ready-test
 **/

describe('Ready', () => {
    it('should run a function when Document is ready', () => {
        let i = 0;

        _.ready(() => i++);

        expect(i).to.be.equal(1);
    });
});