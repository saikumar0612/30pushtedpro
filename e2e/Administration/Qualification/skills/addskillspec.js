var Excel = require('exceljs');

var inboundWorkbook = new Excel.Workbook();
inboundWorkbook.xlsx.readFile("F:/Jasmine/TestData/department.xlsx").then(function () {
    var inboundWorksheet = inboundWorkbook.getWorksheet(1);
    browser.waitForAngularEnabled(false);
    
    var totalRowsIncludingEmptyRows = inboundWorksheet.rowCount
    for (var i = 1; i <= totalRowsIncludingEmptyRows; i++) {
        var cellValue = inboundWorksheet.getRow(i).getCell(i).toString();
       
    }

    global.skilname = inboundWorksheet.getRow(2).getCell(18).toString();
    global.skildesp = inboundWorksheet.getRow(2).getCell(19).toString();

    global.defskilname = inboundWorksheet.getRow(3).getCell(18).toString();
    global.defskildesp = inboundWorksheet.getRow(3).getCell(19).toString();

});


describe('Code for Add Skills  under Qualification  Module', function () {
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

    it('click the skills sub module', function () {
        var clickskill = element(by.xpath("//a[contains(text(),'Skills')]"));
        clickskill.click();

    });
    //code to click on add
    it('click on add icon', function () {
        var clickaddicon = element(by.xpath("//a[@id='addskill']"));
        clickaddicon.click();

    });
    it('Enter the qualification name', function () {
        var entertername = element(by.id('qalName'));
        entertername.sendKeys(skilname);

    });

    it('Enter the description', function () {
        var enterdescp = element(by.name('qalDesc'));
        enterdescp.sendKeys(skildesp);

    });


    it('click on submit button', function () {
        var clicksubmit = element(by.buttonText('Submit'));
        clicksubmit.click();

    });

    //code to view pop up messge

    it('verify pop up message and click on viewskills page', function () {

        var popup = element(by.xpath("//p[@class='bg-success']")).getText();
        expect(popup.getText()).toEqual(popup);

        var clickpopupmessage = element(by.xpath("//a[@id='viewskills']"));
        clickpopupmessage.click();
        browser.sleep(3000);

    });

    
    //code for search functionality under skills
    it('Enter the search name in the search field', function () {
        var searchname = element(by.id('searchname'));
        searchname.sendKeys(skilname);
        expect(searchname.getAttribute('value')).toBe(skilname);
        searchname.click();
        browser.sleep(1000);

    });

    it('Enter the description under the search field', function () {
        var searchdesp = element(by.id('searchvalue'));
        searchdesp.sendKeys(skildesp);
        expect(searchdesp.getAttribute('value')).toBe(skildesp);
        searchdesp.click();
        browser.sleep(1000);

    });


    //code to click on name 
    it('click on skill name', function () {
        var clickname = element(by.xpath("//table[1]/tbody[1]/tr[2]/td[3]/a[1]")).click();
    });

    it('click on close button', function () {
        var clickclose = element(by.xpath("//a[@id=' closepopup']")).click();
        browser.sleep(2000);
    });


    //code to click on view icon 
    it('click on bar icon', function () {
        var clickbaricon = element(by.xpath("//tr[2]//td[2]//a[1]//div[1]//i[1]")).click();

    });
    it('click on view icon', function () {
        var clickviewicon = element(by.xpath("//tr[2]//td[2]//li[2]//button[1]"));
        clickviewicon.click();

    });

    it('click on close button', function () {

        var clickclosebtn = element(by.xpath("//a[@id=' closepopup']")).click();
        browser.sleep(2000);
    });


});


describe('Code for Edit  Skills  under Qualification  Module', function () {
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

    it('click the skills sub module', function () {
        var clickskill = element(by.xpath("//a[contains(text(),'Skills')]"));
        clickskill.click();

    });
  
    

    //code for search functionality under skills
    it('Enter the search name in the search field', function () {
        var searchname = element(by.id('searchname'));
        searchname.sendKeys(skilname);
        expect(searchname.getAttribute('value')).toBe(skilname);
        searchname.click();
        browser.sleep(1000);

    });
   
    it('click on bar icon', function () {
        var clickbaricon = element(by.xpath("//tr[2]//td[2]//a[1]//div[1]//i[1]")).click();

    });

    it('click on Edit icon', function () {
        var clickediticon = element(by.xpath("//tr[2]//td[2]//div[1]//div[1]//ul[1]//li[1]//button[1]//i[1]"));
        clickediticon.click();

    });

    it('Edit the qualification name', function () {
        var editrname = element(by.id('qalName'));
        editrname.sendKeys(defskilname);

    });

    it('Edit the description', function () {
        var Editdescp = element(by.name('qalDesc'));
        Editdescp.sendKeys(defskildesp);

    });


    it('click on submit button', function () {
        var clicksubmit = element(by.buttonText('Submit'));
        clicksubmit.click();

    });

    //code to view pop up messge

    it('verify pop up message and click on viewskills page', function () {

        var popup = element(by.xpath("//p[@class='bg-success']")).getText();
        expect(popup.getText()).toEqual(popup);

        var clickpopupmessage = element(by.xpath("//a[@class='btn btn-success ml-5']"));
        clickpopupmessage.click();
        browser.sleep(3000);

    });
    
});

describe('Code for Reset Skills  under Qualification  Module', function () {
    browser.ignoreSynchronization = true; // for non-angular websites
    it('open the browser', function () {
        browser.get(browser.params.url);
        // set implicit time to 30 seconds
        browser.manage().window().maximize();
        browser.manage().timeouts().implicitlyWait(30000);
    });

    it('Enter the login username', function () {
        var username = element(by.name('userName'));
        username.sendKeys(browser.params.user_name);

    });

    it('Enter the password', function () {

        //console.log(loginpassword);
        var userpassword = element(by.name('password'));
        userpassword.sendKeys(browser.params.user_password);

    });


    it('click on login button', function () {

        var loginBtn = element(by.id('login'));
        loginBtn.click();
        browser.manage().timeouts().implicitlyWait(300000);

    });

    //code to click on  Qualification  module
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

    it('click the skills sub module', function () {
        var clickskill = element(by.xpath("//a[contains(text(),'Skills')]"));
        clickskill.click();

    });
    //code for reset functionality

    it('click on add icon', function () {
        var clickaddicon = element(by.xpath("//a[@id='addskill']"));
        clickaddicon.click();

    });

    it('Enter the qualification name', function () {
        var entertername = element(by.id('qalName'));
        entertername.sendKeys(skilname);

        if (!expect(entertername.getAttribute('value')).toEqual(skilname))
        {
            console.log("values are  reset to default values:", skilname);
        }
        else
        {
            console.log("values are reset to default values:", skilname);
        }


    });

    it('Enter the description', function () {
        var enterdescp = element(by.name('qalDesc'));
        enterdescp.sendKeys(skildesp);


        if (!expect(enterdescp.getAttribute('value')).toEqual(skildesp))
        {
            console.log("values are  reset to default values:", skildesp);
        }
        else
        {
            console.log("values are reset to default values:", skildesp);
        }


    });
    it('code to click on reset button', function () {
        var clickreset = element(by.buttonText('Reset'));
        clickreset.click();

    });


    it('code to click on cancel button', function () {
        var clickcancel = element(by.buttonText('Cancel'));
        clickcancel.click();
        browser.sleep(3000);

    });

  
});


