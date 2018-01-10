/**
 * karma config
 */

const karmaConfig = config =>
    config.set({
        frameworks: ['mocha', 'chai'],
        files: ['dist/uxr.js', 'test/setup.js', 'test/**/*-test.js'],
        reporters: ['mocha', 'coverage'],
        preprocessors: {
            'src/**/*.js': ['coverage'],
            'dist/uxr.js': ['coverage']
        },
        coverageReporter: {
            reporters: [
                {type: 'text-summary'},
                {type: 'lcovonly', subdir: '.'},
                {type: 'json', subdir: '.'}
            ]
        },
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        browsers: ['ChromeHeadless'],
        autoWatch: false,
        concurrency: Infinity,
        singleRun: true
    });

module.exports = karmaConfig;