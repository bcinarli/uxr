/**
 * logger
 **/

const {performance} = require('perf_hooks');
const colors = {
    black: '\x1b[30m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m'
};

const measures = [];

const clearPerf = name => {
    let start = name;
    let end = `${name}_end`;
    let measure = `${name} start to ${name} end`;

    performance.clearMarks(start);
    performance.clearMarks(end);
    performance.clearMeasures(measure);

    measures.splice(measures.indexOf(name), 1);
};

const perf = name => {
    if (measures.includes(name)) {
        performance.mark(`${name}_end`);
        performance.measure(`${name} start to ${name} end`, name, `${name}_end`);
        let measure = performance.getEntriesByName(`${name} start to ${name} end`)[0];
        log(`${name} Done in ${(measure.duration/1000).toFixed(2)}s.`);

        clearPerf(name);
    }

    else {
        performance.mark(name);
        measures.push(name);
    }
};

const logger = (...arg) => {
    console.log(...arg);
};

const logColor = (color, ...msg) => {
    logger(`${colors[color]}[UXR]`, ...msg, '\x1b[0m');
};

const info = (...msg) => {
    logColor('blue', ...msg);
};

const success = (...msg) => {
    logColor('green', ...msg);
};

const error = (...msg) => {
    logColor('red', ...msg);
};

const log = (...msg) => {
    logger('[UXR]', ...msg);
};

module.exports = {
    log,
    info,
    error,
    success,
    performance: perf
};