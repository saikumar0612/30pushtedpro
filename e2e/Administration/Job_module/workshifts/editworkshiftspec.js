var Excel = require('exceljs');


var inboundWorkbook = new Excel.Workbook();
inboundWorkbook.xlsx.readFile("F:/Jasmine/TestData/Module.xlsx").then(function () {
    var inboundWorksheet = inboundWorkbook.getWorksheet(1);
    browser.waitForAngularEnabled(false);

    var totalRowsIncludingEmptyRows = inboundWorksheet.rowCount
    //console.log("total nuumber of rows : "+totalRowsIncludingEmptyRows)
    // loop till end of row
    for (var i = 1; i <= totalRowsIncludingEmptyRows; i++) {
        var cellValue = inboundWorksheet.getRow(i).getCell(i).toString();

    }

    global.editshiftnames = inboundWorksheet.getRow(3).getCell(39).toString();
    global.editstarthourss = inboundWorksheet.getRow(3).getCell(40).toString();
    global.editstartminutess = inboundWorksheet.getRow(3).getCell(41).toString();
    global.editstartehourss = inboundWorksheet.getRow(3).getCell(42).toString();
    global.editstarteminutess = inboundWorksheet.getRow(3).getCell(43).toString();
    global.editassignemployee = inboundWorksheet.getRow(3).getCell(44).toString();
    global.editfromday = inboundWorksheet.getRow(3).getCell(45).toString();
    global.edittoday = inboundWorksheet.getRow(3).getCell(46).toString();
    global.edittotalday = inboundWorksheet.getRow(3).getCell(47).toString();
});




describe('Code for Edit work shifts under Job  Module', function () {

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

    it('click on work shifts', function () {

        var clickworkshifts = element(by.xpath("//a[contains(text(),'Work Shifts')]"));
        clickworkshifts.click();
        browser.sleep(2000);

    });


    it('click on icon bar', function () {

        var clickicon = element(by.xpath('//tr[2]//td[2]//a[1]//div[1]//i[1]'));
        clickicon.click();

    });

    it('click on Edit icon', function () {
        var clickedit = element(by.xpath('//tr[2]//td[2]//div[1]//ul[1]//li[2]//a[1]//button[1]'));
        clickedit.click();
        browser.sleep(1000);

    });


   
    

    it('Edit the shift name', function () {

        var editshiftname = element(by.name('shiftName'));
        editshiftname.click();
        editshiftname.clear();
        editshiftname.sendKeys(editshiftnames);

    });

    it('code to enter hours under  the start hours', function () {

        var enterhours = element(by.xpath("//ngb-timepicker[@name='startTime']//input[@placeholder='HH']"));
        enterhours.click();
        enterhours.clear();
        enterhours.sendKeys(editstarthourss);

    });

    it('code to enter minutes under  the start hours', function () {

        var enterminhrs = element(by.xpath("//ngb-timepicker[@name='startTime']//input[@placeholder='MM']"));
        enterminhrs.click();
        enterminhrs.clear();
        enterminhrs.sendKeys(editstartminutess);

    });

    it('code to enter hours under  the End hours', function () {

        var enterendhours = element(by.xpath("//ngb-timepicker[@name='endTime']//input[@placeholder='HH']"));
        enterendhours.click();
        enterendhours.clear();
        enterendhours.sendKeys(editstartehourss);

    });

    it('code to enter minutes under  the End hours', function () {

        var enterendminhrs = element(by.xpath("//ngb-timepicker[@name='endTime']//input[@placeholder='MM']"));
        enterendminhrs.click();
        enterendminhrs.clear();
        enterendminhrs.sendKeys(editstarteminutess);

    });



    it('code to assign employees', function () {

        var assignemp = element(by.xpath("//span[@class='dropdown-btn']"));
        assignemp.click();

    });



    it('Enter the value in the search field', function () {

        var entersearcvalue = element(by.xpath("//input[@placeholder='Search']"));
        entersearcvalue.sendKeys(editassignemployee);

    });


    it('code to click on the checkbox', function () {

        var clickcheck = element(by.xpath("//div[contains(text(),'" + editassignemployee + "')]"));
        clickcheck.click();

    });


    it('click on submit ', function () {
        var clicksubmit = element(by.buttonText('Submit'));
        clicksubmit.click();

    });



    it('open the verify the pop up message and click on view all', function () {

        var popup = element(by.xpath("//p[@class='bg-success']")).getText();
        expect(popup.getText()).toEqual(popup);

        var clickpopupmessage = element(by.xpath("//a[@class='btn btn-success mlr-5']"));
        console.log(clickpopupmessage);
        clickpopupmessage.click();
        browser.sleep(5000);

    });



});
