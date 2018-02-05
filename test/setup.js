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

    if (attributes) {
        Object.keys(attributes).forEach(key => {
            if (typeof attributes[key] === 'object' && !Array.isArray(attributes[key])) {
                Object.keys(attributes[key]).forEach(prop => {
                    element[key][prop] = attributes[key][prop];
                });
            }
            else {
                element[key] = attributes[key];
            }
        });
    }

    return element;
};

const appendTo = (to, elements) => {
    let list = Array.isArray(elements) ? elements : [elements];

    list.forEach(element => to.appendChild(element));

    return to;
};

const appendToBody = elements => appendTo(document.body, elements);