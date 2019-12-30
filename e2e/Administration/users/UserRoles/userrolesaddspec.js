var Excel = require('F:/Jasmine/node_modules/exceljs');


var inboundWorkbook = new Excel.Workbook();
inboundWorkbook.xlsx.readFile("F:/Jasmine/TestData/Testdata.xlsx").then(function () {
    var inboundWorksheet = inboundWorkbook.getWorksheet(1);
    browser.waitForAngularEnabled(false);

    var totalRowsIncludingEmptyRows = inboundWorksheet.rowCount
    //console.log("total nuumber of rows : "+totalRowsIncludingEmptyRows)
    // loop till end of row
    for (var i = 1; i <= totalRowsIncludingEmptyRows; i++) {
        var cellValue = inboundWorksheet.getRow(i).getCell(i).toString();

    }
   
    global.role_name = inboundWorksheet.getRow(2).getCell(14).toString();
    global.roledesp = inboundWorksheet.getRow(2).getCell(15).toString();

    global.editrole_name = inboundWorksheet.getRow(3).getCell(14).toString();
    global.editroledesp = inboundWorksheet.getRow(3).getCell(15).toString();

});


describe('Code for Add user roles under User Module', function () {
    browser.ignoreSynchronization = true; // for non-angular websites
    it('open the browser', function () {
        browser.get(browser.params.url);
        browser.manage().window().maximize();
        browser.manage().timeouts().implicitlyWait(30000);
        // create object for workbook

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


    it('click on UAM tab', function () {
        var clickUAm = element(by.xpath("//a[contains(text(),'UAM')]"));
        browser.actions().mouseMove(clickUAm).perform();
        browser.sleep(2000);

    });


    it('click on users role tab', function () {
        var clickuserroles = element(by.xpath("//a[contains(text(),'User Role')]"));
        clickuserroles.click();
        browser.sleep(2000);

    });
    

    //code to click on add roles button
    it('click on add button under users role tab', function () {
        var clickadd = element(by.xpath("//div[1]//h4[1]/a[1]"));
        clickadd.click();

    });


    it('Enter the userole name', function () {
        var rolenames = element(by.id('roleName'));
        rolenames.sendKeys(role_name);


    });

           
    it('Enter the userole descprition', function () {

        var role_desp = element(by.id('description'));
        role_desp.sendKeys(roledesp);


    });
           
    it('click the checkbox button for permmisions', function () {

        var click_allpermissions = element(by.xpath("//div[@class='col-md-6']//input[@class='form-check-input']"));
        click_allpermissions.click();


    });

    it('click on save role button ', function () {

        var click_savebtn = element(by.xpath("//button[@id='createRole']"));
        click_savebtn.click();


    });

    //code to view pop up messge

    it('verify pop up message and click on viewskills page', function () {

        var popup = element(by.xpath("//p[@class='bg-success text-center']")).getText();
        expect(popup.getText()).toEqual(popup);

        var clickpopupmessage = element(by.xpath("//a[@class='btn btn-success']"));
        //console.log(clickpopupmessage);
        clickpopupmessage.click();


    });


    
});

describe('Code for Search and Edit user roles under User Module', function () {
    browser.ignoreSynchronization = true; // for non-angular websites
    it('open the browser', function () {
        browser.get(browser.params.url);
        browser.manage().window().maximize();
        browser.manage().timeouts().implicitlyWait(30000);
        // create object for workbook

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


    it('click on UAM tab', function () {
        var clickUAm = element(by.xpath("//a[contains(text(),'UAM')]"));
        browser.actions().mouseMove(clickUAm).perform();
        browser.sleep(2000);

    });


    it('click on users role tab', function () {
        var clickuserroles = element(by.xpath("//a[contains(text(),'User Role')]"));
        clickuserroles.click();
        browser.sleep(2000);

    });

    it('serch the role name', function () {
        var search_role = element(by.xpath("//input[@id='Searchname']"));
        search_role.sendKeys(role_name);
        search_role.click();
        expect(search_role.getAttribute('value')).toBe(role_name);
        search_role.clear();
        browser.sleep(1000);


    });

    it('serch the role description', function () {
        var search_roledesp = element(by.xpath("//input[@id='Searchvalue']"));
        search_roledesp.sendKeys(roledesp);
        search_roledesp.click();
        expect(search_roledesp.getAttribute('value')).toBe(roledesp);
        search_roledesp.clear();
        browser.sleep(1000);


    });


    it('click on icon bar', function () {

        var clickbaricon = element(by.xpath("//tr[2]//td[2]//a[1]//div[1]//i[1]"));
        clickbaricon.click();


    });


    it('click on edit icon bar', function () {

        var clickiconeditbar = element(by.xpath("//tr[2]//td[2]//a[1]//button[1]"));
        clickiconeditbar.click();


    });


    it('edit the userole name', function () {
        var editrolename = element(by.id('roleName'));
        editrolename.click();
        editrolename.clear();
        editrolename.sendKeys(editrole_name);
        browser.sleep(1000);

    });


    it('Edit the userole descprition', function () {

        var role_desp = element(by.id('description'));
        role_desp.click();
        role_desp.clear();
        role_desp.sendKeys(editroledesp);
        browser.sleep(1000);



    });

    //it('click the checkbox button for permmisions', function () {

    //    var click_allpermissions = element(by.xpath("//div[@class='col-md-6']//input[@class='form-check-input']"));
    //    click_allpermissions.click();


    //});

    it('click on save role button ', function () {

        var click_savebtn = element(by.xpath("//button[@id='save']"));
        click_savebtn.click();


    });

    //code to view pop up messge

    it('verify pop up message and click on viewskills page', function () {

        var popup = element(by.xpath("//p[@class='bg-success text-center']")).getText();
        expect(popup.getText()).toEqual(popup);

        var clickanotheruserrole = element(by.xpath("//a[@id='roleslist']"));
        //console.log(clickpopupmessage);
        clickanotheruserrole.click();


    });


});