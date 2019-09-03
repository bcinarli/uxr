/**
 * build
 **/

const ClosureCompiler = require('google-closure-compiler').jsCompiler;
const {concat, getContent} = require('./concat');
const {info, performance} = require('./logger');

const flags = {
    warning_level: 'VERBOSE',
    compilation_level: 'ADVANCED'
};

const release = () => {
    concat({release: true});
    minify();
};

const build = () => {
    //performance('Build');
    info('Starting to build...');

    concat();

    info('All source files concatenated and wrapped in IIFE!');
    //performance('Build');
};

const minify = () => {
    //performance('Minification');
    info('Starting to minify...');

    const uxr = getContent('dist/uxr.js');

    const closureCompiler = new ClosureCompiler(flags)

    closureCompiler.run([
        {
            src: uxr,
            path: 'dist/uxr.js'
        }
    ], (exitCode, stdOut, stdErr) => {
        fs.writeFile('dist/uxr.min.js', stdOut[0].src, 'UTF8', error => {
            if (error) {
                throw error;
            }

            info('Minification Complete!');
            //performance('Minification');
        });
    });
};

module.exports = {
    release,
    build,
    minify
};