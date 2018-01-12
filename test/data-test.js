/**
 * data-tests
 **/

describe('Data Manager', () => {
    let dataElem = uxr('#data');
    let dataElem2 = uxr('#data2');
    delete dataElem2.el[0].dataset;
    console.log(typeof dataElem2.el[0].dataset);

    it('should return the value of data-* attribute', () => {
        expect(dataElem.data(controls.dataAttr)).to.equal(controls.dataValue);
    });

    it('should change the value of data-* attribute', () => {
        dataElem.data(controls.dataAttr, controls.newDataValue);
        expect(dataElem.data(controls.dataAttr)).to.equal(controls.newDataValue);
    });

    it('should sets a new data-* attribute', () => {
        dataElem.data(controls.newDataAttr, controls.newDataValue);
        dataElem.data('uxr-empty', '');

        expect(dataElem.data(controls.newDataAttr)).to.equal(controls.newDataValue);
        expect(dataElem.data('uxr-empty')).to.equal('');
    });
});