/**
 * manipulation-test
 **/

describe('Attribute Methods', () => {
    let attrElem = _('#attr');
    let attrElemNode = document.querySelector('#attr');

    let paragraphElem = _('#attr-paragraph');
    let anchorElem = _('#attr-anchor');
    let imgElem = _('#attr-img');
    let inputElem = _('#attr-input');
    let spanElem = _('#attr-span');

    describe('attr', () => {
        describe('Gets any attribute value of the selected element', () => {
            it('should get the value of `id` attribute', () => {
                expect(attrElem.attr('id')).to.equal('attr');
                expect(attrElem.attr('id')).to.equal(attrElemNode.id);
            });
        });

        describe('Sets the attribute value of the selected element', () => {
            it('should set a new attribute named `test-attr` with a value of "My Attribute Value"', () => {
                attrElem.attr('test-attr', 'My Attribute Value');
                expect(attrElem.attr('test-attr')).to.equal('My Attribute Value');
            });
        });
    });

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

    describe('src', () => {
        it('should get the value of "src" attribute', () => {
            expect(imgElem.src()).to.equal(controls.src);
        });

        it(`should set the value of "src" attribute to "${controls.newSrc}"`, () => {
            imgElem.src(controls.newSrc);

            expect(imgElem.src()).to.equal(controls.newSrc);
        });
    });

    describe('href', () => {
        it('should get the value of "href" attribute', () => {
            expect(anchorElem.href()).to.equal(controls.href);
        });

        it(`should set the value of "href" attribute to "${controls.newHref}"`, () => {
            anchorElem.href(controls.newHref);

            expect(anchorElem.href()).to.equal(controls.newHref);
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