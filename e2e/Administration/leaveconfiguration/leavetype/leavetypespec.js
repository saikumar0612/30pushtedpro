var Excel = require('exceljs');

      //   create object for workbook
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

    global.enterleavename = inboundWorksheet.getRow(2).getCell(25).toString();
    global.leavetypecountry = inboundWorksheet.getRow(2).getCell(26).toString();

    global.edit_leavename = inboundWorksheet.getRow(3).getCell(25).toString();
    global.edit_leavetypecountry = inboundWorksheet.getRow(3).getCell(26).toString();


});


describe('Code for Add Leave type ,search Leave type, Click on Leave type name , view leave type name under Leave configuration  Module', function () {
    browser.ignoreSynchronization = true; // for non-angular websites

    it('Open the browser', function () {
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

   

    it('Mouse hover adminstration', function () {

        var ele = element(by.xpath('//app-top-menu//div[1]/ul/li[1]/a'));
        browser.actions().mouseMove(ele).perform();

        browser.manage().timeouts().setScriptTimeout(60000);
    });


    it('Mouse hover on Leave Configuration', function () {

        var clickleaveconfig = element(by.xpath("//a[contains(text(),'Leave Configuration')]"));
        browser.actions().mouseMove(clickleaveconfig).perform();
       

    });


    it('click on Leave Type', function () {
        //code to click on Leave type  sub module
        var clickleavetype = element(by.xpath("//a[contains(text(),'Leave Type')]"));
        clickleavetype.click();

    });

    it('click on Add leaveTypes', function () {

        var clickadd = element(by.id('addleaveTypes'));
        clickadd.click();

    });



    it('Enter Leave Name', function () {
        var enterleavesname = element(by.id('name'));
        enterleavesname.sendKeys(enterleavename);

    });

    it('Select Dropdown country', function () {
        var country = element(by.id('country')).click();
        element(by.xpath("//select[@id='country']//option[contains(text(), '" + leavetypecountry + "')]")).click();


    });

    it('Click for save leave', function () {
        var clickbutton = element(by.buttonText('Save'));
        clickbutton.click();

    });

    it('Verfiy Leave type added successfully', function () {
        var popup = element(by.xpath("//h5[contains(text(),'Leave type added successfully')]")).getText();
        expect(popup.getText()).toEqual(popup);

    });


    it('Click For View all Leave Types', function () {
        var clickpopupmessage = element(by.linkText('View all Leave Types'));
        clickpopupmessage.click();
        browser.sleep(5000);

    });

    it('Searching Leave Name', function () {
        var selectleavetype = element(by.xpath("//input[@id='searchName']"));
        selectleavetype.click();
        selectleavetype.sendKeys(enterleavename);
        expect(selectleavetype.getAttribute('value')).toBe(enterleavename);
        browser.sleep(2000);

    });

    it('Searching country', function () {
        var searchcountry = element(by.xpath("//input[@id='searchCountry']"));
        searchcountry.click();
        searchcountry.sendKeys(leavetypecountry);
        expect(searchcountry.getAttribute('value')).toBe(leavetypecountry);
        browser.sleep(2000);
    });

    //code to click on leave type name

    it('Click on  leave type name', function () {
        var clickleavetypename = element(by.xpath("//a[@id='viewLeaveName']"));
        clickleavetypename.click();
    });

    it('Click on  leave view close ', function () {
        var clickClosebutton = element(by.linkText('Close'));
        clickClosebutton.click();

    });


    it('Hover on leave Menu', function () {
        var clickviewicon = element(by.xpath('//tr[2]//td[2]//a[1]//div[1]//i[1]'));
        clickviewicon.click();

    });

    it('Click on  leave view icon', function () {
        var clickicon = element(by.xpath('//tr[2]/td[2]//div[1]/ul[1]/li[2]//button[1]'));
        clickicon.click();
    });

    it('Click on  leave view close popup', function () {
        var clickclose = element(by.linkText('Close'));
        clickclose.click();

    });

});

describe('Code for Edit leave type name under Leave configuration  Module', function () {
    browser.ignoreSynchronization = true; // for non-angular websites

    it('Open the browser', function () {
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



    it('Mouse hover adminstration', function () {

        var ele = element(by.xpath('//app-top-menu//div[1]/ul/li[1]/a'));
        browser.actions().mouseMove(ele).perform();

        browser.manage().timeouts().setScriptTimeout(60000);
    });


    it('Mouse hover on Leave Configuration', function () {

        var clickleaveconfig = element(by.xpath("//a[contains(text(),'Leave Configuration')]"));
        browser.actions().mouseMove(clickleaveconfig).perform();


    });


    it('click on Leave Type', function () {
        //code to click on Leave type  sub module
        var clickleavetype = element(by.xpath("//a[contains(text(),'Leave Type')]"));
        clickleavetype.click();

    });

   
    it('Searching Leave Name', function () {
        var selectleavetype = element(by.xpath("//input[@id='searchName']"));
        selectleavetype.click();
        selectleavetype.sendKeys(enterleavename);
        expect(selectleavetype.getAttribute('value')).toBe(enterleavename);
        browser.sleep(2000);

    });

    it('Searching country', function () {
        var searchcountry = element(by.xpath("//input[@id='searchCountry']"));
        searchcountry.click();
        searchcountry.sendKeys(leavetypecountry);
        expect(searchcountry.getAttribute('value')).toBe(leavetypecountry);
        browser.sleep(2000);
    });

    

    it('Hover on leave Menu', function () {
        var clickviewicon = element(by.xpath('//tr[2]//td[2]//a[1]//div[1]//i[1]'));
        clickviewicon.click();

    });

    it('Click on  edit  icon', function () {
        var clickedit = element(by.xpath('//tr[2]//td[2]//div[1]//div[1]//ul[1]//li[1]//button[1]'));
        clickedit.click();
    });


    it('Edit Leave Name', function () {
        var Editleavesname = element(by.id('name'));
        Editleavesname.click();
        Editleavesname.clear();
        Editleavesname.sendKeys(edit_leavename);

    });

    it('Select Dropdown country', function () {
        var country = element(by.id('country')).click();
        element(by.xpath("//select[@id='country']//option[contains(text(), '" + edit_leavetypecountry + "')]")).click();


    });

    it('Click for save leave', function () {
        var clickbutton = element(by.buttonText('Save'));
        clickbutton.click();

    });

    it('Verfiy Leave type added successfully', function () {
        var popup = element(by.xpath("//p[@class='bg-success']")).getText();
        expect(popup.getText()).toEqual(popup);

    });


    it('Click For View all Leave Types', function () {
        var clickpopupmessage = element(by.xpath("//a[@id='allleaveTypes']"));
        clickpopupmessage.click();
        browser.sleep(5000);

    });
   
});



