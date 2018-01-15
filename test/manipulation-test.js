/**
 * manipulation-test
 **/

describe('Manipulation Methods', () => {
    let manipulationElem = _('#manipulation');

    describe('Empty', () => {
        manipulationElem.empty();

        expect(manipulationElem.html()).to.be.equal('');
    });

    describe('Remove', () => {
        manipulationElem.remove();

        expect(_('#manipulation').length).to.be.equal(0);
    });
});