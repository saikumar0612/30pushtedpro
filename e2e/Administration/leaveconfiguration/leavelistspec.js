var Excel = require('F:/node_modules/exceljs');
describe('Code for leave list under  Leave configuration  Module', function () {
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

           
            var select_leave_type = inboundWorksheet.getRow(5).getCell(6).toString();
            var select_leave_period = inboundWorksheet.getRow(5).getCell(7).toString();
            var select_employee_name = inboundWorksheet.getRow(5).getCell(9).toString();
            var searchtotal_days = inboundWorksheet.getRow(5).getCell(17).toString();
            var search_status = inboundWorksheet.getRow(5).getCell(18).toString();
            var search_comments = inboundWorksheet.getRow(5).getCell(19).toString();
            var searchleave_leavebal = inboundWorksheet.getRow(5).getCell(15).toString();


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
            var clickreport = element(by.linkText('Leave List'));
            clickreport.click();
            browser.sleep(5000);


            //code for search functionality for search type
                var searchdate = element(by.xpath("//input[@id='searchleaveApplication']"));
                searchdate.click();
                searchdate.sendKeys(select_leave_period);
                searchdate.click();
                expect(searchdate.getAttribute('value')).toBe(select_leave_period);
                browser.sleep(3000);
                searchdate.clear();

                var searchEmployeename = element(by.xpath("//input[@id='searchUser']"));
                searchEmployeename.click();
                searchEmployeename.sendKeys(select_employee_name);
                searchEmployeename.click();
                expect(searchEmployeename.getAttribute('value')).toBe(select_employee_name);
                browser.sleep(3000);
                searchEmployeename.clear();
           
                var searchlevtype = element(by.xpath("//input[@id='searchLeavetype']"));
                searchlevtype.click();
                searchlevtype.sendKeys(select_leave_type);
                searchlevtype.click();
                expect(searchlevtype.getAttribute('value')).toBe(select_leave_type);
                browser.sleep(2000);
                searchlevtype.clear();
          
                var searchleavebal = element(by.xpath("//input[@id='searchBalance']"));
                searchleavebal.click();
                searchleavebal.sendKeys(searchleave_leavebal);
                expect(searchleavebal.getAttribute('value')).toBe(searchleave_leavebal);
                searchleavebal.clear();
                browser.sleep(2000);


                var searchnoofdays = element(by.xpath("//input[@id='searchTotalDays']"));
                searchnoofdays.click();
                searchnoofdays.sendKeys(searchtotal_days);
                expect(searchnoofdays.getAttribute('value')).toBe(searchtotal_days);
                searchnoofdays.clear();
                browser.sleep(2000);

                var searchstatus = element(by.xpath("//input[@id='searchStatus']"));
                searchstatus.click();
                searchstatus.sendKeys(search_status);
                expect(searchstatus.getAttribute('value')).toBe(search_status);
                searchstatus.clear();
                browser.sleep(2000);


                var searchcomments = element(by.xpath("//input[@id='searchComment']"));
                searchcomments.click();
                searchcomments.sendKeys(search_comments);
                expect(searchcomments.getAttribute('value')).toBe(search_comments);
                searchcomments.clear();
                browser.sleep(3000);

            //code to click on view icon

            var clickviewicons = element(by.xpath("//tr[2]//td[2]//div[1]//i[1]"));
            clickviewicons.click();

            var clickview = element(by.xpath("//tr[2]//td[2]//div[1]//button[1]"));
            clickview.click();


            //var enterdescp = element(by.id('comment')).click();
            //enterdescp.sendKeys("approve");

            //clickapprovebtn = element(by.buttonText('Approve'));
            //clickapprovebtn.click();

            //clickrejectbtn = element(by.buttonText('Reject'));
            //clickrejectbtn.click();

            var clickclosebtn = element(by.buttonText('Close'));
            clickclosebtn.click();



            
        });

    });
});