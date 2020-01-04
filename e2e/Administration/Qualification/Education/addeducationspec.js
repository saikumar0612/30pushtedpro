var Excel = require('H:/Jasmine/node_modules/exceljs');

// create object for workbook
        var inboundWorkbook = new Excel.Workbook();
inboundWorkbook.xlsx.readFile("H:/tesingpro/30pushtedpro/e2e/TestData/department.xlsx").then(function () {
    var inboundWorksheet = inboundWorkbook.getWorksheet(1);
    browser.waitForAngularEnabled(false);

    var totalRowsIncludingEmptyRows = inboundWorksheet.rowCount

    for (var i = 1; i <= totalRowsIncludingEmptyRows; i++) {
        var cellValue = inboundWorksheet.getRow(i).getCell(i).toString();

    }

    global.education = inboundWorksheet.getRow(2).getCell(20).toString();
    global.defeducation = inboundWorksheet.getRow(3).getCell(20).toString();

});    

describe('Code for Add ,Search ,Click on Education name  under Education Sub Module  under Qualification  Module', function () {
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

    it('click on education ', function () {
        var clickeducation = element(by.xpath("//a[contains(text(),'Education')]"));
        clickeducation.click();

    });

        //code to click on add
    it('click on add education button', function () {
        var clickaddicon = element(by.xpath("//a[@id='addeducation']"));
        clickaddicon.click();

    });

    it('Enter the education name', function () {
        var entereducation = element(by.id('eduName'));
        entereducation.sendKeys(education);

    });

    it('click on submit button', function () {
        var clicksubmit = element(by.buttonText('Submit'));
        clicksubmit.click();

    });


    it('code to verify pop up message and click on view education button', function () {
        var popup = element(by.xpath("//p[@class='bg-success']")).getText();
        expect(popup.getText()).toEqual(popup);

        var clickpopupmessage = element(by.xpath("//a[@id='vieweducation']"));
        clickpopupmessage.click();
        browser.sleep(3000);

    });

    //code for search functionality under education 

    it('search the education name under the search field', function () {

        var searchEducationName = element(by.id('searchname'));
        searchEducationName.sendKeys(education);
        expect(searchEducationName.getAttribute('value')).toBe(education);
        searchEducationName.click();
        browser.sleep(2000);


    });

    //code to click on education  name 

    it('click on education name under the search field value', function () {

        var clickname = element(by.xpath("//table[1]/tbody[1]/tr[2]/td[3]/a[1]")).click();
    });


    it('code to click on close button', function () {

        var clickclose = element(by.xpath("//a[@id='closePopup']")).click();

        browser.sleep(2000);


    });
    it('code to click on view bar icon', function () {

        //code to click on view icon 
        var clickbaricon = element(by.xpath("//tr[2]//td[2]//a[1]//div[1]//i[1]")).click();


    });

    it('code to click on view icon', function () {
        var clickviewicon = element(by.xpath("//tr[2]//td[2]//div[1]//ul[1]//li[2]//a[1]//button[1]"));
        clickviewicon.click();

    });
      
          
    it('code to click on close button', function () {

        var clickclosebtn = element(by.xpath("//a[@id='closePopup']")).click();
        browser.sleep(2000);

    });

});

describe('Code for Edit ,Search   under Education Sub Module  under Qualification  Module', function () {
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

    it('click on education ', function () {
        var clickeducation = element(by.xpath("//a[contains(text(),'Education')]"));
        clickeducation.click();

    });

   

    it('search the education name under the search field', function () {

        var searchEducationName = element(by.id('searchname'));
        searchEducationName.sendKeys(education);
        expect(searchEducationName.getAttribute('value')).toBe(education);
        searchEducationName.click();
        browser.sleep(2000);


    });

 
    it('code to click on view bar icon', function () {

        //code to click on view icon 
        var clickbaricon = element(by.xpath("//tr[2]//td[2]//a[1]//div[1]//i[1]")).click();


    });

    it('code to click on edit icon', function () {
        var clickediticon = element(by.xpath("//tr[2]//td[2]//div[1]//div[1]//ul[1]//li[1]//button[1]"));
        clickediticon.click();

    });

    it('Edit the education name', function () {
        var editeducation = element(by.id('eduName'));
        editeducation.click();
        editeducation.clear();
        editeducation.sendKeys(defeducation);

    });

    it('click on submit button', function () {
        var clicksubmit = element(by.buttonText('Submit'));
        clicksubmit.click();

    });


    it('code to verify pop up message and click on view education button', function () {
        var popup = element(by.xpath("//p[@class='bg-success']")).getText();
        expect(popup.getText()).toEqual(popup);

        var clickpopupmessage = element(by.xpath("//a[@id='vieweducation']"));
        clickpopupmessage.click();
        browser.sleep(3000);

    });

});

describe('Code for reset  Education  under Qualification  Module', function () {
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

    it('click on education ', function () {
        var clickeducation = element(by.xpath("//a[contains(text(),'Education')]"));
        clickeducation.click();

    });

    it('click on add education button', function () {
        var clickaddicon = element(by.xpath("//a[@id='addeducation']"));
        clickaddicon.click();

    });

    it('Enter the education name', function () {
        var entereducation = element(by.id('eduName'));
        entereducation.sendKeys(education);

        if (!expect(entereducation.getAttribute('value')).toEqual(education))
        {
            console.log("values are  reset to default values:", education);
        }
        else
        {
            console.log("values are reset to default values:", education);
        }

    });


    it('click on reset button', function () {

        var clickreset = element(by.buttonText('Reset'));
        clickreset.click();


    });

    it('click  on cancel button', function () {

        var clickcancel = element(by.buttonText('Cancel'));
        clickcancel.click();


    });

    
});




   