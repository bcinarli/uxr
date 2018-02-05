/**
 * data-tests
 **/

describe('Data Manager', () => {
    // data setup
    (() => {
        let div = createElement('div', {id: 'data'});
        div.setAttribute('data-' + controls.dataAttr, controls.dataValue);

        let div2 = createElement('div', {id: 'data2'});
        div2.setAttribute('data-' + controls.dataAttr, controls.dataValue);

        appendToBody(div);
        appendToBody(div2);
    })();

    let dataElem = _('#data');

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