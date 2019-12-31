var Excel = require('F:/node_modules/exceljs');
describe('Code for Report  under  Leave configuration  Module', function () {
    browser.ignoreSynchronization = true; // for non-angular websites
    it('Retrieving data from Excel File Operations', function () {
        browser.get(browser.params.url);
        // set implicit time to 30 seconds
        browser.manage().window().maximize();
        browser.manage().timeouts().implicitlyWait(30000);
        // create object for workbook
        var inboundWorkbook = new Excel.Workbook();
        inboundWorkbook.xlsx.readFile("F:/Jasmine/TestData/leaveconfig.xlsx").then(function () {
            var inboundWorksheet = inboundWorkbook.getWorksheet(1);
            browser.waitForAngularEnabled(false);

            // browser.get(inboundWorksheet.getCell('A2').value);

            //element(by.name('q')).sendKeys(inboundWorksheet.getCell('A2').value);
            //element(by.name('q')).submit();

            var totalRowsIncludingEmptyRows = inboundWorksheet.rowCount
            //console.log("total nuumber of rows : "+totalRowsIncludingEmptyRows)
            // loop till end of row
            for (var i = 1; i <= totalRowsIncludingEmptyRows; i++) {
                var cellValue = inboundWorksheet.getRow(i).getCell(i).toString();
                //console.log("Column B value from the row '"+i+"' : "+ cellValue)

                //var username = inboundWorksheet.getRow(2).getCell(1).toString();
                //console.log(username)

            }

            var leave_type = inboundWorksheet.getRow(4).getCell(6).toString();
            var select_location = inboundWorksheet.getRow(2).getCell(4).toString();
            var select_leave_type = inboundWorksheet.getRow(2).getCell(10).toString();
            var select_job_title = inboundWorksheet.getRow(2).getCell(11).toString();
            var select_leave_period = inboundWorksheet.getRow(4).getCell(7).toString();
            var select_employee_name = inboundWorksheet.getRow(4).getCell(9).toString();
            var select_leaveentitlement = inboundWorksheet.getRow(4).getCell(8).toString();
            var searchleave_pending = inboundWorksheet.getRow(2).getCell(12).toString();
            var searchleave_schedule = inboundWorksheet.getRow(2).getCell(13).toString();
            var searchleave_taken = inboundWorksheet.getRow(2).getCell(14).toString();
            var searchleave_leavebal = inboundWorksheet.getRow(2).getCell(15).toString();
            var selectexceltype = inboundWorksheet.getRow(2).getCell(16).toString();


            //console.log(selectlocation);
            //console.log(username);
            var username = element(by.name('userName'));
            username.sendKeys(browser.params.user_name);

            var userpassword = element(by.name('password'));
            userpassword.sendKeys(browser.params.user_password);

            var loginBtn = element(by.id('login'));
            loginBtn.click();
            browser.manage().timeouts().implicitlyWait(300000);

            //code to click on  Leave configuration module
            var clickadministration = element(by.xpath("//app-sidebar/div/ul/li[2]/a/div[1]/em"));
            browser.actions().mouseMove(clickadministration).perform();
            browser.sleep(2000);


            var clickleaveconfig = element(by.xpath("//a[contains(text(),'Leave Configuration')]"));
            browser.actions().mouseMove(clickleaveconfig).perform();
            browser.manage().timeouts().setScriptTimeout(360000);


            //code to click on reports  sub module
            var clickreport = element(by.linkText('Reports'));
            clickreport.click();
            browser.sleep(5000);


            //code for search type under report
            var report = element(by.xpath("//select[@id='searchType']")).click();
            //  element(by.xpath("//select[@id='searchType']//option[text()='Leave Type']")).click();
            if (!selectexceltype == leave_type) {


                element(by.xpath("//select[@id='searchType']//option[contains(text(),'" + leave_type + "')]")).click();


                var locate = element(by.xpath("//select[@id='license']")).click();
                element(by.xpath("//select[@id='license']//option[contains(text(),'" + select_location + "')]")).click();


                var select_leavetype = element(by.xpath("//select[@id='leavetype']")).click();
                element(by.xpath("//option[contains(text(),'" + select_leave_type + "')]")).click();

                var selectjob_title = element(by.xpath("//select[@id='jobtitle']")).click();
                element(by.xpath("//select[@id='jobtitle']//option[contains(text(),'" + select_job_title + "')]")).click();


                var selectleaveperiod = element(by.xpath("//select[@id='date']")).click();
                element(by.xpath("//select[@id='date']//option[contains(text(),'" + select_leave_period + "')]")).click();

            }

            else {
                var report1 = element(by.xpath("//select[@id='searchType']")).click();
                element(by.xpath("//select[@id='searchType']//option[contains(text(),'" + leave_type + "')]")).click();

                var selectleaveperiod = element(by.xpath("//select[@id='datePeriod']")).click();
                element(by.xpath("//option[contains(text(),'" + select_leave_period + "')]")).click();


                var selectleaveperiod = element(by.xpath("//select[@id='employee']")).click();
                element(by.xpath("//option[contains(text(),'" + select_employee_name + "')]")).click();

            }

            var clickview = element(by.buttonText('View'));
            clickview.click();

            //code for search functionality for search type

            if (selectexceltype == leave_type) {

                var searchEmployeename = element(by.xpath("//input[@id='searchReportUser']"));
                searchEmployeename.click();
                searchEmployeename.sendKeys(select_employee_name);
                searchEmployeename.click();
                expect(searchEmployeename.getAttribute('value')).toBe(select_employee_name);
                browser.sleep(3000);
                searchEmployeename.clear();
            }
            else {
                var searchlevtype = element(by.xpath("//input[@id='searchLeavetype']"));
                searchlevtype.click();
                searchlevtype.sendKeys(select_leave_type);
                searchlevtype.click();
                expect(searchlevtype.getAttribute('value')).toBe(select_leave_type);
                browser.sleep(2000);
                searchlevtype.clear();
            }

            var searchleaveEntiledays = element(by.xpath("//input[@id='searchNumberOfDays']"));
            searchleaveEntiledays.click();
            searchleaveEntiledays.sendKeys(select_leaveentitlement);
            expect(searchleaveEntiledays.getAttribute('value')).toBe(select_leaveentitlement);
            searchleaveEntiledays.clear();
            browser.sleep(2000);

            var searchpendingdays = element(by.xpath("//input[@id='SearchPendingDays']"));
            searchpendingdays.click();
            searchpendingdays.sendKeys(searchleave_pending);
            expect(searchpendingdays.getAttribute('value')).toBe(searchleave_pending);
            searchpendingdays.clear();
            browser.sleep(2000);


            var searchschedule = element(by.xpath("//input[@id='searchLeaveScheduled']"));
            searchschedule.click();
            searchschedule.sendKeys(searchleave_schedule);
            expect(searchschedule.getAttribute('value')).toBe(searchleave_schedule);
            searchschedule.clear();
            browser.sleep(2000);


            var searchleavetaken = element(by.xpath("//input[@id='searchleaveTacken']"));
            searchleavetaken.click();
            searchleavetaken.sendKeys(searchleave_taken);
            expect(searchleavetaken.getAttribute('value')).toBe(searchleave_taken);
            searchleavetaken.clear();
            browser.sleep(2000);

            var searchleavebal = element(by.xpath("//input[@id='searchbalanceDays']"));
            searchleavebal.click();
            searchleavebal.sendKeys(searchleave_leavebal);
            expect(searchleavebal.getAttribute('value')).toBe(searchleave_leavebal);
            searchleavebal.clear();
            browser.sleep(2000);

        });

    });
});