/**
 * Concat files
 **/

const fs = require('fs');
const path = require('path');
const encoding = 'utf-8';

// add the base.js as the first
const entry = path.join('src', 'base.js');
const sourcePath = 'src';
const distPath = 'dist';

const concat = async (opts = {}) => {
    let name = opts.name || 'uxr.js';
    let files = opts.src || [sourcePath];
    let dist = opts.dist || distPath;

    if (!files.includes(entry)) {
        files.unshift(entry);
    }

    const contents = getContents(files);

    fs.writeFileSync(path.join(dist, name), wrapIIFE(contents.join('\n')), encoding);
};

const getContents = files => {
    let contents = [];
    files.forEach(file => {
        if (fs.lstatSync(file).isFile()) {
            contents.push(getContent(file));
        }

        else {
            contents = contents.concat(getContents(getFileList(file)));
        }
    });

    return contents;
};

const getFileList = dir => fs.readdirSync(dir, encoding).map(file => path.join(dir, file)).filter(file => file !== entry);

const getContent = (file, dir = '') => fs.readFileSync(path.join(dir, file), encoding);

const wrapIIFE = string => ['(function(){', string, '})();'].join('\n');

module.exports = {
    concat,
    getContent
};
