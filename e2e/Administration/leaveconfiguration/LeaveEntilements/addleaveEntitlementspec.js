//var Excel = require('F:/node_modules/exceljs');
//describe('Code for add leave Entitlement under  Leave configuration  Module', function () {
//    browser.ignoreSynchronization = true; // for non-angular websites
//    it('Retrieving data from Excel File Operations', function () {
//        browser.get(browser.params.url);
//        // set implicit time to 30 seconds
//        browser.manage().window().maximize();
//        browser.manage().timeouts().implicitlyWait(30000);
//        // create object for workbook
//        var inboundWorkbook = new Excel.Workbook();
//        inboundWorkbook.xlsx.readFile("F:/Jasmine/TestData/leaveconfig.xlsx").then(function () {
//            var inboundWorksheet = inboundWorkbook.getWorksheet(1);
//            browser.waitForAngularEnabled(false);

//            // browser.get(inboundWorksheet.getCell('A2').value);

//            //element(by.name('q')).sendKeys(inboundWorksheet.getCell('A2').value);
//            //element(by.name('q')).submit();

//            var totalRowsIncludingEmptyRows = inboundWorksheet.rowCount
//            //console.log("total nuumber of rows : "+totalRowsIncludingEmptyRows)
//            // loop till end of row
//            for (var i = 1; i <= totalRowsIncludingEmptyRows; i++) {
//                var cellValue = inboundWorksheet.getRow(i).getCell(i).toString();
//                //console.log("Column B value from the row '"+i+"' : "+ cellValue)

//                //var username = inboundWorksheet.getRow(2).getCell(1).toString();
//                //console.log(username)

//            }
          
//            var selectlocation = inboundWorksheet.getRow(2).getCell(4).toString();
//            var employeetype = inboundWorksheet.getRow(2).getCell(5).toString();
//            var leavetype = inboundWorksheet.getRow(2).getCell(6).toString();
//            var leaveperiod = inboundWorksheet.getRow(2).getCell(7).toString();
//            var entitlement = inboundWorksheet.getRow(2).getCell(8).toString();
//            var selectemp = inboundWorksheet.getRow(2).getCell(9).toString();



//             //console.log(selectlocation);
//            //console.log(username);
//            var username = element(by.name('userName'));
//            username.sendKeys(browser.params.user_name);

//            var userpassword = element(by.name('password'));
//            userpassword.sendKeys(browser.params.user_password);


//            var loginBtn = element(by.id('login'));
//            loginBtn.click();
//            browser.manage().timeouts().implicitlyWait(300000);

//            //code to click on  Leave configuration module

//            var clickadministration = element(by.xpath("//app-sidebar/div/ul/li[2]/a/div[1]/em"));
//            browser.actions().mouseMove(clickadministration).perform();
//            browser.sleep(2000);


//            var clickleaveconfig = element(by.xpath("//a[contains(text(),'Leave Configuration')]"));
//            browser.actions().mouseMove(clickleaveconfig).perform();
//            browser.manage().timeouts().setScriptTimeout(360000);


//            //code to click on Leave type  sub module
//            var clickleaveentitlements = element(by.linkText('Entitlements'));
//            clickleaveentitlements.click();


//            //click on add button
//            var clickadd = element(by.xpath("//a[@id='add']"));
//            clickadd.click();

//            //code for Add leave Entitlements
//            var checkbox = element(by.id("employee")).isSelected();
//            if (checkbox == true)
//            {
//                element(by.id("employee")).click();
//                var locate = element(by.xpath("//select[@id='location']")).click();
//                element(by.xpath("//select[@name='location']//option[contains(text(),'" + selectlocation  +"')]")).click();
               

//                var employee_type = element(by.xpath("//select[@id='role_name']")).click();
//                element(by.xpath("//select[@name='role_name']//option[contains(text(),'" + employeetype + "')]")).click();

//            }
//            else
//            {
//                var selectemployee = element(by.xpath("//select[@id='empname']")).click();
//                element(by.xpath("//select[@name='empname']//option[contains(text(),'" + selectemp + "')]")).click();
//            }

            

//            var selectleave = element(by.xpath("//select[@id='leave_type']")).click();
//            element(by.xpath("//select[@name='leave_type']//option[contains(text(),'" + leavetype +"')]")).click();



//            var selectleaveperiod = element(by.xpath("//select[@id='leave_period']")).click();
//            element(by.xpath("//select[@name='leave_period']//option[contains(text(),'" + leaveperiod +"')]")).click();

//            var entitlements = element(by.id('days'));
//            entitlements.sendKeys(entitlement);

//            var clicksavebutton = element(by.xpath("//button[@id='addLeave']"));
//            clicksavebutton.click();
//            browser.sleep(3000);

//            //code to verify pop up message


//            var popup = element(by.xpath("//p[@class='bg-success']")).getText();
//            expect(popup.getText()).toEqual(popup);

//            var clickpopupmessage = element(by.linkText('View all Entitlements'));
//            //console.log(clickpopupmessage);
//            clickpopupmessage.click();
            
//            browser.sleep(5000);


//            //code for search functionality under Leave Entitlements
//            var searchEmployeename = element(by.xpath("//input[@id='searchName']"));
//            searchEmployeename.click();
//            searchEmployeename.sendKeys(selectemp);
//            expect(searchEmployeename.getAttribute('value')).toBe(selectemp);
//            searchEmployeename.clear();
//            browser.sleep(2000);

//            var selectleavetype = element(by.xpath("//input[@id='searchleaveType']"));
//            selectleavetype.click();
//            selectleavetype.sendKeys(leavetype);
//            expect(selectleavetype.getAttribute('value')).toBe(leavetype);
//            selectleavetype.clear();
//            browser.sleep(2000);

//            var selectdays = element(by.xpath("//input[@id='searchdays']"));
//            selectdays.click();
//            selectdays.sendKeys(entitlement);
//            expect(selectdays.getAttribute('value')).toBe(entitlement);
//            selectdays.clear();


//        });

//    });
//});

// var Excel = require('F:/node_modules/exceljs');
// describe('Code for add leave Entitlement under  Leave configuration  Module', function () {
//     browser.ignoreSynchronization = true; // for non-angular websites
//     it('Retrieving data from Excel File Operations', function () {
//         browser.get(browser.params.url);
//         // set implicit time to 30 seconds
//         browser.manage().window().maximize();
//         browser.manage().timeouts().implicitlyWait(30000);
//         // create object for workbook
//         var inboundWorkbook = new Excel.Workbook();
//         inboundWorkbook.xlsx.readFile("F:/Jasmine/TestData/leaveconfig.xlsx").then(function () {
//             var inboundWorksheet = inboundWorkbook.getWorksheet(1);
//             browser.waitForAngularEnabled(false);

//             // browser.get(inboundWorksheet.getCell('A2').value);

//             //element(by.name('q')).sendKeys(inboundWorksheet.getCell('A2').value);
//             //element(by.name('q')).submit();

//             var totalRowsIncludingEmptyRows = inboundWorksheet.rowCount
//             //console.log("total nuumber of rows : "+totalRowsIncludingEmptyRows)
//             // loop till end of row
//             for (var i = 1; i <= totalRowsIncludingEmptyRows; i++) {
//                 var cellValue = inboundWorksheet.getRow(i).getCell(i).toString();
//                 //console.log("Column B value from the row '"+i+"' : "+ cellValue)

//                 //var username = inboundWorksheet.getRow(2).getCell(1).toString();
//                 //console.log(username)

//             }

//             var selectlocation = inboundWorksheet.getRow(2).getCell(4).toString();
//             var employeetype = inboundWorksheet.getRow(2).getCell(5).toString();
//             var leavetype = inboundWorksheet.getRow(2).getCell(6).toString();
//             var leaveperiod = inboundWorksheet.getRow(2).getCell(7).toString();
//             var entitlement = inboundWorksheet.getRow(2).getCell(8).toString();
//             var selectemp = inboundWorksheet.getRow(2).getCell(9).toString();



//              //console.log(selectlocation);
//             //console.log(username);
//             var username = element(by.name('userName'));
//             username.sendKeys(browser.params.user_name);

//             var userpassword = element(by.name('password'));
//             userpassword.sendKeys(browser.params.user_password);


//             var loginBtn = element(by.id('login'));
//             loginBtn.click();
//             browser.manage().timeouts().implicitlyWait(300000);

//             //code to click on  Leave configuration module

//             var clickadministration = element(by.xpath("//app-sidebar/div/ul/li[2]/a/div[1]/em"));
//             browser.actions().mouseMove(clickadministration).perform();
//             browser.sleep(2000);

describe('Code for Add job under Recruitment  Module', function () {
    browser.ignoreSynchronization = true; // for non-angular websites
    it('Excel File Operations', function () {
        browser.get("http://162.254.209.129:4206");
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


    it('Mouse hover on Leave Configuration', function () {

        var clickleaveconfig = element(by.xpath("//a[contains(text(),'Leave Configuration')]"));
        browser.actions().mouseMove(clickleaveconfig).perform();
        browser.manage().timeouts().setScriptTimeout(360000);

    });


    it('click on Entitlements', function () {

        var clickleaveentitlements = element(by.linkText('Entitlements'));
        clickleaveentitlements.click();

    });


    it('click on Entitlements', function () {

        //click on add button
        var clickadd = element(by.xpath("//a[@id='add']"));
        clickadd.click();
    });


    it('Add to Multiple Employees By Employee Type', function () {

        //code for Add leave Entitlements
        var checkbox = element(by.id("employee")).isSelected();
        if (checkbox == true) {
            element(by.id("employee")).click();
            var locate = element(by.xpath("//select[@id='location']")).click();
            element(by.xpath("//select[@name='location']//option[contains(text(),'" + selectlocation + "')]")).click();


            var employee_type = element(by.xpath("//select[@id='role_name']")).click();
            element(by.xpath("//select[@name='role_name']//option[contains(text(),'" + employeetype + "')]")).click();

        }
        else {
            var selectemployee = element(by.xpath("//select[@id='empname']")).click();
            element(by.xpath("//select[@name='empname']//option[contains(text(),'" + selectemp + "')]")).click();
        }

    });



    it('Select leavetype', function () {

        var selectleave = element(by.xpath("//select[@id='leave_type']")).click();
        element(by.xpath("//select[@name='leave_type']//option[contains(text(),'" + leavetype + "')]")).click();
    });

    it('Select leaveperiod', function () {
        var selectleaveperiod = element(by.xpath("//select[@id='leave_period']")).click();
        element(by.xpath("//select[@name='leave_period']//option[contains(text(),'" + leaveperiod + "')]")).click();

    });

    it('enter Entitlement  in days', function () {
        var entitlements = element(by.id('days'));
        entitlements.sendKeys(entitlement);
    });

    it('save the leave Entitlement', function () {

        var clicksavebutton = element(by.xpath("//button[@id='addLeave']"));
        clicksavebutton.click();
        browser.sleep(3000);

    });


    it('Verfiy Leave type added successfully', function () {
        var popup = element(by.xpath("//p[@class='bg-success']")).getText();
        expect(popup.getText()).toEqual(popup);
    });


    it('Click For View all Entitlements', function () {
        var clickpopupmessage = element(by.linkText('View all Entitlements'));

        clickpopupmessage.click();

        browser.sleep(5000);
    });


    it('In Entitlements Search Employee Name ', function () {
        //code for search functionality under Leave Entitlements
        var searchEmployeename = element(by.xpath("//input[@id='searchName']"));
        searchEmployeename.click();
        searchEmployeename.sendKeys(selectemp);
        expect(searchEmployeename.getAttribute('value')).toBe(selectemp);
        searchEmployeename.clear();
        browser.sleep(2000);
    });


    it('In Entitlements Search Leave Type ', function () {
        var selectleavetype = element(by.xpath("//input[@id='searchleaveType']"));
        selectleavetype.click();
        selectleavetype.sendKeys(leavetype);
        expect(selectleavetype.getAttribute('value')).toBe(leavetype);
        selectleavetype.clear();
        browser.sleep(2000);
    });

    it('In Entitlements Search Leave Days ', function () {
        var selectdays = element(by.xpath("//input[@id='searchdays']"));
        selectdays.click();
        selectdays.sendKeys(entitlement);
        expect(selectdays.getAttribute('value')).toBe(entitlement);
        selectdays.clear();


    });


});