/**
 * build
 **/

const gcc = require('google-closure-compiler-js');
const {concat, getContent} = require('./concat');

let flags = {
    jsCode: [],
    warningLevel: 'VERBOSE',
    compilationLevel: 'ADVANCED'
};

const build = () => {
    "use strict";
    concat();
};

const minify = () => {
    const uxr = getContent('dist/uxr.js');

    flags.jsCode.push({
        src: uxr,
        path: 'dist/uxr.js'
    });

    const out = gcc.compile(flags);

    fs.writeFile('dist/uxr.min.js', out.compiledCode, err => {
        if (err) {
            throw err;
        }

        console.info('UXR minified');
    });
};

module.exports = {
    build,
    minify
};