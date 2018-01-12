/**
 * class-test
 **/

describe('CSS Classes', () => {
    let cssElem = uxr('#css-classes');
    let cssElemNode = document.querySelector('#css-classes');
    let noneElem = uxr([1,2,3]);

    describe('Add Class', () => {
        it('should add a new class to elements classList', () => {
            cssElem.addClass(controls.newClassName);

            expect(cssElemNode.classList.contains(controls.newClassName)).to.be.true;
        });
    });

    describe('Remove Class', () => {
        it('should remove a new class to elements classList', () => {
            cssElem.removeClass(controls.newClassName);

            expect(cssElemNode.classList.contains(controls.newClassName)).to.be.false;
        });
    });

    describe('Has Class', () => {
        it('should check selected element whether has the css class or not ', () => {
            expect(cssElem.hasClass(controls.className)).to.be.true;
            expect(cssElem.hasClass(controls.missingClassName)).to.be.false;
        });
    });

    describe('Toggle Class', () => {
        it('should check toggles a css class from element. Adds the class if not present, removes it otherwise', () => {
            cssElem.toggleClass(controls.className);
            expect(cssElem.hasClass(controls.className)).to.be.false;
            cssElem.toggleClass(controls.className);
            expect(cssElem.hasClass(controls.className)).to.be.true;

            noneElem.toggleClass(controls.className);
            expect(noneElem.hasClass(controls.className)).to.be.false;
        });
    });
});