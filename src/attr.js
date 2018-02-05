/**
 * attr
 **/

_.extend.attr = function (attr, value) {
    if (value) {
        this.el.forEach(item => item[attr] = value);

        return this;
    }

    return this.el[0][attr];
};

_.extend.text = function (txt) {
    return this.attr('innerText', txt);
};

_.extend.html = function (html) {
    return this.attr('innerHTML', html);
};

_.extend.src = function (url) {
    return this.attr('src', url);
};

_.extend.href = function (url) {
    return this.attr('href', url);
};

_.extend.value = function (value) {
    return this.attr('value', value);
};