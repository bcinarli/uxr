/**
 * build
 **/

const gcc = require('google-closure-compiler-js');
const {concat, getContent} = require('./concat');
const {info, performance} = require('./logger');

let flags = {
    jsCode: [],
    warningLevel: 'VERBOSE',
    compilationLevel: 'ADVANCED'
};

const release = () => {
    concat({release: true});
    minify();
};

const build = () => {
    performance('Build');
    info('Starting to build...');

    concat();

    info('All source files concatenated and wrapped in IIFE!');
    performance('Build');
};

const minify = () => {
    performance('Minification');
    info('Starting to minify...');

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

        info('Minification Complete!');
        performance('Minification');
    });
};

module.exports = {
    release,
    build,
    minify
};