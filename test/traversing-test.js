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

    describe('Parent', () => {
        it('should get the parent or checks if parent matches the selector', () => {
            let parent = traversingList.parent();
            let parentSelector = traversingList.parent('.parent');
            let parentSelectorMatched = traversingList.parent('#traversing-list');

            expect(parent.el[0].matches('#traversing-list')).to.be.equal(true);
            expect(parentSelector.length).to.be.equal(0);
            expect(parentSelectorMatched[0].matches('#traversing-list')).to.be.equal(true);
        });
    });

    describe('Children', () => {
        it('should get the children of selected elements or filter the children', () => {
            let list = _('#traversing-list');
            let children = list.children();
            let childrenSelector = list.children('div');
            let childrenSelectorMatched = list.children('.apple');

            expect(children.length).to.be.equal(3);
            expect(childrenSelector.length).to.be.equal(0);
            expect(childrenSelectorMatched.length).to.be.equal(1);
        });
    });

    describe('Siblings', () => {
        it('should get the siblings of selected elements or filter the siblings', () => {
           let banana = _('#traversing-list .banana');
           let siblings = banana.siblings();
           let siblingsSelector = banana.siblings('.banana');
           let siblingsSelectorMatched = banana.siblings('.apple');

            expect(siblings.length).to.be.equal(2);
            expect(siblingsSelector.length).to.be.equal(0);
            expect(siblingsSelectorMatched.length).to.be.equal(1);
        })
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