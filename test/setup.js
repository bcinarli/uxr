/**
 * setup
 **/

let controls = {
    innerText: 'Hello World!',
    newInnerText: 'New innerText Value',
    innerHTML: 'Hello <strong>new</strong> World!',
    newInnerHTML: 'Hello <strong>to you</strong> too!',
    href: 'https://uxrocket.io/',
    newHref: 'https://github.com/uxrocket',
    src: 'https://avatars1.githubusercontent.com/u/9591419',
    newSrc: 'https://uxrocket.io/dummy.jpg',
    value: 'Hello World!',
    newValue: 'New input value',
    className: 'my-class',
    newClassName: 'my-new-class',
    missingClassName: 'my-missing-class',
    dataAttr: 'uxr-demo',
    dataValue: 'uxr-data',
    newDataAttr: 'uxr-new',
    newDataValue: 'uxr-defined-data'
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
    let input = createElement('input', {id: 'attr-input', type: 'text', value: controls.value});
    let span = createElement('span', {id: 'attr-span', innerHTML: controls.innerHTML});

    appendTo(div, [paragraph, anchor, img, input, span]);
    appendToBody(div);
})();

// css-classes setup
(() => {
    let div = createElement('div', {id: 'css-classes'});
    div.classList.add(controls.className);

    appendToBody(div);
})();

// data setup
(() => {
    let div = createElement('div', {id: 'data'});
    div.setAttribute('data-' + controls.dataAttr, controls.dataValue);

    let div2 = createElement('div', {id: 'data2'});
    div2.setAttribute('data-' + controls.dataAttr, controls.dataValue);

    appendToBody(div);
    appendToBody(div2);
})();

// end setup
(() => {
    let div = createElement('div', {id: 'end'});
    let div2 = createElement('div', {id: 'end-inner'});


    appendTo(div, div2);
    appendToBody(div);
})();

// event test
(() => {
    let div = createElement('div', {id: 'event'});
    let input = createElement('input', {id: 'event-input', type: 'text'});
    let p = createElement('p', {id: 'event-paragraph', innerHTML: '<a href="#">test</a>>'});


    appendTo(div, [input, p]);
    appendToBody(div);
})();

// manipulation setup
(() => {
    let div = createElement('div', {id: 'manipulation', innerHTML: '<p>Hello World</p>'});

    appendToBody(div);
})();