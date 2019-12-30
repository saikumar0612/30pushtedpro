
var jasmineReporters = require('jasmine-reporters');
var htmlReporter = require('protractor-html-reporter-2');
var fs = require('fs-extra');

exports.config = {
	
    seleniumAddress: 'http://localhost:4444/wd/hub',
    //specs: ['spec.js'],
    capabilities: {
        'browserName': 'chrome',
        'shardTestFiles': true,
        'maxInstances': 2
    },


    //specs: ['addvendorspec.js','Addanothervendorspec'],
    suites:
    {
        one: 'spec.js',
        two: 'spec1.js'
    },

    framework: 'jasmine2',

    onPrepare: function () {
        // Default window size
        browser.driver.manage().window().maximize();
        // Default implicit wait
        browser.manage().timeouts().implicitlyWait(60000);
        // Angular sync for non angular apps
        browser.ignoreSynchronization = true;

        fs.emptyDir('F:/Jasmine/protractor-html-reporter-2-master/reports/xml/', function (err) {
            console.log(err);
        });

        fs.emptyDir('F:/Jasmine/protractor-html-reporter-2-master/reports/screenshots/', function (err) {
            console.log(err);
        });

        jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
            consolidateAll: true,
            savePath: 'F:/Jasmine/protractor-html-reporter-2-master/reports/xml/',
            filePrefix: 'xmlresults'
        }));

        jasmine.getEnv().addReporter({
            specDone: function (result) {
                //if (result.status == 'failed') {
					browser.getCapabilities().then(function (caps) {
						var browserName = caps.get('browserName');

						browser.takeScreenshot().then(function (png) {
                            var stream = fs.createWriteStream('F:/Jasmine/protractor-html-reporter-2-master/reports/screenshots/' + browserName + '-' + result.fullName + '.png');
							stream.write(new Buffer(png, 'base64'));
							stream.end();
						});
					});
                //}
            }
        });
    },

    onComplete: function () {
        var browserName, browserVersion;
        var capsPromise = browser.getCapabilities();

        capsPromise.then(function (caps) {
            browserName = caps.get('browserName');
            browserVersion = caps.get('version');
            platform = caps.get('platform');

            testConfig = {
                reportTitle: 'Protractor Test Execution Report',
                outputPath: 'F:/Jasmine/protractor-html-reporter-2-master/reports/',
                outputFilename: 'ProtractorTestReport',
                screenshotPath: 'F:/Jasmine/protractor-html-reporter-2-master/screenshots',
                testBrowser: browserName,
                browserVersion: browserVersion,
                modifiedSuiteName: false,
                screenshotsOnlyOnFailure: false,
                testPlatform: platform
            };
            new htmlReporter().from('F:/Jasmine/protractor-html-reporter-2-master/reports/xml/xmlresults.xml', testConfig);
        });
    },

    allScriptsTimeout: 120000,
    getPageTimeout: 120000,
    maxSessions: 1,

    // Options to be passed to Jasmine-node.
    jasmineNodeOpts: {
        onComplete: null,
        // If true, display spec names.
        isVerbose: false,
        // If true, print colors to the terminal.
        showColors: true,
        // If true, include stack traces in failures.
        includeStackTrace: true,
        // Default time to wait in ms before a test fails.
        defaultTimeoutInterval: 120000
    }
};
