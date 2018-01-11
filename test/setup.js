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

const createElement = (type, attributes) => {
    let element = document.createElement(type);

    Object.keys(attributes).forEach(key => {
        element[key] = attributes[key];
    });

    return element;
};

const appendTo = (to, elements) => {
    let list = Array.isArray(elements) ? elements : [elements];

    list.forEach(element => to.appendChild(element));
};

const appendToBody = elements => appendTo(document.body, elements);

// attribute setup
(() => {
    let div = createElement('div', {id: 'attr'});
    let paragraph = createElement('p', {id: 'attr-paragraph', innerText: controls.innerText});
    let anchor = createElement('a', {id: 'attr-anchor', href: controls.href});
    let img = createElement('img', {id: 'attr-img', src: controls.src});

    appendTo(div, [paragraph, anchor, img]);
    appendToBody(div);
})();

// manipulation setup