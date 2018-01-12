/**
 * base-test
 **/

describe('Constructor', () => {
    let objSelector = uxr([1, 2, 3]);
    let emptySelector = uxr({});

    it('should equal to selector if selector is an object', () => {
        expect(objSelector.el.toString()).to.equal(objSelector.selector.toString());
    });

    it('should return and empty array if selector is not matched', () => {
        emptySelector.el.length.should.equal(0);
    });

    it('should return hash as "0"', () => {
       uxr.internal.hashCode('').should.equal(0);
    });
});