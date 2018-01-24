/**
 * traversing-test
 **/

describe('Traversing', () => {
    let traversingList = _('#traversing-list li');

    describe('Closest', () => {
        it('should find the closest parent or returns null', () => {
            let immediateParent = traversingList.closest();
            let secondParent = traversingList.closest('div');
            let nonMatchedParent = traversingList.closest('#not-matched');

            expect(immediateParent.el[0].matches('#traversing-list')).to.be.equal(true);
            expect(secondParent.el[0].matches('#traversing')).to.be.equal(true);
            expect(nonMatchedParent.length).to.be.equal(0);
        });
    });

    describe('Next', () => {
        it('should find the next element sibling', () => {
            let next = traversingList.filter('.apple').next();
            let nextSelector = next.next('.strawberr');

            expect(next.el[0].matches('.banana')).to.be.equal(true);
            expect(nextSelector.length).to.be.equal(0);
        });
    });

    describe('Prev', () => {
        it('should find the prev element sibling', () => {
            let prev = traversingList.filter('.banana').prev();
            let prevSelector = traversingList.filter('.strawberry').prev('.apple');

            expect(prev.el[0].matches('.apple')).to.be.equal(true);
            expect(prevSelector.length).to.be.equal(0);
        });
    });

    describe('First', () => {
        it('should find the first element', () => {
            let first = traversingList.first();

            expect(first.el[0].matches('.apple')).to.be.equal(true);
        });
    });

    describe('Last', () => {
        it('should find the last element', () => {
            let last = traversingList.last();

            expect(last.el[0].matches('.strawberry')).to.be.equal(true);
        });
    });
});