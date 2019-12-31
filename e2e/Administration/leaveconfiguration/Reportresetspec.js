var Excel = require('F:/node_modules/exceljs');
describe('Code for Report Reset under  Leave configuration  Module', function () {
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
           
            var selectexceltype = inboundWorksheet.getRow(2).getCell(16).toString();


            var devselect_location = inboundWorksheet.getRow(2).getCell(4).toString();
            var devselect_leave_type = inboundWorksheet.getRow(2).getCell(10).toString();
            var devselect_job_title = inboundWorksheet.getRow(2).getCell(11).toString();
            var devselect_leave_period = inboundWorksheet.getRow(4).getCell(7).toString();
            var devselect_employee_name = inboundWorksheet.getRow(4).getCell(9).toString();
       



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

            if (!selectexceltype == leave_type)
            {

                element(by.xpath("//select[@id='searchType']//option[text()='Leave Type']")).click();
                
                var locate = element(by.xpath("//select[@id='license']")).click();
                var value = element(by.xpath("//select[@id='license']//option[contains(text(),'" + select_location + "')]")).click();
               // value.getText();
                if (!expect(value.getText()).toEqual(devselect_location))
                {
                    console.log("values are  reset to default values:", devselect_location);
                }
                else
                {
                    console.log("values are reset to default values:", devselect_location);
                }
                


                var selectleave = element(by.xpath("//select[@id='leavetype']")).click();
                var value2 = element(by.xpath("//option[contains(text(),'" + select_leave_type + "')]")).click();
                if (!expect(value2.getText()).toEqual(devselect_leave_type))
                {
                    console.log("values are  reset to default values", devselect_leave_type);
                }
                else
                {
                    console.log("values are reset to default values", devselect_leave_type);
                }




                var selectjob = element(by.xpath("//select[@id='jobtitle']")).click();
                var valu3 = element(by.xpath("//select[@id='jobtitle']//option[contains(text(),'" + select_job_title + "')]")).click();

                if (!expect(valu3.getText()).toEqual(devselect_job_title))
                {
                    console.log("values are  reset to default values", devselect_job_title);
                }
                else
                {
                    console.log("values are  to default values", devselect_job_title);
                }


                var selectleaveperiod = element(by.xpath("//select[@id='date']")).click();
                var val = element(by.xpath("//option[contains(text(),'" + select_leave_period + "')]")).click();

                if (!expect(val.getText()).toEqual(devselect_leave_period))
                {
                    console.log("values are  reset to default values", devselect_leave_period);
                }
                else
                {
                    console.log("values are reset to default values", devselect_leave_period);
                }

            }

            else
            {

                var report1 = element(by.xpath("//select[@id='searchType']")).click();
                element(by.xpath("//select[@id='searchType']//option[contains(text(),'" + leave_type + "')]")).click();

                var selectleaveperiod = element(by.xpath("//select[@id='datePeriod']")).click();
                var result = element(by.xpath("//option[contains(text(),'" + select_leave_period + "')]")).click();

                if (!expect(result.getText()).toEqual(devselect_leave_period))
                {
                    console.log("values are  reset to default values", devselect_leave_period);
                }
                else
                {
                    console.log("values are reset to default values", devselect_leave_period);
                }



                var selectleaveperiod = element(by.xpath("//select[@id='employee']")).click();
                var res = element(by.xpath("//option[contains(text(),'" + select_employee_name + "')]")).click();

                if (!expect(res.getText()).toEqual(devselect_employee_name))
                {
                    console.log("values are  reset to default values", devselect_employee_name);
                }
                else
                {
                    console.log("values are reset to default values", devselect_employee_name);
                }

            }

            var clickreset = element(by.buttonText('Reset'));
            clickreset.click();

           

        });

    });
});