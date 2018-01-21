/**
 * utils
 **/

/* exported createElementFromString */

// eslint-disable-next-line
const createElementFromString = str => {
    let elementString = str.toString();

    const tagRegex = /([<])?([a-zA-Z]+)/;
    const theTag = elementString.match(tagRegex);
    const attrRegex = /(\S+)=["']?((?:.(?!["']?\s+(?:\S+)=|[>"']))+.)["']?/g;
    const mayHaveAttributes = elementString.match(attrRegex) || [];

    const newElement = document.createElement(theTag[2]);

    mayHaveAttributes.forEach(attr => {
        let singleAttrRegex = /([a-zA-Z-]+)=(?:['"])(.*)(?:['"])/g;
        let theAttr = singleAttrRegex.exec(attr);

        newElement.setAttribute(theAttr[1], theAttr[2]);
    });

    return newElement;
};

// eslint-disable-next-line
const normalizeClassName = className => className.charAt(0) === '.' ? className.substr(1) : className;