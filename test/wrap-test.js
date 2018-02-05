/**
 * wrap-test
 **/

describe('Element Wrapping', () => {
    // wrap setup
    (() => {
        let div = createElement('div', {id: 'wrap'});
        let single = createElement('div', {id: 'wrap-single'});
        let singleWithAttr = createElement('div', {id: 'wrap-single-attr'});
        let singleInner = createElement('div', {id: 'wrap-inner', innerHTML: '<div class="wrap-single-inner"></div>'});
        let apple = createElement('li', {innerText: 'Apple'});
        let banana = createElement('li', {innerText: 'Banana'});
        let strawberry = createElement('li', {innerText: 'Strawberry'});

        let singleWrapAll = createElement('div', {id: 'wrap-all', innerHTML: '<span>Hello</span>'});

        appendTo(div, [single, singleWithAttr, singleInner, apple, banana, strawberry, singleWrapAll]);
        appendToBody(div);
    })();

    describe('Single Element Wrap', () => {
        let single = _('#wrap-single');
        let singleAttr = _('#wrap-single-attr');
        let singleInner = _('.wrap-single-inner');

        it('should wrap element with "div"', () => {
            let firstParent = single['0'].parentNode;

            single.wrap('div');

            let newParent = single['0'].parentNode;

            expect(firstParent.matches('#wrap')).to.be.true;
            expect(newParent.matches('#wrap')).to.be.false;
        });

        it('should wrap and replace child if the element is the only child', () => {
            let parent = singleInner['0'].parentNode;
            let length = parent.childNodes.length;
            let child = parent.firstChild.classList.contains('wrap-single-inner');

            singleInner.wrap('<div />');

            let newParent = singleInner['0'].parentNode;
            let newLength = parent.childNodes.length;
            let newChild = parent.firstChild.classList.contains('wrap-single-inner');

            expect(length).to.be.equal(1);
            expect(child).to.be.true;
            expect(newLength).to.be.equal(1);
            expect(newChild).to.be.false;
        });

        it('should wrap element with "div" has a class value "new-wrap" and id value "wrap-id"', () => {
            let firstParent = singleAttr['0'].parentNode;

            singleAttr.wrap('<div class="new-wrap" id="wrap-id">');

            let newParent = singleAttr['0'].parentNode;

            expect(firstParent.matches('#wrap')).to.be.true;
            expect(newParent.matches('#wrap-id')).to.be.true;
            expect(newParent.classList.contains('new-wrap')).to.be.true;
        });
    });

    describe('Multiple Elements Wrap', () => {
        it('should wrap siblings with same parent', () => {
            let list = _("#wrap > li");
            let parent1 = list['0'].parentNode;
            let parent2 = list['1'].parentNode;

            list.wrapAll('ul');

            let oldList = _("#wrap > li");
            let newParent1 = list['0'].parentNode;
            let newParent2 = list['1'].parentNode;

            expect(list).not.to.be.equal(oldList);
            expect(parent1.nodeName.toUpperCase()).to.be.equal('DIV');
            expect(parent2.nodeName.toUpperCase()).to.be.equal('DIV');
            expect(parent1).to.be.equal(parent2);
            expect(newParent1.nodeName.toUpperCase()).to.be.equal('UL');
            expect(newParent2.nodeName.toUpperCase()).to.be.equal('UL');
            expect(newParent1).to.be.equal(newParent2);
        });

        it('should wrap the element even if it is the only child', () => {
            let list = _("#wrap-all > span");
            let parent1 = list['0'].parentNode;

            list.wrapAll('p');

            let oldList = _("#wrap-all > span");
            let newParent1 = list['0'].parentNode;

            expect(list).not.to.be.equal(oldList);
            expect(parent1.nodeName.toUpperCase()).to.be.equal('DIV');
            expect(newParent1.nodeName.toUpperCase()).to.be.equal('P');
        });
    });

    describe('Single Element UnWrap', () => {
        let single = _('#wrap-single');
        let singleAttr = _('#wrap-single-attr');

        it('should unwraps the element', () => {
            let parent = single['0'].parentNode;

            single.unwrap();

            let newParent = single['0'].parentNode;

            expect(parent).not.to.be.equal(newParent);
        });

        it('will not unwrap the element if parent selector is not matched', () => {
            let parent = singleAttr['0'].parentNode;

            singleAttr.unwrap('.not-matching-selector');

            let newParent = singleAttr['0'].parentNode;

            expect(parent).to.be.equal(newParent);
        });
    });
});