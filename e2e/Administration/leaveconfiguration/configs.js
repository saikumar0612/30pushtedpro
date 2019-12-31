//var HtmlReporter = require('protractor-beautiful-reporter');
//exports.config = {
//    directConnect: true,
//    capabilities: {
//        'browserName': 'chrome',
//        'shardTestFiles': true,
//        'maxInstances': 5
//    },

//    framework: 'jasmine',
//    seleniumAddress: 'http://localhost:4444/wd/hub',
//    specs: ['clientcompanyspec.js', 'clientcompanysearchspec.js', 'Addanotherclientspec.js', 'Clientresetspec.js','editclientcompanyspec.js'
//    ],
//    jasmineNodeOpts: {
//        defaultTimeoutInterval: 2500000
//    },

//    onPrepare: function () {
//        // Add a screenshot reporter and store screenshots to `/tmp/screenshots`:
//        jasmine.getEnv().addReporter(new HtmlReporter({
//            baseDirectory: 'protractorReports/screenshots'
//        }).getJasmine2Reporter());
//    }

//}

exports.config = {
    framework: 'jasmine',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['Assignleavespec.js'],

    params:
    {
        url: "http://162.254.209.129:4204",
        user_name: "admin",
        user_password: "Pass12!@"
    },
    jasmineNodeOpts: {
        defaultTimeoutInterval: 2500000
    },
    //plugins: [{
    //    package: 'jasmine2-protractor-utils',
    //    disableHTMLReport: false,
    //    disableScreenshot: false,
    //    //screenshotPath: 'F:/Jasmine/CRM/ClientCompany/reports/screenshots',
    //    screenshotOnExpectFailure: true,
    //    screenshotOnSpecFailure: true,
    //    clearFoldersBeforeTest: true,
    //  //  htmlReportDir: 'F:/Jasmine/CRM/ClientCompany/reports/htmlReports',
    //    failTestOnErrorLog: {
    //        failTestOnErrorLogLevel: 900,
    //        excludeKeywords: ['keyword1', 'keyword2']
    //    }
    //    }],


    onPrepare: function () {
        //// Add a screenshot reporter and store screenshots to `/tmp/screenshots`:
        //jasmine.getEnv().addReporter(new HtmlReporter({
        //    baseDirectory: 'protractorReports/screenshots'
        //}).getJasmine2Reporter());


        //protractor html reporter2

        var jasmineReporters = require('F:/Jasmine/node_modules/jasmine-reporters');
        jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
            consolidateAll: true,
            savePath: './',
            filePrefix: 'xmlresults'
        }));



    },

    //In exports.config put this:
    //plugins: [{
    //    package: 'jasmine2-protractor-utils',
    //    disableHTMLReport: true,
    //    disableScreenshot: false,
    //   // screenshotPath: './screenshots',
    //    screenshotOnExpectFailure: false,
    //    screenshotOnSpecFailure: true,
    //    clearFoldersBeforeTest: true
    //}],

    //HTMLReport called once tests are finished
    //onComplete: function () {
    //    var browserName, browserVersion;
    //    var capsPromise = browser.getCapabilities();

    //    capsPromise.then(function (caps) {
    //        browserName = caps.get('browserName');
    //        browserVersion = caps.get('version');
    //        platform = caps.get('platform');

    //        var HTMLReport = require('protractor-html-reporter-2');

    //        testConfig = {
    //            reportTitle: 'Protractor Test Execution Report',
    //            outputPath: './',
    //            outputFilename: 'ProtractorTestReport',
    //            screenshotPath: './screenshots',
    //            testBrowser: browserName,
    //            browserVersion: browserVersion,
    //            modifiedSuiteName: false,
    //            screenshotsOnlyOnFailure: true,
    //            testPlatform: platform
    //        };
    //        new HTMLReport().from('xmlresults.xml', testConfig);
    //    });
    //}



}
