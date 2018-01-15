/**
 * karma config
 */

const karmaConfig = config =>
    config.set({
        frameworks: ['mocha', 'chai'],
        files: ['src/base.js', 'src/**/*.js', 'test/setup.js', 'test/base-test.js', 'test/**/*-test.js'],
        reporters: ['mocha', 'coverage'],
        preprocessors: {
            'src/**/*.js': ['coverage']
        },
        coverageReporter: {
            reporters: [
                {type: 'text-summary'},
                {type: 'html', subdir: '.'},
                {type: 'lcovonly', subdir: '.'},
                {type: 'json', subdir: '.'}
            ]
        },
        logLevel: config.LOG_INFO,
        browsers: ['ChromeHeadless', 'TravisChrome'],
        customLaunchers: {
            TravisChrome: {
                base: 'ChromeHeadless',
                flags: ['--no-sandbox', '--disable-translate',
                    '--disable-extensions', '--no-first-run',
                    '--disable-background-networking', '--remote-debugging-port=9223']
            }
        },
        autoWatch: false
    });

module.exports = karmaConfig;