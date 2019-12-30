var Excel = require('F:/Jasmine/node_modules/exceljs');

var inboundWorkbook = new Excel.Workbook();
inboundWorkbook.xlsx.readFile("F:/Jasmine/TestData/Testdata.xlsx").then(function () {
    // inboundWorkbook.xlsx.readFile("F:/Jasmine/CrmModule.xlsx").then(function () {
    var inboundWorksheet = inboundWorkbook.getWorksheet(1);
    browser.waitForAngularEnabled(false);

    var totalRowsIncludingEmptyRows = inboundWorksheet.rowCount
    //console.log("total nuumber of rows : "+totalRowsIncludingEmptyRows)
    // loop till end of row
    for (var i = 1; i <= totalRowsIncludingEmptyRows; i++) {
        var cellValue = inboundWorksheet.getRow(i).getCell(i).toString();

    }


    global.EmployeeType = inboundWorksheet.getRow(4).getCell(6).toString();
    global.Status = inboundWorksheet.getRow(4).getCell(10).toString();
    global.role1 = inboundWorksheet.getRow(4).getCell(11).toString();
    global.Employee_name = inboundWorksheet.getRow(4).getCell(12).toString();
    global.user_name = inboundWorksheet.getRow(4).getCell(13).toString();


    global.editFirstname = inboundWorksheet.getRow(5).getCell(1).toString();
    global.editMiddlename = inboundWorksheet.getRow(5).getCell(2).toString();
    global.editLastname = inboundWorksheet.getRow(5).getCell(3).toString();
    global.editEmail = inboundWorksheet.getRow(5).getCell(4).toString();
    global.EditUserType = inboundWorksheet.getRow(5).getCell(5).toString();
    global.EditEmployeeType = inboundWorksheet.getRow(5).getCell(6).toString();
    global.EditReporting = inboundWorksheet.getRow(5).getCell(9).toString();
    global.EditStatus = inboundWorksheet.getRow(5).getCell(10).toString();
    global.editrole1 = inboundWorksheet.getRow(5).getCell(11).toString();

});

   

describe('Code for search ,Edit user under UAM  Module', function () {



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



    browser.sleep(2000);
    //code to click on  Qualification module
    it('Hover on administration icon', function () {
        var clickadministration = element(by.xpath("//app-top-menu//div[1]/ul/li[1]/a"));
        browser.actions().mouseMove(clickadministration).perform();
        browser.sleep(2000);

    });

    it('click on UAM Module', function () {

        var clickuam = element(by.xpath("//a[contains(text(),'UAM')]"));
        browser.actions().mouseMove(clickuam).click().perform();
        clickuam.click();

        browser.sleep(1000);

    });

    it('click on users', function () {

        var clickusers = element(by.xpath("//a[contains(text(),'Users')]"));
        clickusers.click();
        browser.sleep(8000);


    });

    //code for search functionality
    it('Enter the Employee name filed value in the search field', function () {
        var search_employee_name = element(by.id('searchname'));
        search_employee_name.click();
        search_employee_name.sendKeys(Employee_name);
        expect(search_employee_name.getAttribute('value')).toBe(Employee_name);
        browser.sleep(1000);
    });

    it('Enter the user name filed value in the search field', function () {
        var search_user_name = element(by.id('searchUsername'));
        search_user_name.click();
        search_user_name.sendKeys(user_name);
        expect(search_user_name.getAttribute('value')).toBe(user_name);
        browser.sleep(1000);
    });

    it('Search Employee type filed value in the search field', function () {
        var search_employee_type = element(by.id('searchType'));
        search_employee_type.click();
        search_employee_type.sendKeys(EmployeeType);
        expect(search_employee_type.getAttribute('value')).toBe(EmployeeType);
        browser.sleep(1000);
    });

    it('Search roles filed value in the search field', function () {
        var search_roles = element(by.id('searchroles'));
        search_roles.click();
        search_roles.sendKeys(role1);
        expect(search_roles.getAttribute('value')).toBe(role1);
        browser.sleep(1000);
    });

    it('Search status filed value in the search field', function () {
        var search_status = element(by.id('searchstatus'));
        search_status.click();
        search_status.sendKeys(Status);
        expect(search_status.getAttribute('value')).toBe(Status);
        browser.sleep(1000);
    });


    it('click on Icon tab', function () {
        var click_icon = element(by.xpath("//tr[2]//td[2]//a[1]//i[1]"));
        click_icon.click();
        browser.sleep(1000);

    });

    it('click on Edit Icon tab', function () {
        var click_editicon = element(by.xpath("//tr[2]//td[2]//div[1]//ul[1]//li[2]//button[1]//em[1]"));
        click_editicon.click();
        browser.sleep(2000);

    });

    it('Edit the firstname', function () {
        var editfirstname = element(by.name('firstName'));
        editfirstname.click();
        editfirstname.clear();
        editfirstname.sendKeys(editFirstname);

    });


    it('Edit middle name', function () {

        var Editmiddlename = element(by.name('middleName'));
        Editmiddlename.click();
        Editmiddlename.clear();
        Editmiddlename.sendKeys(editMiddlename);


    });

    it('Edit last name', function () {

        var Editlastname = element(by.name('lastName'));
        Editlastname.click();
        Editlastname.clear();
        Editlastname.sendKeys(editLastname);

    });

    it('select user type from dropdown', function () {
        var selectusertype = element(by.xpath("//select[@name='userType']")).click();
        element(by.xpath("//select[@name='userType']//option[contains(text(),'" + EditUserType + "')]")).click();


    });

    it('select employee type from dropdwpomn', function () {
        var employeetype = element(by.xpath("//select[@name='employeeType']")).click();
        element(by.xpath("//select[@name='employeeType']//option[contains(text(),'" + EditEmployeeType + "')]")).click();


    });



    it('select reporting to from down', function () {

        var selectreportingto = element(by.xpath("//select[@id='selectreporting']")).click();
        element(by.xpath("//select[@id='selectreporting']//option[contains(text(),'" + EditReporting + "')]")).click();

    });


    it('select status from dropdown', function () {

        var select_status = element(by.xpath("//select[@id='selectstatus']")).click();
        element(by.xpath("//select[@name='status']//option[contains(text(),'" + EditStatus + "')]")).click();

    });

    it('select roles', function () {
        var selectroles = element(by.xpath("//span[@class='dropdown-down']")).click();



        var searchBox = element(by.xpath("//input[@placeholder='Search']")).click();
        searchBox.sendKeys(editrole1);



        var clickcheckbox = element(by.xpath("//li[@class='multiselect-item-checkbox']//div[contains(text(),'" + editrole1 + "')]"));
        clickcheckbox.click();

    });



    it('click on submit button', function () {

        var cliksubmitbutton = element(by.buttonText('Submit'));
        cliksubmitbutton.click();

        browser.sleep(6000);
    });



    //code to view pop up messge

    it('verify on pop up message', function () {

        var clickpopupmessage = element(by.xpath("//p[@class='bg-success']"));
        clickpopupmessage.click();
        browser.sleep(1000);
    });


    it('click on close and view all users', function () {

        var clickviewall = element(by.xpath("//a[@id='viewusers']"));
        clickviewall.click();
        browser.sleep(1000);
    });

});
