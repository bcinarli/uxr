/**
 * class-test
 **/

describe('CSS Classes', () => {
    // css-classes setup
    (() => {
        let div = createElement('div', {id: 'css-classes'});
        div.classList.add(controls.className);

        appendToBody(div);
    })();

    let cssElem = _('#css-classes');
    let cssElemNode = document.querySelector('#css-classes');
    let noneElem = _([1,2,3]);

    describe('Add Class', () => {
        it('should add a new class to elements classList', () => {
            cssElem.addClass(controls.newClassName);
            cssElem.addClass('chained-class').addClass('.another-chained-class');

            expect(cssElemNode.classList.contains(controls.newClassName)).to.be.true;
            expect(cssElemNode.classList.contains('chained-class')).to.be.true;
        });
    });

    describe('Add Classes with an array', () => {
       it('should add class from array list', () => {
          cssElem.addClass(['array', 'of', 'classnames']);

           expect(cssElemNode.classList.contains('array')).to.be.true;
           expect(cssElemNode.classList.contains('of')).to.be.true;
           expect(cssElemNode.classList.contains('classnames')).to.be.true;
       });
    });

    describe('Remove Class', () => {
        it('should remove a new class to elements classList', () => {
            cssElem.removeClass(controls.newClassName);
            cssElem.removeClass('.chained-class').removeClass('another-chained-class');

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
            cssElem.toggleClass(controls.className).addClass('chained');
            expect(cssElem.hasClass(controls.className)).to.be.false;
            cssElem.toggleClass(controls.className);
            expect(cssElem.hasClass(controls.className)).to.be.true;
            expect(cssElem.hasClass('chained')).to.be.true;

            noneElem.toggleClass(controls.className);
            expect(noneElem.hasClass(controls.className)).to.be.false;
        });
    });
});