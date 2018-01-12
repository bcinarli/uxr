/**
 * end-test
 **/

describe('End', () => {
    let endElem = uxr('#end');

    it('should return the selection itself if selection is not filtered', () => {
        expect(endElem.end()).to.be.equal(endElem);
    });

    it('should revert the previously selected element', () => {
        let endInner = endElem.find('#end-inner');
        expect(endInner.end()).to.be.equal(endElem);
    });
});