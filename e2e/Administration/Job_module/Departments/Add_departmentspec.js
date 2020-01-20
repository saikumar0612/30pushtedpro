var Excel = require('exceljs');


var inboundWorkbook = new Excel.Workbook();
inboundWorkbook.xlsx.readFile("H:/jenkins/workspace/newproject/TestData/Testdata.xlsx").then(function () {
    var inboundWorksheet = inboundWorkbook.getWorksheet(1);
    browser.waitForAngularEnabled(false);

    var totalRowsIncludingEmptyRows = inboundWorksheet.rowCount
    //console.log("total nuumber of rows : "+totalRowsIncludingEmptyRows)
    // loop till end of row
    for (var i = 1; i <= totalRowsIncludingEmptyRows; i++) {
        var cellValue = inboundWorksheet.getRow(i).getCell(i).toString();
      
    }

    global.deptname = inboundWorksheet.getRow(2).getCell(16).toString();
    global.editdeptnae = inboundWorksheet.getRow(3).getCell(16).toString();

});




describe('Code for Add department under Job  Module', function () {

    browser.ignoreSynchronization = true; // for non-angular websites


    it('open the browser', function () {
        browser.get(browser.params.url);
        // set implicit time to 30 seconds
        browser.manage().window().maximize();
        browser.manage().timeouts().implicitlyWait(30000);
    });
    // browser.debugger();
    // create object for workbook

    it('Enter the username', function () {
        var username = element(by.name('userName'));
        username.sendKeys(browser.params.user_name);

    });
    it('Enter the password', function () {
        var userpassword = element(by.name('password'));
        userpassword.sendKeys(browser.params.user_password);

    });

    it('click on login button', function () {
        var loginBtn = element(by.id('login'));
        loginBtn.click();
        browser.manage().timeouts().implicitlyWait(300000);

    });

    //code to click on  Qualification module
    it('Hover on administration icon', function () {
        var clickadministration = element(by.xpath("//app-top-menu//div[1]/ul/li[1]/a"));
        browser.actions().mouseMove(clickadministration).perform();
        browser.sleep(2000);

    });
    //code to click on Job Module
    it('click on job', function () {
        var clickjob = element(by.xpath("//ul[@class='main-menu']/li[1]/div[1]/div[3]/ul[1]/li[2]/a[1]"));
        clickjob.click();

    });

    it('click on depatment', function () {

        var clickdepartment = element(by.xpath("//a[contains(text(),'Departments')]"));
        clickdepartment.click();
        browser.sleep(2000);

    });

    it('click on add button', function () {

        var cickadd = element(by.xpath("//a[@id='addjobcategory']"));
        cickadd.click();
        browser.sleep(5000);

    });

    it('enter the department name', function () {

        var enterdeptname = element(by.id('jobName'));
        enterdeptname.sendKeys(deptname);

    });

    it('click on submit ', function () {
        var clicksubmit = element(by.buttonText('Submit'));
        clicksubmit.click();

    });

    it('open the verify the pop up message and click on view button', function () {

        var popup = element(by.xpath("//p[@class='bg-success']")).getText();
        expect(popup.getText()).toEqual(popup);

        var clickpopupmessage = element(by.xpath("//a[@class='btn btn-success ml-5']"));
        //console.log(clickpopupmessage);
        clickpopupmessage.click();
        browser.sleep(5000);

    });


    it('Enter the department under search field', function () {

        var searchname = element(by.xpath("//input[@id='searchname']"));
        searchname.sendKeys(deptname);
        searchname.click();
        expect(searchname.getAttribute('value')).toBe(deptname);
        searchname.clear();
        browser.sleep(1000);


    });

    it('click on icon bar', function () {

        var clickicon = element(by.xpath('//tr[2]//td[2]//a[1]//div[1]//i[1]'));
        clickicon.click();

    });

    it('click on view icon', function () {
        var clickviewicom = element(by.xpath('//tr[2]//td[2]//ul[1]//li[2]//a[1]//button[1]//i[1]'));
        clickviewicom.click();
        browser.sleep(1000);

    });

    it('click edit icon', function () {
        var clickediticon = element(by.xpath("//a[@id='editjobcategories']"));
        clickediticon.click();
        browser.sleep(1000);

    });

    it('Edit department name', function () {
        var editdeptname = element(by.id('jobName'));
        editdeptname.click();
        editdeptname.clear();
        editdeptname.sendKeys(editdeptnae);
        browser.sleep(1000);

    });

    it('click on submit button', function () {

        var clicksubmit = element(by.buttonText('Submit'));
        clicksubmit.click();


    });

    it('open the verify the pop up message and click on view button', function () {

        var popups = element(by.xpath("//p[@class='bg-success']")).getText();
        expect(popups.getText()).toEqual(popups);

        var clickpopupmessages = element(by.xpath("//a[contains(text(),'View all Departments')]"));
        //console.log(clickpopupmessage);
        clickpopupmessages.click();
    });



});
describe('Code for Reset department under Job  Module', function () {
    browser.ignoreSynchronization = true; // for non-angular websites
    it('open the browser', function () {
        browser.get(browser.params.url);
        // set implicit time to 30 seconds
        browser.manage().window().maximize();
        browser.manage().timeouts().implicitlyWait(30000);
    });
    // browser.debugger();


    it('Enter the username', function () {
        var username = element(by.name('userName'));
        username.sendKeys(browser.params.user_name);

    });
    it('Enter the password', function () {
        var userpassword = element(by.name('password'));
        userpassword.sendKeys(browser.params.user_password);

    });

    it('click on login button', function () {
        var loginBtn = element(by.id('login'));
        loginBtn.click();
        browser.manage().timeouts().implicitlyWait(300000);

    });

    //code to click on  Qualification module
    it('Hover on administration icon', function () {
        var clickadministration = element(by.xpath("//app-top-menu//div[1]/ul/li[1]/a"));
        browser.actions().mouseMove(clickadministration).perform();
        browser.sleep(2000);

    });
    //code to click on Job Module
    it('click on job', function () {
        var clickjob = element(by.xpath("//ul[@class='main-menu']/li[1]/div[1]/div[3]/ul[1]/li[2]/a[1]"));
        clickjob.click();

    });

    it('click on depatment', function () {

        var clickdepartment = element(by.xpath("//a[contains(text(),'Departments')]"));
        clickdepartment.click();
        browser.sleep(2000);

    });

    it('click on add button', function () {

        var cickadd = element(by.xpath("//a[@id='addjobcategory']"));
        cickadd.click();
        browser.sleep(5000);

    });

    it('enter the department name', function () {
        var enterdeptname = element(by.id('jobName'));
        enterdeptname.sendKeys(deptname);

        if (!expect(enterdeptname.getAttribute('value')).toEqual(deptname))
        {
            console.log("values are  reset to default values:", deptname);
        }
        else
        {
            console.log("values are reset to default values:", deptname);
        }


    });

    it('click on reset button', function () {


        var clickreset = element(by.buttonText('Reset'));
        clickreset.click();

    });

    it('click on cancel button', function () {

        var clickcanel = element(by.buttonText('Cancel'));
        clickcanel.click();


    });

});

