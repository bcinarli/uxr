/**
 * manipulation-test
 **/

describe('Attribute Methods', () => {
    // attribute setup
    (() => {
        let div = createElement('div', {id: 'attr'});
        let anchor = createElement('a', {id: 'attr-anchor', href: controls.href});
        let img = createElement('img', {id: 'attr-img', src: controls.src});

        appendTo(div, [anchor, img]);
        appendToBody(div);
    })();

    let attrElem = _('#attr');
    let attrElemNode = document.querySelector('#attr');

    let anchorElem = _('#attr-anchor');
    let imgElem = _('#attr-img');

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

    describe('removeAttr', () => {
        it('should remove the attribute from element', () => {
           attrElem.removeAttr('test-attr');
           expect(attrElem.attr('test-attr')).to.be.equal(null);
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
});