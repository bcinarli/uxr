/**
 * clone-test
 **/

describe('Clone', () => {
    let div = createElement('div', {id: 'clone'});
    let list = createElement('nav', {id: 'clone-list'});
    let link1 = createElement('a', {id: 'clone-link1', innerText: 'Link1'});
    let link2 = createElement('a', {id: 'clone-link2', innerText: 'Link2'});
    let list2 = createElement('nav', {id: 'clone-list2'});
    let link3 = createElement('a', {id: 'clone-link3', innerText: 'Link3'});
    let link4 = createElement('a', {id: 'clone-link4', innerText: 'Link4'});

    appendTo(div, [appendTo(list, [link1, link2]), appendTo(list2, [link3, link4])]);
    appendToBody(div);

    it('should clone the UXR obj elements without children', () => {
        let original = _('#clone-list a');
        let clones = _('#clone-list a').clone();
        clones.addClass('cloned-element').attr('id', '');

        _('#clone-list').append(clones);

        expect(clones.length).to.be.equal(original.length);
        expect(clones[0].innerText).to.be.equal('');
        expect(_('#clone-list .cloned-element').length).to.be.greaterThan(0);
    });

    it('should deep clone the UXR obj elements', () => {
        let original = _('#clone-list2 a');
        let clones = _('#clone-list2 a').clone(true);
        clones.addClass('cloned-element').attr('id', '');

        _('#clone-list2').append(clones);

        expect(clones.length).to.be.equal(original.length);
        expect(clones[0].innerText).to.be.equal(original[0].innerText);
        expect(_('#clone-list2 .cloned-element').length).to.be.greaterThan(0);
    });
});