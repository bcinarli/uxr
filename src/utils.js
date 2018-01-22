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

// generate hashes for internal usage
// eslint-disable-next-line
const hashCode = s => s.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
}, 0);

// trims the string and replaces to multiple spaces in the string with single space
// eslint-disable-next-line
const justifyString = s => s.replace(/\s\s+/g, ' ').trim();

// split selector
// eslint-disable-next-line
const maybeMultiple = s => typeof s === 'string' ? justifyString(s).split(' ') : s;

// Dom String Format
// eslint-disable-next-line
const toDomString = s => s.substr(0, 1).toLowerCase() + s.split('-').map(chunk => chunk.charAt(0).toUpperCase() + chunk.slice(1)).join('').substring(1);

// Element from string
// eslint-disable-next-line
const elementFromString = s => {
    if (typeof s === 'string') {
        let template = document.createElement('template');
        template.innerHTML = s.trim();

        return template.content.firstChild;
    }

    return s;
};

// Insertable Element
// eslint-disable-next-line
const getInsertableElement = s => {
    let insertableElement = elementFromString(s);

    if (insertableElement instanceof uxr) {
        insertableElement = insertableElement.el[0];
    }

    return insertableElement;
};

// InserBefore
// eslint-disable-next-line
const insertBefore = (insert, target, ref, parent) => {
    let to = parent === true ? target.parentNode : target;
    let where = ref === 'self' ? target : target[ref];

    to.insertBefore(getInsertableElement(insert), where);
};