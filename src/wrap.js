/**
 * wrap
 **/

/* global createElementFromString */

_.extend.wrap = function (wrapper) {
    let newWrap = createElementFromString(wrapper);

    let parent = this.el[0].parentNode;
    let siblings = this.el[0].nextSibling;

    newWrap.appendChild(this.el[0]);

    if (siblings) {
        parent.insertBefore(newWrap, siblings);
    }
    else {
        parent.appendChild(newWrap);
    }

    return this;
};

_.extend.wrapAll = function (wrapper) {
    let firstSibling = true;
    let newWrap = createElementFromString(wrapper);

    this.el.forEach(item => {
        if (firstSibling) {
            let parent = item.parentNode;
            let siblings = item.nextSibling;

            newWrap.appendChild(item);

            if (siblings) {
                parent.insertBefore(newWrap, siblings);
            }
            else {
                parent.appendChild(newWrap);
            }

            firstSibling = false;
        }

        else {
            newWrap.appendChild(item);
        }
    });

    return this;
};

_.extend.unwrap = function (selector) {
    let parent = this.el[0].parentNode;

    // if the parent is not the desired one, skip unwrapping
    if (selector && !parent.matches(selector.toString())) {
        return this;
    }

    parent.parentNode.appendChild(this.el[0]);

    if (parent.children.length === 0) {
        parent.parentNode.removeChild(parent);
    }

    return this;
};