/**
 * prop-test
 **/

describe('Prop', () => {
    // prop setup
    (() => {
        let div = createElement('div', {id: 'prop'});
        let paragraph = createElement('p', {id: 'prop-paragraph', innerText: controls.innerText});
        let input = createElement('input', {id: 'prop-input', type: 'text', value: controls.value});
        let span = createElement('span', {id: 'prop-span', innerHTML: controls.innerHTML});

        appendTo(div, [paragraph, input, span]);
        appendToBody(div);
    })();

    let paragraphElem = _('#prop-paragraph');
    let inputElem = _('#prop-input');
    let spanElem = _('#prop-span');

    describe('text', () => {
        it('should get the text in the selected element', () => {
            expect(paragraphElem.text()).to.be.a('string');
            expect(paragraphElem.text()).to.equal(controls.innerText);
        });

        it(`should set the text in the selected element to "${controls.newInnerText}"`, () => {
            paragraphElem.text(controls.newInnerText);

            expect(paragraphElem.text()).to.be.a('string');
            expect(paragraphElem.text()).to.equal(controls.newInnerText);
        });
    });

    describe('html', () => {
        it('should get the innerHTML of the selected element', () => {
            expect(spanElem.html()).to.equal(controls.innerHTML);
        });

        it(`should set the innerHTML of the selected element to "${controls.newInnerHTML}`, () => {
            spanElem.html(controls.newInnerHTML);

            expect(spanElem.html()).to.equal(controls.newInnerHTML);
        });
    });

    describe('value', () => {
        it('should get the value of an input', () => {
            expect(inputElem.value()).to.equal(controls.value);
        });

        it(`should set the value of an input element to "${controls.newValue}"`, () => {
            inputElem.value(controls.newValue);

            expect(inputElem.value()).to.equal(controls.newValue);
        });
    });
});