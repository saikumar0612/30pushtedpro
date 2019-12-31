var Excel = require('exceljs');

//         // create object for workbook
         var inboundWorkbook = new Excel.Workbook();
inboundWorkbook.xlsx.readFile("F:/Jasmine/TestData/department.xlsx").then(function () {
    var inboundWorksheet = inboundWorkbook.getWorksheet(1);
    browser.waitForAngularEnabled(false);

    
    var totalRowsIncludingEmptyRows = inboundWorksheet.rowCount
    //console.log("total nuumber of rows : "+totalRowsIncludingEmptyRows)
    // loop till end of row
    for (var i = 1; i <= totalRowsIncludingEmptyRows; i++) {
        var cellValue = inboundWorksheet.getRow(i).getCell(i).toString();
       
    }
    
    global.language = inboundWorksheet.getRow(2).getCell(23).toString();
    global.deflanguage = inboundWorksheet.getRow(3).getCell(23).toString();



});

describe('Code for Add language,search language,view languages  under Qualification  Module', function () {
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

    //code to click on  Qualification module
    it('Hover on administration icon', function () {
        var clickadministration = element(by.xpath("//app-top-menu//div[1]/ul/li[1]/a"));
        browser.actions().mouseMove(clickadministration).perform();
        browser.sleep(2000);

    });


    it('click on qualification tab', function () {
        var clickqualificationTab = element(by.xpath("//a[contains(text(),'Qualification')]"));
        browser.actions().mouseMove(clickqualificationTab).perform();
        browser.sleep(2000);

    });


    it('click on languages', function () {
        var clicklanguage = element(by.xpath("//a[contains(text(),'Languages')]"));
        clicklanguage.click();

    });

    it('click on add languages', function () {
        var clickaddicon = element(by.xpath("//a[@id='addlanguage']"));
        clickaddicon.click();
    });

    it('enter language name', function () {
        var enterlanguagename = element(by.id('langName'));
        enterlanguagename.sendKeys(language);

    });

    it('submit language name', function () {
        var clicksubmit = element(by.buttonText('Submit'));
        clicksubmit.click();

    });


    it('verfiy successful message', function () {
        var popup = element(by.xpath("//p[@class='bg-success']")).getText();
        expect(popup.getText()).toEqual(popup);

    });

    it('Click on view all language', function () {
        var clickpopupmessage = element(by.xpath("//a[@id='languages']"));
        //console.log(clickpopupmessage);
        clickpopupmessage.click();

        browser.sleep(3000);
    });


    it('search  language', function () {
        //code for search functionality under education 
        var searchlanguage = element(by.id('searchname'));
        searchlanguage.click();
        searchlanguage.sendKeys(language);
        expect(searchlanguage.getAttribute('value')).toBe(language);
        browser.sleep(2000);

    });


    it('Click on view language', function () {
        //code to click on name 
        var clickonlanguagename = element(by.xpath("//table[1]/tbody[1]/tr[2]/td[3]/a[1]")).click();
    });

    it('click on close view language popup', function () {
        var clickclose = element(by.xpath("//a[@id='closePopup']")).click();

        browser.sleep(2000);
    });


    it('Hover for dispalay menu', function () {
        var clickbaricon = element(by.xpath("//tr[2]//td[2]//a[1]//div[1]//i[1]")).click();
    });


    it('click on view icon', function () {
        var clickviewicon = element(by.xpath("//tr[2]//td[2]//div[1]//ul[1]//li[2]//a[1]//button[1]//i[1]"));
        clickviewicon.click();
    });


    it('click on close view popup', function () {
        var clickclosebtn = element(by.xpath("//a[@id='closePopup']")).click();


    });
});

describe('Code for Edit  language by search language name under Qualification  Module', function () {
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

    //code to click on  Qualification module
    it('Hover on administration icon', function () {
        var clickadministration = element(by.xpath("//app-top-menu//div[1]/ul/li[1]/a"));
        browser.actions().mouseMove(clickadministration).perform();
        browser.sleep(2000);

    });


    it('click on qualification tab', function () {
        var clickqualificationTab = element(by.xpath("//a[contains(text(),'Qualification')]"));
        browser.actions().mouseMove(clickqualificationTab).perform();
        browser.sleep(2000);

    });


    it('click on languages', function () {
        var clicklanguage = element(by.xpath("//a[contains(text(),'Languages')]"));
        clicklanguage.click();

    });


    it('search  language', function () {
        //code for search functionality under education 
        var searchlanguage = element(by.id('searchname'));
        searchlanguage.click();
        searchlanguage.sendKeys(language);
        expect(searchlanguage.getAttribute('value')).toBe(language);
        browser.sleep(2000);

    });

    it('Hover for dispalay menu', function () {
        var clickbaricon = element(by.xpath("//tr[2]//td[2]//a[1]//div[1]//i[1]")).click();
    });


    it('click on edit icon', function () {
        var clickediticon = element(by.xpath("//tr[2]//td[2]//div[1]//div[1]//ul[1]//li[1]//button[1]"));
        clickediticon.click();
    });


    it('Edit language name', function () {
        var editlanguagename = element(by.id('langName'));
        editlanguagename.click();
        editlanguagename.clear();
        editlanguagename.sendKeys(deflanguage);

    });

    it('submit language name', function () {
        var clicksubmit = element(by.buttonText('Submit'));
        clicksubmit.click();

    });


    it('verfiy successful message', function () {
        var popup = element(by.xpath("//p[@class='bg-success']")).getText();
        expect(popup.getText()).toEqual(popup);

    });

    it('Click on view all language', function () {
        var clickpopupmessage = element(by.xpath("//a[@id='popuplanguages']"));
        //console.log(clickpopupmessage);
        clickpopupmessage.click();

        browser.sleep(3000);
    });
});

describe('Code for Reset language under Qualification  Module', function () {
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

    //code to click on  Qualification module
    it('Hover on administration icon', function () {
        var clickadministration = element(by.xpath("//app-top-menu//div[1]/ul/li[1]/a"));
        browser.actions().mouseMove(clickadministration).perform();
        browser.sleep(2000);

    });


    it('click on qualification tab', function () {
        var clickqualificationTab = element(by.xpath("//a[contains(text(),'Qualification')]"));
        browser.actions().mouseMove(clickqualificationTab).perform();
        browser.sleep(2000);

    });


    it('click on languages', function () {
        var clicklanguage = element(by.xpath("//a[contains(text(),'Languages')]"));
        clicklanguage.click();

    });

    it('click on add languages', function () {
        var clickaddicon = element(by.xpath("//a[@id='addlanguage']"));
        clickaddicon.click();
    });

    it('enter language name', function () {
        var enterlanguagename = element(by.id('langName'));
        enterlanguagename.sendKeys(language);

    });


    it('click on reset button', function () {
        var clickreseticon = element(by.xpath("//button[@id='reset']"));
        clickreseticon.click();
    });


    it('click on close view popup', function () {
        var clickclosebtn = element(by.xpath("//button[@id='cancel']")).click();


    });
});
