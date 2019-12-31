var Excel = require('F:/node_modules/exceljs');
describe('Assign Leave', function () {
    browser.ignoreSynchronization = true; // for non-angular websites
    it('Login functionality module', function () {
        browser.get(browser.params.url);

        browser.manage().window().maximize();
        browser.manage().timeouts().implicitlyWait(30000);

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

            var employee = inboundWorksheet.getRow(5).getCell(5).toString();
            var leavetype = inboundWorksheet.getRow(5).getCell(6).toString();
            var comments = inboundWorksheet.getRow(5).getCell(19).toString();
            var fromdates = inboundWorksheet.getRow(5).getCell(20).toString();
            var to_date = inboundWorksheet.getRow(5).getCell(21).toString();
            var partial_days = inboundWorksheet.getRow(5).getCell(22).toString();
            var day_time = inboundWorksheet.getRow(5).getCell(23).toString();
            var day_times = inboundWorksheet.getRow(5).getCell(24).toString();
            var day_Time2 = inboundWorksheet.getRow(5).getCell(25).toString();

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

            var assignLeave = element(by.xpath("//a[contains(text(),'Assign Leave')]"));
            assignLeave.click();

            browser.sleep(2000);

            var selectEmployee = element(by.xpath("//select[@id='emp_name']"));
            selectEmployee.click();
            element(by.xpath("//option[contains(text(),'" + employee +"')]")).click();

            var leaveType = element(by.xpath("//span[@class='dropdown-btn']"));
            leaveType.click();



            var searchLeaveType = element(by.xpath("//input[@placeholder='Search']")).click();
            searchLeaveType.sendKeys(leavetype);

            var clickcheckbox = element(by.xpath("//div[contains(text(),'" + leavetype+"')]"));
            clickcheckbox.click();

            var fromDate = element(by.name('from_date'));
            fromDate.sendKeys(fromdates);
            browser.sleep(2000);

            var toDate = element(by.name('to_date'));
            toDate.sendKeys(to_date);
            browser.sleep(2000);


            var partialDay = partial_days;


            var selectPartialDays = element(by.cssContainingText('option', partialDay));
            selectPartialDays.click();
            browser.sleep(3000);

            if (partialDay == 'All Days' || partialDay == 'Start Day Only' || partialDay == 'End Day Only')
            {

                var dayTime = day_time;

                var duration1 = element(by.cssContainingText('option', dayTime));
                duration1.click();

                if (dayTime == 'Half Day') {

                    var duration2 = element(by.cssContainingText('option', 'Afternoon'));
                    duration2.click();

                }

            }
            else if (partialDay == 'Start and End Days')
            {

                var duration1 = element(by.xpath("//select[@id='startday']"));
                duration1.click();
                var dayTime1 = day_times;

                element(by.xpath("//select[@id='startday']//option[contains(text(),'" + dayTime1 + "')]")).click();


                if (dayTime1 == 'Half Day') {

                    element(by.id("starttime")).click();
                    element(by.xpath("//select[@id='starttime']//option[contains(text(),'Morning')]")).click();

                }

                var duration3 = element(by.xpath("//select[@id='endday']"));
                duration3.click();
                var dayTime2 = day_Time2;

                element(by.xpath("//select[@id='endday']//option[contains(text(), '" + dayTime2 + "')]")).click();


                if (dayTime2 == 'Half Day') {
                    element(by.xpath("//select[@id='endtime']")).click();
                    element(by.xpath("//select[@id='endtime']//option[contains(text(),'Afternoon')]")).click();
                }


            }



            var comment = element(by.name('comment'));
            comment.sendKeys(comments);
            browser.sleep(2000);


        var assignLeave = element(by.id('assignLeave'));
        assignLeave.click();


        var close = element(by.id('closePopup1'));
        close.click();

        browser.sleep(4000);

    });
    });
});