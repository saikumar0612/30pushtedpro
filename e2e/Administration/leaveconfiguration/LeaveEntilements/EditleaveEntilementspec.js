var Excel = require('F:/node_modules/exceljs');
describe('Code for Edit leave Entitlement under  Leave configuration  Module', function () {
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
            var selectlocation = inboundWorksheet.getRow(3).getCell(4).toString();
            var employeetype = inboundWorksheet.getRow(3).getCell(5).toString();
            var leavetype = inboundWorksheet.getRow(3).getCell(6).toString();
            var leaveperiod = inboundWorksheet.getRow(3).getCell(7).toString();
            var entitlement = inboundWorksheet.getRow(3).getCell(8).toString();
            var selectemp = inboundWorksheet.getRow(3).getCell(9).toString();

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


            //code to click on Leave type  sub module
            var clickleaveentitlements = element(by.xpath("//ul[@class='sub-sub-menu']//a[contains(text(),'Entitlements')]"));
            clickleaveentitlements.click();

            browser.sleep(4000);


            //code to click on Edit icon
            var clickicon = element(by.xpath("//tr[2]//td[2]//a[1]//div[1]//i[1]"));
            clickicon.click();

            var editiconclick = element(by.xpath("//tr[2]//td[2]//button[1]"));
            editiconclick.click();

           
            //code for Edit leave Entitlements
            var checkbox = element(by.id("employee")).isSelected();
            if (checkbox == true) {
                element(by.id("employee")).click();
                var locate = element(by.xpath("//select[@id='location']")).click();
                element(by.xpath("//select[@name='location']//option[contains(text(),'" + selectlocation + "')]")).click();


                var employee_type = element(by.xpath("//select[@id='role_name']")).click();
                element(by.xpath("//select[@name='role_name']//option[contains(text(),'" + employeetype + "')]")).click();

            }
            else
            {
                var selectemployee = element(by.xpath("//select[@id='empname']")).click();
                element(by.xpath("//select[@name='empname']//option[contains(text(),'" + selectemp + "')]")).click();
            }



            var selectleave = element(by.xpath("//select[@id='leave_type']")).click();
            element(by.xpath("//select[@name='leave_type']//option[contains(text(),'" + leavetype + "')]")).click();



            var selectleaveperiod = element(by.xpath("//select[@id='title']")).click();
            element(by.xpath("//select[@id='title']//option[contains(text(),'" + leaveperiod + "')]")).click();

            var entitlements = element(by.id('days'));
            entitlements.click();
            entitlements.clear();
            entitlements.sendKeys(entitlement);

            var clicksavebutton = element(by.xpath("//button[@id='add']"));
            clicksavebutton.click();
            browser.sleep(3000);

            //code to verify pop up message


            var popup = element(by.xpath("//p[@class='bg-success']")).getText();
            expect(popup.getText()).toEqual(popup);

            var clickpopupmessage = element(by.linkText('View all Entitlements'));
            //console.log(clickpopupmessage);
            clickpopupmessage.click();

            browser.sleep(5000);

           


        });

    });
});