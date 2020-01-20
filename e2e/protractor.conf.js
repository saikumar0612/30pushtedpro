
var jasmineReporters = require('jasmine-reporters');
var htmlReporter = require('protractor-html-reporter-2');
var fs = require('fs-extra');
var path = require('path');

//console.log(path);
//var Excel = require('exceljs');


exports.config = {

    seleniumAddress: 'http://localhost:4444/wd/hub',

    //capabilities: {
    //    'browserName': 'chrome',
    //    'shardTestFiles': true,
    //    'maxInstances': 2
    //},

    //multiCapabilities: [

      
    // {
    //    'browserName': 'chrome',
    // },
    // {
    //    'browserName': 'firefox',
    //    'moz:firefoxOptions':
    //     {
    //        'args': ['--safe-mode']
    //     }

    //    },

    //    //{
    //    //    'browserName': 'safari',
    //    //},


    //  {
    //        'browserName': 'internet explorer',
    //        'platform': 'ANY',
    //        'version': '11'
    //  }
  
    //],

 specs: ['H:/jenkins/workspace/newproject/e2e/Administration/Job_module/Departments/Add_departmentspec.js'],

    //suites:
    //{
    //    smoke: ['F:/Jasmine/ConfigModule/company_info/companyinfospec.js'],
    //},

    //suites:
    //{
     //  smoke: ['H:/jenkins/workspace/newproject/e2e/Administration/users/usersmodule/usermodulespec.js'],

    //    ,'H:/jenkins/workspace/newproject/e2e/Administration/users/usersmodule/Searchviewusermodulespec.js','H:/jenkins/workspace/newproject/e2e/Administration/users/usersmodule/userrolesaddspec.js','H:/jenkins/workspace/newproject/e2e/Administration/Job_module/Departments/Add_departmentspec.js','H:/jenkins/workspace/newproject/e2e/Administration/Job_module/Departments/Edit_deptspec.js',
    //  'H:/jenkins/workspace/newproject/e2e/Administration/Job_module/Jobtitles/AddjobTitlespec.js','H:/jenkins/workspace/newproject/e2e/Administration/Job_module/Jobtitles/jobtitleresetspec.js','H:/jenkins/workspace/newproject/e2e/Administration/Job_module/Paygrades/addpayspec.js','H:/jenkins/workspace/newproject/e2e/Administration/Job_module/Employment_status/addemployespec.js'


    //  ,'F:/Jasmine/Administration/Job_module/Employee_type/Addemployeetypespec.js','F:/Jasmine/Administration/Job_module/workshifts/Addworkshiftspec.js','F:/Jasmine/Administration/Qualification/skills/addskillspec.js','F:/Jasmine/Administration/Qualification/Memberships/addmembershipspec.js',
    //   'F:/Jasmine/Administration/Qualification/languages/addlanguagespec.js','F:/Jasmine/Administration/leaveconfiguration/leaveperiod/leaveperiodspec.js','F:/Jasmine/Administration/leaveconfiguration/leavetype/leavetypespec.js',
    // 'F:/Jasmine/Administration/leaveconfiguration/LeaveAccruals/leaveaccrualsspec.js','F:/Jasmine/Administration/leaveconfiguration/LeaveEntilements/addleaveEntitlementspec.js'

    //},

    framework: 'jasmine2',
    params:
    {
        url: "https://qa.tedpros.com/",
        user_name: "smlogics",
        user_password: "Pass12!@",
        recuser_name: "S11213",
        url1: "https://tedpros.com",
        teduser_name: "amarendara@gmail.com",
        candidateuser_name: "smlogics57@gmail.com",
        salesuser_name: "S11211",
        gmailusername :"smlogics47@gmail.com",
        gmailurl:"https://accounts.google.com/signin/v2/identifier?service=mail&passive=true&rm=false&continue=https%3A%2F%2Fmail.google.com%2Fmail%2F&ss=1&scc=1&ltmpl=default&ltmplcache=2&emr=1&osid=1&flowName=GlifWebSignIn&flowEntry=ServiceLogin"
    },


    onPrepare: function () {
        // Default window size
        browser.driver.manage().window().maximize();
        // Default implicit wait
        browser.manage().timeouts().implicitlyWait(60000);
        // Angular sync for non angular apps
        browser.ignoreSynchronization = true;

        fs.emptyDir('./reports/xml/', function (err) {
            // console.log(err);
        });

        fs.emptyDir('./reports/screenshots/', function (err) {
            //console.log(err);
        });

        jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
            consolidateAll: true,
            savePath: './reports/xml/',
            filePrefix: 'xmlresults'
        }));




        jasmine.getEnv().addReporter({
            specDone: function (result) {
                //if (result.status == 'failed') {
                browser.getCapabilities().then(function (caps) {
                    var browserName = caps.get('browserName');

                    browser.takeScreenshot().then(function (png) {
                        var stream = fs.createWriteStream('./reports/screenshots/' + browserName + '-' + result.fullName + '.png');
                      
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
                reportTitle: 'Add leaveEntitlement ,Edit leaveEntitlement ,search leaveEntitlement under Leave Configuartion module for Test Execution Report',
                // console.log('dir ', path.join(__dirname, '../../'));
                //outputPath: 'F:/Jasmine/CRM/vendorcompany/reports',
                outputPath: 'H:/tesingpro/30pushtedpro/e2e/reports',
                outputFilename: 'leaveEntitlement Test Execution Report',
                screenshotPath: 'H:/tesingpro/30pushtedpro/e2e/screenshots',
                testBrowser: browserName,
                browserVersion: browserVersion,
                modifiedSuiteName: false,
                screenshotsOnlyOnFailure: false,
                testPlatform: platform
            };
            new htmlReporter().from('./reports/xml/xmlresults.xml', testConfig);
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
        defaultTimeoutInterval: 350000
    }
};

