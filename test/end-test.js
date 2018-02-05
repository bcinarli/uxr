/**
 * end-test
 **/

describe('End', () => {
    // end setup
    (() => {
        let div = createElement('div', {id: 'end'});
        let div2 = createElement('div', {id: 'end-inner'});

        appendTo(div, div2);
        appendToBody(div);
    })();

    let endElem = _('#end');

    it('should return the selection itself if selection is not filtered', () => {
        expect(endElem.end()).to.be.equal(endElem);
    });

    it('should revert the previously selected element', () => {
        let endInner = endElem.find('#end-inner');
        expect(endInner.end()).to.be.equal(endElem);
    });
});