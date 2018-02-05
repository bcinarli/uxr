/**
 * dimensions-test
 **/

describe('Dimensions', () => {
    // dimensions setup
    (() => {
        let div = createElement('div', {id: 'dimensions'});
        let widthTest = createElement('div', {id: 'dim-width', innerText: 'Hello World'});
        let widthTest2 = createElement('div', {
            id: 'dim-width2',
            innerText: 'Hello World',
            style: {width: '50%', padding: '10px', border: '5px solid'}
        });
        let widthTest3 = createElement('ul', {id: 'dim-width3'});
        let widthTest3Li = createElement('li', {style: {width: '500px', padding: '5px', margin: '10px'}});
        let widthTest3Li2 = createElement('li');

        appendTo(div, [widthTest, widthTest2, appendTo(widthTest3, [widthTest3Li, widthTest3Li2])]);

        appendToBody(div);
    })();

    describe('Width', () => {
        it('should return the first elements content width without padding', () => {
            let width = _('#dim-width3 li').width();
            let width_false = _('#dim-width3 lil').width();

            expect(width).to.be.equal(500);
            expect(width_false).to.be.equal(false);
        });

        it('should set the content width', () => {
            let width = _('#dim-width3 li:first-child').width('40%');

            expect(width.width()).to.be.equal(width[0].clientWidth - 10);
        });
    });

    describe('Inner Width', () => {
        it('should return the first elements clientWidth', () => {
            let width = _('#dim-width3 li').innerWidth();
            let width_false = _('#dim-width3 lil').innerWidth();

            expect(width).to.be.equal(_('#dim-width3 li:first-child')[0].clientWidth);
            expect(width_false).to.be.equal(false);
        });
    });

    describe('Outer Width', () => {
        it('should return the first elements offsetWidth', () => {
            let width = _('#dim-width3 li').outerWidth();
            let width_false = _('#dim-width3 lil').outerWidth();

            expect(width).to.be.equal(_('#dim-width3 li:first-child')[0].offsetWidth);
            expect(width_false).to.be.equal(false);
        });

        it('should return the first elements offsetWidth including margins', () => {
            let width = _('#dim-width3 li').outerWidth(true);

            expect(width).to.be.equal(_('#dim-width3 li:first-child')[0].offsetWidth + 20);
        });
    });

    describe('Height', () => {
        it('should return the first elements content height without padding', () => {
            let height = _('#dim-width3 li').height();
            let height_false = _('#dim-width3 lil').height();

            expect(height).to.be.equal(_('#dim-width3 li')[0].clientHeight - 10);
            expect(height_false).to.be.equal(false);
        });

        it('should set the content height', () => {
            let height = _('#dim-width3 li:first-child').height('100px');

            expect(100).to.be.equal(height[0].clientHeight - 10);
        });
    });

    describe('Inner Height', () => {
        it('should return the first elements clientHeight', () => {
            let height = _('#dim-width3 li').innerHeight();
            let height_false = _('#dim-width3 lil').innerHeight();

            expect(height).to.be.equal(_('#dim-width3 li:first-child')[0].clientHeight);
            expect(height_false).to.be.equal(false);
        });
    });

    describe('Outer Height', () => {
        it('should return the first elements offsetHeight', () => {
            let height = _('#dim-width3 li').outerHeight();
            let height_false = _('#dim-width3 lil').outerHeight();

            expect(height).to.be.equal(_('#dim-width3 li:first-child')[0].offsetHeight);
            expect(height_false).to.be.equal(false);
        });

        it('should return the first elements offsetHeight including margins', () => {
            let height = _('#dim-width3 li').outerHeight(true);

            expect(height).to.be.equal(_('#dim-width3 li:first-child')[0].offsetHeight + 20);
        });
    });
});