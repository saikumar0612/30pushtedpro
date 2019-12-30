var Excel = require('exceljs');

 // create object for workbook
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

    global.licences = inboundWorksheet.getRow(2).getCell(21).toString();
    global.deflicences = inboundWorksheet.getRow(3).getCell(21).toString();

});

describe('Code for Add Licence ,click on Licence name and search Licence under Qualification  Module', function () {
    browser.ignoreSynchronization = true; // for non-angular websites
    it('open the browser', function () {
        browser.get(browser.params.url);
        // set implicit time to 30 seconds
        browser.manage().window().maximize();
        browser.manage().timeouts().implicitlyWait(30000);
    });
   
   
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


    it('click on qualification tab', function () {
        var clickqualificationTab = element(by.xpath("//a[contains(text(),'Qualification')]"));
        browser.actions().mouseMove(clickqualificationTab).perform();
        browser.sleep(2000);

    });

    it('click on licence', function () {

        var clicklicence = element(by.xpath("//a[contains(text(),'Licenses')]"));
        clicklicence.click();

    });

    it('click on add button', function () {

        var clickaddicon = element(by.xpath("//a[@id='addlicenses']"));
        clickaddicon.click();


    });

    it('Enter the licence name', function () {

        var enterlicence = element(by.id('lName'));
        enterlicence.sendKeys(licences);

    });

    it('click on submit button', function () {
        var clicksubmit = element(by.buttonText('Submit'));
        clicksubmit.click();

    });


    it('verify pop  message and click on view all licence button', function () {


        var popup = element(by.xpath("//p[@class='bg-success']")).getText();
        expect(popup.getText()).toEqual(popup);

        var clickpopupmessage = element(by.xpath("//a[@id='viewlicenses']"));
        //console.log(clickpopupmessage);
        clickpopupmessage.click();

        browser.sleep(3000);


    });

    it('Enter the licence name under the search field', function () {

        var searchlicence = element(by.id('searchname'));
        searchlicence.sendKeys(licences);
        expect(searchlicence.getAttribute('value')).toBe(licences);
        searchlicence.click();
        browser.sleep(1000);

    });

    //code to click on name 
    it('code to click on licence name', function () {

        var clicklicencename = element(by.xpath("//table[1]/tbody[1]/tr[2]/td[3]/a[1]")).click();
    });

    it('click on close button', function () {

        var clickclose = element(by.xpath("//a[@id='closePopup']")).click();
        browser.sleep(2000);
    });


    it('code to click on bar icon', function () {

        var clickbaricon = element(by.xpath("//tr[2]//td[2]//a[1]//div[1]//i[1]")).click();
    });

    it('click view icon', function () {

        var clickviewicon = element(by.xpath("//tr[2]//td[2]//div[1]//ul[1]//li[2]//a[1]//button[1]//i[1]"));
        clickviewicon.click();

    });


    it('click close button', function () {

        var clickclosebtn = element(by.xpath("//a[@id='closePopup']")).click();
    });


});

describe('Code for Edit Licence and search Licence under Qualification  Module', function () {
    browser.ignoreSynchronization = true; // for non-angular websites
    it('open the browser', function () {
        browser.get(browser.params.url);
        // set implicit time to 30 seconds
        browser.manage().window().maximize();
        browser.manage().timeouts().implicitlyWait(30000);
    });


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


    it('click on qualification tab', function () {
        var clickqualificationTab = element(by.xpath("//a[contains(text(),'Qualification')]"));
        browser.actions().mouseMove(clickqualificationTab).perform();
        browser.sleep(2000);

    });

    it('click on licence', function () {

        var clicklicence = element(by.xpath("//a[contains(text(),'Licenses')]"));
        clicklicence.click();

    });
    
    it('Enter the licence name under the search field', function () {

        var searchlicence = element(by.id('searchname'));
        searchlicence.sendKeys(licences);
        expect(searchlicence.getAttribute('value')).toBe(licences);
        searchlicence.click();
        browser.sleep(1000);

    });

   
    it('code to click on bar icon', function () {

        var clickbaricon = element(by.xpath("//tr[2]//td[2]//a[1]//div[1]//i[1]")).click();
    });

    it('click on edit icon', function () {

        var clickediticon = element(by.xpath("//tr[2]//td[2]//div[1]//div[1]//ul[1]//li[1]//button[1]"));
        clickediticon.click();

    });

    it('Edit the licence name', function () {

        var editlicence = element(by.id('lName'));
        editlicence.sendKeys(deflicences);

    });

    it('click on submit button', function () {
        var clicksubmit = element(by.buttonText('Submit'));
        clicksubmit.click();

    });


    it('verify pop  message and click on view all licence button', function () {


        var popup = element(by.xpath("//p[@class='bg-success']")).getText();
        expect(popup.getText()).toEqual(popup);

        var clickpopupmessage = element(by.xpath("//a[@id='viewlicenses']"));
        //console.log(clickpopupmessage);
        clickpopupmessage.click();

        browser.sleep(3000);


    });


});

describe('Code for Reset licences  under Qualification  Module', function () {
    browser.ignoreSynchronization = true; // for non-angular websites
    it('open the browser', function () {
        browser.get(browser.params.url);
        // set implicit time to 30 seconds
        browser.manage().window().maximize();
        browser.manage().timeouts().implicitlyWait(30000);
    });

    
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

   
    it('Hover on administration icon', function () {
        var clickadministration = element(by.xpath("//app-top-menu//div[1]/ul/li[1]/a"));
        browser.actions().mouseMove(clickadministration).perform();
        browser.sleep(2000);

    });


    it('click on qualification tab', function () {
        var clickqualificationTab = element(by.xpath("//a[contains(text(),'Qualification')]"));
        browser.actions().mouseMove(clickqualificationTab).perform();
        browser.sleep(2000);

    });
    it('click on licence', function () {

        var clicklicence = element(by.xpath("//a[contains(text(),'Licenses')]"));
        clicklicence.click();

    });

    it('click on add button', function () {

        var clickaddicon = element(by.xpath("//a[@id='addlicenses']"));
        clickaddicon.click();


    });

    it('Enter the licence name', function () {

        var enterlicence = element(by.id('lName'));
        enterlicence.sendKeys(licences);

        if (!expect(enterlicence.getAttribute('value')).toEqual(licences))
        {
            console.log("values are  reset to default values:", licences);
        }
        else
        {
            console.log("values are reset to default values:", licences);
        }


    });

    it('click on reset button', function () {

        var clickreset = element(by.buttonText('Reset'));
        clickreset.click();

    });

    it('click on cancel button', function () {
        var clickcancel = element(by.buttonText('Cancel'));
        clickcancel.click();
        browser.sleep(2000);
    });


});


