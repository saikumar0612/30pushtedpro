var Excel = require('exceljs');

      //  create object for workbook
         var inboundWorkbook = new Excel.Workbook();
inboundWorkbook.xlsx.readFile("F:/Jasmine/TestData/department.xlsx").then(function () {
    var inboundWorksheet = inboundWorkbook.getWorksheet(1);
    browser.waitForAngularEnabled(false);

    var totalRowsIncludingEmptyRows = inboundWorksheet.rowCount
    //console.log("total nuumber of rows : "+totalRowsIncludingEmptyRows)
    // loop till end of row
    for (var i = 1; i <= totalRowsIncludingEmptyRows; i++) {
        var cellValue = inboundWorksheet.getRow(i).getCell(i).toString();
      
    }

    global.selectdate = inboundWorksheet.getRow(2).getCell(24).toString();

});


describe('Code for leave period under leave configuration Module', function () {
    browser.ignoreSynchronization = true; // for non-angular websites

    it('Excel File Operations', function () {
        browser.get(browser.params.url);
        // set implicit time to 30 seconds
        browser.manage().window().maximize();
        browser.manage().timeouts().implicitlyWait(30000);

    });

    it('Enter the username', function () {
        var username = element(by.name('userName'));
        //username.sendKeys(browser.params.user_name);
        username.sendKeys(browser.params.user_name);
    });

    it('Enter the password', function () {
        var userpassword = element(by.name('password'));
        //userpassword.sendKeys(browser.params.user_password);
        userpassword.sendKeys(browser.params.user_password);

    });

    it('click on login button', function () {
        var loginBtn = element(by.id('login'));
        loginBtn.click();
        browser.manage().timeouts().implicitlyWait(300000);

    });

    browser.sleep(2000);

    it('Mouse hover adminstration', function () {

        var ele = element(by.xpath('//app-top-menu//div[1]/ul/li[1]/a'));
        browser.actions().mouseMove(ele).perform();

        browser.manage().timeouts().setScriptTimeout(60000);
    });


    it('Mouse hover leave Period', function () {

        var clickleaveconfig = element(by.xpath("//a[contains(text(),'Leave Configuration')]"));
        browser.actions().mouseMove(clickleaveconfig).perform();
       
    });


    it('click on leave Period', function () {
        //code to click on Leave period sub module
        var clickLeaveperiod = element(by.xpath("//a[contains(text(),'Leave Period')]"));
        clickLeaveperiod.click();
        browser.sleep(5000);

    });


    it('click on edit leave Period', function () {
        //click on Edit button
        var clickedit = element(by.linkText('Edit'));
        clickedit.click();

        //code to edit leave period
    });



    it('click on edit Start Date', function () {
        var selectstartdate = element(by.xpath("//input[@id='startDate']"));
        selectstartdate.clear();
        selectstartdate.sendKeys(selectdate);

    });


    it('click on save edit leave Period', function () {
        var clicksave = element(by.buttonText('Save'));
        clicksave.click();
    });



    it('click on verify success message', function () {

        var popup = element(by.xpath("//p[@class='bg-success']")).getText();
        expect(popup.getText()).toEqual(popup);
    });

    it('click on view leave Period', function () {
        var clickviewalll = element(by.xpath("//a[@class='btn btn-success ml-5']"));
        clickviewalll.click();
    });

});