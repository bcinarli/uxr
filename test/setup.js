/**
 * setup
 **/

let controls = {
    innerText: 'Hello World!',
    newInnerText: 'New innerText Value',
    href: 'https://uxrocket.io/',
    newHref: 'https://github.com/uxrocket',
    src: 'https://avatars1.githubusercontent.com/u/9591419',
    newSrc: 'https://uxrocket.io/dummy.jpg'
};

(() => {
    let div = document.createElement('div');
    let paragraph = document.createElement('p');
    let anchor = document.createElement('a');
    let img = document.createElement('img');

    div.id = 'attr';

    paragraph.id = 'attr-paragraph';
    paragraph.innerText = controls.innerText;

    anchor.id = 'attr-anchor';
    anchor.href = controls.href;

    img.id = 'attr-img';
    img.src = controls.src;

    div.appendChild(paragraph);
    div.appendChild(anchor);
    div.appendChild(img);

    document.body.appendChild(div);
})();