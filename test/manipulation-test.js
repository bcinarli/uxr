/**
 * manipulation-test
 **/

describe('Manipulation Methods', () => {
    let manipulationElem = uxr('#manipulation');

    describe('Empty', () => {
        manipulationElem.empty();

        expect(manipulationElem.html()).to.be.equal('');
    });

    describe('Remove', () => {
        manipulationElem.remove();

        expect(uxr('#manipulation').length).to.be.equal(0);
    });
});