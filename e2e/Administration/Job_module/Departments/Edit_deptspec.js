var Excel = require('exceljs');

  // create object for workbook
        var inboundWorkbook = new Excel.Workbook();
inboundWorkbook.xlsx.readFile("F:/Jasmine/TestData/Testdata.xlsx").then(function () {
    var inboundWorksheet = inboundWorkbook.getWorksheet(1);
    browser.waitForAngularEnabled(false);
    
    var totalRowsIncludingEmptyRows = inboundWorksheet.rowCount
   
    // loop till end of row
    for (var i = 1; i <= totalRowsIncludingEmptyRows; i++) {
        var cellValue = inboundWorksheet.getRow(i).getCell(i).toString();
       
    }
    
    global.editdeptnae = inboundWorksheet.getRow(3).getCell(16).toString();
    global.editdeptname = inboundWorksheet.getRow(4).getCell(16).toString();

});

describe('Code for edit department  under Job  Module', function () {
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

    it('Enter the department under search field', function () {

        var searchname = element(by.xpath("//input[@id='searchname']"));
        searchname.sendKeys(editdeptnae);
        searchname.click();
        expect(searchname.getAttribute('value')).toBe(editdeptnae);
        searchname.clear();
        browser.sleep(1000);


    });

    it('click on editicon', function () {
        //code to click on edit icon

        var clickicon = element(by.xpath('//tr[2]//td[2]//a[1]//div[1]//i[1]'));
        clickicon.click();


    });

    it('click on edit icon button', function () {

        var clickediticon = element(by.xpath('//tr[2]//td[2]//div//div[1]//ul[1]//li[1]//a[1]//button[1]//i[1]'));
        clickediticon.click();
        browser.sleep(1000);

    });
            
    it('Edit the department name', function () {

        var editdeptname = element(by.id('jobName'));
        editdeptname.click();
        editdeptname.clear();
        editdeptname.sendKeys(editdeptname);
        browser.sleep(1000);

    });
          
    it('click on submit button', function () {

        var clicksubmit = element(by.buttonText('Submit'));
        clicksubmit.click();

    });

         
    it('verify pop up message and click on view all department', function () {


        var popups = element(by.xpath("//p[@class='bg-success']")).getText();
        expect(popups.getText()).toEqual(popups);

        var clickpopupmessages = element(by.xpath("//a[contains(text(),'View all Departments')]"));
        //console.log(clickpopupmessage);
        clickpopupmessages.click();
    });
   
});