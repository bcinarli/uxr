/**
 * css-test
 **/

describe('CSS', () => {
    let css = _('#css-test, #css-test2');
    it('should return the value of CSS property', () => {
        let display = css.css('display');
        let marginTop = css.css('margin-top');
        let marginTopAlt = css.css('marginTop');

        expect(display).to.be.equal(css.el[0].style.display);
        expect(marginTop).to.be.equal(css.el[0].style.marginTop);
        expect(marginTopAlt).to.be.equal(css.el[0].style.marginTop);
    });

    it('should return the value of list of CSS property', () => {
        let properties = css.css(['display', 'margin-top', 'color']);

        expect(properties.display).to.be.equal(css.el[0].style.display);
        expect(properties.marginTop).to.be.equal(css.el[0].style.marginTop);
        expect(properties.color).to.be.equal(css.el[0].style.color);
    });

    it('should update the value of CSS property', () => {
        css.css('padding', '10px');

        css.el.forEach(elm => {
            expect(elm.style.padding).to.be.equal('10px');
        });
    });

    it('should update the set of CSS properties', () => {
        css.css({width: '100px', height: '50px', 'margin-bottom': '5px'});

        expect(css[0].style.width).to.be.equal('100px');
        expect(css[0].style.height).to.be.equal('50px');
        expect(css[0].style.marginBottom).to.be.equal('5px');
    });
});