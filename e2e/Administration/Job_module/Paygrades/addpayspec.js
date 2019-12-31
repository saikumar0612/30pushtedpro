var Excel = require('exceljs');

  // create object for workbook
        var inboundWorkbook = new Excel.Workbook();
inboundWorkbook.xlsx.readFile("F:/Jasmine/TestData/department.xlsx").then(function () {
    var inboundWorksheet = inboundWorkbook.getWorksheet(1);
    browser.waitForAngularEnabled(false);
    var totalRowsIncludingEmptyRows = inboundWorksheet.rowCount
    for (var i = 1; i <= totalRowsIncludingEmptyRows; i++) {
        var cellValue = inboundWorksheet.getRow(i).getCell(i).toString();
       
    }
  
    global.enterpaygrade = inboundWorksheet.getRow(2).getCell(6).toString();
    global.minsal = inboundWorksheet.getRow(2).getCell(7).toString();
    global.maxsal = inboundWorksheet.getRow(2).getCell(8).toString();
    global.searchcurrency = inboundWorksheet.getRow(2).getCell(9).toString();

    global.editminsal = inboundWorksheet.getRow(3).getCell(7).toString();
    global.editmaxsal = inboundWorksheet.getRow(3).getCell(8).toString();
    global.editsearchcurrency = inboundWorksheet.getRow(3).getCell(9).toString();


});

describe('Code for add pay grades under Job  Module', function () {
    browser.ignoreSynchronization = true; // for non-angular websites
    it('open the browser', function () {
        browser.get(browser.params.url);
        // set implicit time to 30 seconds
        browser.manage().window().maximize();
        browser.manage().timeouts().implicitlyWait(30000);
    });
      // browser.debugger();
      
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
    //code to click on Job Module
    it('click on job', function () {
        var clickjob = element(by.xpath("//ul[@class='main-menu']/li[1]/div[1]/div[3]/ul[1]/li[2]/a[1]"));
        clickjob.click();

    });
    it('click on pay grades', function () {
        //code to click on pay grades sub module
        var clickpaygrades = element(by.xpath("//a[contains(text(),'Pay Grades')]"));
        clickpaygrades.click();
        browser.sleep(5000);

    });

    it('click on add pay grade', function () {
        //code to click on Add button

        var cickadd = element(by.xpath("//a[@id='addpaygrade']"));
        cickadd.click();
        browser.sleep(5000);

    });

    it('Enter the pay name', function () {
        var enterpayname = element(by.id('payName'));
        enterpayname.sendKeys(enterpaygrade);


    });
    it('click on submit button', function () {

        var clicksubmit = element(by.buttonText('Submit'));
        clicksubmit.click();


    });

          
    it('verify pop up and click on view paygrade', function () {
        //code to view pop up messge

        var popup = element(by.xpath("//p[@class='bg-success']")).getText();
        expect(popup.getText()).toEqual(popup);

        var clickpopupmessage = element(by.xpath("//a[@id='viewpaygrades']"));
        //console.log(clickpopupmessage);
        clickpopupmessage.click();
        browser.sleep(5000);


    });

});

describe('Code for search,Edit   pay grades  under Job  Module', function () {
    browser.ignoreSynchronization = true; // for non-angular websites
    it('open the browser', function () {
        browser.get(browser.params.url);
        // set implicit time to 30 seconds
        browser.manage().window().maximize();
        browser.manage().timeouts().implicitlyWait(30000);
    });
    // browser.debugger();

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
    //code to click on Job Module
    it('click on job', function () {
        var clickjob = element(by.xpath("//ul[@class='main-menu']/li[1]/div[1]/div[3]/ul[1]/li[2]/a[1]"));
        clickjob.click();

    });
    it('click on pay grades', function () {
        //code to click on pay grades sub module
        var clickpaygrades = element(by.xpath("//a[contains(text(),'Pay Grades')]"));
        clickpaygrades.click();
        browser.sleep(5000);

    });

    it('search the paygrade name', function () {
        //code for search pay grades

        var searchpaygrade = element(by.xpath("//input[@id='searchname']"));
        searchpaygrade.sendKeys(enterpaygrade);
        expect(searchpaygrade.getAttribute('value')).toBe(enterpaygrade);
        searchpaygrade.click();
        browser.sleep(1000);

    });

   

    it('Click on Edit pay grade icon', function () {
        //code to click on pay grde name
        var clickpaygradename = element(by.xpath("//table[1]//tr[2]/td[2]//div[1]/i[1]"));
        clickpaygradename.click();
        browser.sleep(5000);

    });


    it('Click on Edit pay grade name icon', function () {
        //code to click on pay grde name
        var clickeditpaygradename = element(by.xpath("//table[1]/tbody[1]//div[1]/ul[1]/li[1]/a[1]/button[1]/i[1]"));
        clickeditpaygradename.click();
        browser.sleep(5000);

    });

    it('Click on Edit button icon', function () {

        var clickeditpayicon = element(by.xpath("//button[@id='add']"));
        clickeditpayicon.click();
        browser.sleep(5000);

    });

    //code for add salary details
    it('Enter minimum salary for the paygrade ', function () {
      
        var enter_minsal = element(by.id('minSalary'));
        enter_minsal.sendKeys(minsal);
        browser.sleep(1000);

    });       

    it('Enter maximum salary for the paygrade ', function () {

        var enter_maxsal = element(by.id('maxSalary'));
        enter_maxsal.sendKeys(maxsal);
        browser.sleep(1000);

    }); 

    it('Select the currency from the dropdown', function () {
        var currencyselect = element(by.xpath("//select[@id='currency']")).click();
        var entercurrency = element(by.xpath("//select[@id='currency']//option[contains(text(),'" + searchcurrency + "')]")).click();
       
    });

    it('click on submit button', function () {
        var clicksubmit = element(by.xpath("//div[3]//form[1]//button[1]"));
        clicksubmit.click();
        browser.sleep(1000);
    });

            
    it('code to verify pop up message and click on view all buton', function () {
        //code to view pop up messge

        var popup = element(by.xpath("//p[@class='bg-success']")).getText();
        expect(popup.getText()).toEqual(popup);

        var clickpopupmessage = element(by.xpath("//a[@class='btn btn-success mlr-5']"));
        //console.log(clickpopupmessage);
        clickpopupmessage.click();
        browser.sleep(5000);


    });
       
});

describe('Code for view, search  pay grades with  under Job  Module', function () {
    browser.ignoreSynchronization = true; // for non-angular websites
    it('open the browser', function () {
        browser.get(browser.params.url);
        // set implicit time to 30 seconds
        browser.manage().window().maximize();
        browser.manage().timeouts().implicitlyWait(30000);
    });
    // browser.debugger();

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
    //code to click on Job Module
    it('click on job', function () {
        var clickjob = element(by.xpath("//ul[@class='main-menu']/li[1]/div[1]/div[3]/ul[1]/li[2]/a[1]"));
        clickjob.click();

    });
    it('click on pay grades', function () {
        //code to click on pay grades sub module
        var clickpaygrades = element(by.xpath("//a[contains(text(),'Pay Grades')]"));
        clickpaygrades.click();
        browser.sleep(5000);

    });

    it('search the paygrade name', function () {
        //code for search pay grades

        var searchpaygrade = element(by.xpath("//input[@id='searchname']"));
        searchpaygrade.sendKeys(enterpaygrade);
        expect(searchpaygrade.getAttribute('value')).toBe(enterpaygrade);
        searchpaygrade.click();
        browser.sleep(1000);

    });

    it('search min sal in search field', function () {
        var searchminsal = element(by.xpath("//input[@id='searchminSalary']"));
        searchminsal.sendKeys(minsal);
        expect(searchminsal.getAttribute('value')).toBe(minsal);
        searchminsal.click();
        browser.sleep(1000);

    });

    it('search max sal value', function () {
        var searchmaxsal = element(by.xpath("//input[@id='searchmaxSalary']"));
        searchmaxsal.sendKeys(maxsal);
        expect(searchmaxsal.getAttribute('value')).toBe(maxsal);
        searchmaxsal.click();
        browser.sleep(1000);

    });

    //it('search the value in search field', function () {
    //    var currency = element(by.xpath("//input[@id='searchvalue']"));
    //    currency.sendKeys(searchcurrency);
    //    expect(currency.getAttribute('value')).toBe(searchcurrency);
    //    currency.click();
    //    browser.sleep(1000);

    //});



    it('Click on  pay grade icon', function () {
        //code to click on pay grde name
        var clickpaygradename = element(by.xpath("//table[1]//tr[2]/td[2]//div[1]/i[1]"));
        clickpaygradename.click();
        browser.sleep(5000);

    });


    it('Click on view pay grade name icon', function () {
        //code to click on pay grde name
        var clickviewpaygradename = element(by.xpath("//table[1]/tbody[1]//div[1]/ul[1]/li[2]//button[1]/i[1]"));
        clickviewpaygradename.click();
        browser.sleep(5000);

    });

    it('Click on Edit button icons', function () {

        var clickeditpayicon = element(by.xpath("//a[@id='vieweditpaygrades']"));
        clickeditpayicon.click();
        browser.sleep(5000);

    });

    it('Click on Edit button icon', function () {

        var clickeditpay_icon = element(by.xpath("//button[@id='add']"));
        clickeditpay_icon.click();
        browser.sleep(5000);

    });

    //code for add salary details
    it('Edit minimum salary for the paygrade ', function () {

        var enter_minsal = element(by.id('minSalary'));
        enter_minsal.click();
        enter_minsal.clear();
        enter_minsal.sendKeys(editminsal);
        browser.sleep(1000);

    });

    it('Edit maximum salary for the paygrade ', function () {

        var enter_maxsal = element(by.id('maxSalary'));
        enter_maxsal.click();
        enter_maxsal.clear();
        enter_maxsal.sendKeys(editmaxsal);
        browser.sleep(1000);

    });

    it('Edit the currency from the dropdown', function () {
        var currencyselect = element(by.xpath("//select[@id='currency']")).click();
        var entercurrency = element(by.xpath("//select[@id='currency']//option[contains(text(),'" + editsearchcurrency + "')]")).click();

    });

    it('click on submit button', function () {
        var clicksubmit = element(by.xpath("//div[3]//form[1]//button[1]"));
        clicksubmit.click();
        browser.sleep(1000);
    });


    it('code to verify pop up message and click on view all buton', function () {
        //code to view pop up messge

        var popup = element(by.xpath("//p[@class='bg-success']")).getText();
        expect(popup.getText()).toEqual(popup);

        var clickpopupmessage = element(by.xpath("//a[@class='btn btn-success mlr-5']"));
        //console.log(clickpopupmessage);
        clickpopupmessage.click();
        browser.sleep(5000);


    });

});


describe('Code for Reset  pay grades with  under Job  Module', function () {
    browser.ignoreSynchronization = true; // for non-angular websites
    it('open the browser', function () {
        browser.get(browser.params.url);
        // set implicit time to 30 seconds
        browser.manage().window().maximize();
        browser.manage().timeouts().implicitlyWait(30000);
    });
    // browser.debugger();

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
    //code to click on Job Module
    it('click on job', function () {
        var clickjob = element(by.xpath("//ul[@class='main-menu']/li[1]/div[1]/div[3]/ul[1]/li[2]/a[1]"));
        clickjob.click();

    });
    it('click on pay grades', function () {
        //code to click on pay grades sub module
        var clickpaygrades = element(by.xpath("//a[contains(text(),'Pay Grades')]"));
        clickpaygrades.click();
        browser.sleep(5000);

    });

    it('click on add pay grade', function () {
        var cickadd = element(by.xpath("//a[@id='addpaygrade']"));
        cickadd.click();
        browser.sleep(5000);

    });

    it('Enter the  Paygrade name', function () {

        var enterpayname = element(by.id('payName'));
        enterpayname.sendKeys(enterpaygrade);

        if (!expect(enterpayname.getAttribute('value')).toEqual(enterpaygrade))
        {
            console.log("values are  reset to default values:", enterpaygrade);
        }
        else
        {
            console.log("values are reset to default values:", enterpaygrade);
        }


    });

    it('click on reset', function () {
        var clickreset = element(by.buttonText('Reset'));
        clickreset.click();
    });



    it('click on cancel', function () {
        var clickcancel = element(by.buttonText('Cancel'));
        clickcancel.click();


    });


});
