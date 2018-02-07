/**
 * filter-test
 **/

describe('Filter Methods', () => {
    describe('Not', () => {
        it('should return a subset of non-matching elements', () => {
            let list = _('#traversing-list li');
            let notApples = list.not('.apple').addClass('.not-apples');

            expect(notApples.length).to.be.equal(_('#traversing-list .not-apples').length);
            expect(notApples.el).to.deep.equal(_('#traversing-list .not-apples').el);
        });
    });
});