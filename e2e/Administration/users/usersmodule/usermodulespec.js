var Excel = require('H:/Jasmine/node_modules/exceljs');

var inboundWorkbook = new Excel.Workbook();
inboundWorkbook.xlsx.readFile("H:/Jasmine/ConfigModule/company_number_formats/configmodule.xlsx").then(function () {
    // inboundWorkbook.xlsx.readFile("F:/Jasmine/CrmModule.xlsx").then(function () {

    var inboundWorksheet = inboundWorkbook.getWorksheet(1);
    browser.waitForAngularEnabled(false);

    var totalRowsIncludingEmptyRows = inboundWorksheet.rowCount
    //console.log("total nuumber of rows : "+totalRowsIncludingEmptyRows)
    // loop till end of row
    for (var i = 1; i <= totalRowsIncludingEmptyRows; i++) {
        var cellValue = inboundWorksheet.getRow(i).getCell(i).toString();

    }

    global.Firstname = inboundWorksheet.getRow(2).getCell(1).toString();
    global.Middlename = inboundWorksheet.getRow(2).getCell(2).toString();
    global.Lastname = inboundWorksheet.getRow(2).getCell(3).toString();
    global.Email = inboundWorksheet.getRow(2).getCell(4).toString();
    global.UserType = inboundWorksheet.getRow(2).getCell(5).toString();
    global.EmployeeType = inboundWorksheet.getRow(2).getCell(6).toString();
    global.passwords = inboundWorksheet.getRow(2).getCell(7).toString();
    global.retypepassword = inboundWorksheet.getRow(2).getCell(8).toString();
    global.Reporting = inboundWorksheet.getRow(2).getCell(9).toString();
    global.Status = inboundWorksheet.getRow(2).getCell(10).toString();
    global.role1 = inboundWorksheet.getRow(2).getCell(11).toString();
    global.Employee_name = inboundWorksheet.getRow(2).getCell(12).toString();


    global.editFirstname = inboundWorksheet.getRow(3).getCell(1).toString();
    global.editMiddlename = inboundWorksheet.getRow(3).getCell(2).toString();
    global.editLastname = inboundWorksheet.getRow(3).getCell(3).toString();
    global.editEmail = inboundWorksheet.getRow(3).getCell(4).toString();
    global.EditUserType = inboundWorksheet.getRow(3).getCell(5).toString();
    global.EditEmployeeType = inboundWorksheet.getRow(3).getCell(6).toString();
    global.EditReporting = inboundWorksheet.getRow(3).getCell(9).toString();
    global.EditStatus = inboundWorksheet.getRow(3).getCell(10).toString();
    global.editrole1 = inboundWorksheet.getRow(3).getCell(11).toString();

});

   
describe('Code for Add user under UAM  Module', function () {

   

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

            //code to click on add users button

          
            it('click on add user button', function () {
                var clickadduserbutton = element(by.xpath("//a[@id='adduser']"));
                clickadduserbutton.click();
                browser.sleep(9000);

            });

            it('enter the firstname', function () {
                var enterfirstname = element(by.id('firstName'));
                enterfirstname.sendKeys(Firstname);

            });


            it('Enter middle name', function () {

                var entermiddlename = element(by.id('middleName'));
                entermiddlename.sendKeys(Middlename);


            });

            it('enter last name', function () {

                var enterlastname = element(by.id('lastName'));
                enterlastname.sendKeys(Lastname);



            });

            it('enter email id', function () {

                var enteremaildid = element(by.id('email'));
                enteremaildid.sendKeys(Email);


            });

            it('select user type from dropdown', function () {
                var selectusertype = element(by.xpath("//select[@id='seluserType']")).click();
                element(by.xpath("//select[@name='userType']//option[contains(text(),'" + UserType + "')]")).click();


            });

            it('select employee type from dropdwpomn', function () {
                var employeetype = element(by.xpath("//select[@id='selemployeeType']")).click();
                element(by.xpath("//select[@name='employeeType']//option[contains(text(),'" + EmployeeType + "')]")).click();


            });

            it('Enter password', function () {
                var enterpassword = element(by.id('password'));
                enterpassword.sendKeys(passwords);


            });

            it('Enter retype password', function () {
                var enterretypepassword = element(by.id('cpassword'));
                enterretypepassword.sendKeys(retypepassword);



            });

            it('select reporting to from down', function () {

                var selectreportingto = element(by.xpath("//select[@id='reporting']")).click();
                element(by.xpath("//select[@name='reporting']//option[contains(text(),'" + Reporting + "')]")).click();

            });


            it('select status from dropdown', function () {

                var select_status = element(by.xpath("//select[@id='selectStatus']")).click();
                element(by.xpath("//select[@name='status']//option[contains(text(),'" + Status + "')]")).click();

            });

            it('select roles', function () {
                var selectroles = element(by.xpath("//span[@class='dropdown-down']")).click();



                var searchBox = element(by.xpath("//input[@placeholder='Search']")).click();
                searchBox.sendKeys(role1);



                var clickcheckbox = element(by.xpath("//li[@class='multiselect-item-checkbox']//div[contains(text(),'" + role1 + "')]"));
                clickcheckbox.click();

            });


            //if (data.role2 != 'NULL')
            //{
            //    searchBox.clear();
            //    var clickcheckbox1 = element(by.xpath("//li[@class='multiselect-item-checkbox']//div[contains(text(),'" + data.role2 + "')]"));
            //    clickcheckbox1.click();
            //}

            //if (data.role3 != 'NULL')
            //{
            //    searchBox.clear();

            //    var clickcheckbox2 = element(by.xpath("//li[@class='multiselect-item-checkbox']//div[contains(text(),'" + data.role3+ "')]"));
            //    clickcheckbox2.click();
            //}

            //if (rolesall == true)
            //{
            //    element(by.xpath("(//li[@class='multiselect-item-checkbox'])")).click();
            //    browser.sleep(1000);
            //}
            //else
            //{
            //    var records = element.all(by.xpath("//li[@class='multiselect-item-checkbox']"));
            //    //console.log("records " + roles);
            //    foreach(var records in roles)
            //    {
            //        var search = element(by.xpath("//input[@placeholder='Search']")).click();
            //        search.clear();
            //        search.sendKeys(role);
            //        browser.sleep(1000);
            //        element(by.xpath("(//li[@class='multiselect-item-checkbox'])")).click();
            //        browser.sleep(1000);
            //    }
            //}

            //element.all(by.xpath("//li[@class='multiselect-item-checkbox']")).getText().then(function (texts) {
            //    var role;
            //    for (var i = 0; i < 2; i++) {

            //      //  console.log("Texts length " + texts.length);
            //        // console.log("i value " + i);
            //        role = test_dat.getRow(2).getCell(13 + i).toString();

            //        ////var search = element(by.xpath("//ng-multiselect-dropdown[@id='" + role + "']//input[@placeholder='Search']")).click();
            //        var search = element(by.xpath("//input[@placeholder='Search']")).click();
            //        //console.log("roles " + role + i);
            //        //console.log("role search " + search);
            //        search.clear();
            //       // console.log("ROLE " + role);
            //       // console.log("Column name " + inboundWorksheet.getRow(1).getCell(74 + i).toString());
            //        //if (role != "NULL" && inboundWorksheet.getRow(1).getCell(74 + i).toString().toLowerCase() == "role" + i) {
            //            if (role != "NULL") {
            //                search.sendKeys(role);
            //                //search.sendKeys(texts[i]);


            //                browser.sleep(1000);
            //                element(by.xpath("//li[@class='multiselect-item-checkbox']/div[contains(text(),'" + role + "')]")).click();
            //                //li[@class='multiselect-item-checkbox']/div[contains(text(),'Admin')]
            //                //element(by.xpath("//div[contains(text(),'" + texts[i] + "')]")).click();
            //                browser.sleep(1000);
            //                //console.log(texts[i]);
            //            //}
            //        }

            //    }

            //});

            it('click on submit button', function () {

                var cliksubmitbutton = element(by.buttonText('Submit'));
                cliksubmitbutton.click();

                browser.sleep(6000);
            });



            //code to view pop up messge

            it('click on pop up message', function () {

                var clickpopupmessage = element(by.xpath("//a[@id='viewusers']"));
                clickpopupmessage.click();

                browser.sleep(5000);
            });

});

  describe('code for open the gmail browser to check the link while adding the user', function () {

        it('open the gmail browser', function () {
            browser.get(browser.params.gmailurl);
            browser.manage().window().maximize();
            browser.manage().timeouts().implicitlyWait(30000);
        });


            it('Enter email id under the gmail field ', function () {
                var entergmailvalue = element(by.id('identifierId'));
                entergmailvalue.sendKeys(Email);
                 browser.sleep(1000);
             });


             it('click for next', function () {
                 var enternext = element(by.xpath("//div[@id='identifierNext']"));
                 enternext.click();
                 browser.sleep(2000);
             });

             it('Enter password', function () {
                 var entergmailpassword = element(by.name('password'));
                 entergmailpassword.sendKeys(browser.params.user_password);
                 browser.sleep(2000);
             });

             it('click for login', function () {
                 var clicklogin = element(by.xpath("//div[@id='passwordNext']"));
                 clicklogin.click();
                 browser.sleep(6000);
        });

        it('click om the checkbox of the  link mail received', function () {
            var clickactivatelink = element(by.xpath("//div[@class='UI']"));
            clickactivatelink.click();
            browser.sleep(3000);
        });

        it('click on the go to website link', function () {
            var clickweblink = element(by.xpath("//a[contains(text(),'Or go to our website')]"));
            clickweblink.click();
            browser.sleep(3000);
        });


});

describe('Code for Edit user under UAM  Module', function () {



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

    it('Enter the Employee name filed value in the search field', function () {
        var search_employee_name = element(by.id('searchname'));
        search_employee_name.click();
        search_employee_name.sendKeys(Employee_name);
        expect(search_employee_name.getAttribute('value')).toBe(Employee_name);
        browser.sleep(1000);
    });

    it('click on Icon tab', function () {
        var click_icon = element(by.xpath("//tr[2]//td[2]//a[1]//i[1]"));
        click_icon.click();
        browser.sleep(1000);

    });


    it('click on View Icon tab', function () {
        var click_viewicon = element(by.xpath("//tr[2]//td[2]//div[1]//div[1]//ul[1]//li[1]//button[1]"));
        click_viewicon.click();
        browser.sleep(2000);

    });


    it('click on Edit User button', function () {
        var click_editusericon = element(by.xpath("//a[@id='edituserclick']"));
        click_editusericon.click();
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
