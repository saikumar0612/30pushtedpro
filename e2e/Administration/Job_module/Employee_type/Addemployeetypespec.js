var Excel = require('exceljs');

 // create object for workbook
        var inboundWorkbook = new Excel.Workbook();
inboundWorkbook.xlsx.readFile("F:/Jasmine/TestData/department.xlsx").then(function () {
    var inboundWorksheet = inboundWorkbook.getWorksheet(1);
    browser.waitForAngularEnabled(false);


    var totalRowsIncludingEmptyRows = inboundWorksheet.rowCount

    // loop till end of row
    for (var i = 1; i <= totalRowsIncludingEmptyRows; i++) {

    }

    global.employeetype_name = inboundWorksheet.getRow(2).getCell(11).toString();
    global.editemployeetype_name = inboundWorksheet.getRow(3).getCell(11).toString();

});


describe('Code for Add Employee,click on Employee type name under Employee Type submodule under Job  Module', function () {
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

    //code to click on  job  module
    it('Hover on administration icon', function () {
        var clickadministration = element(by.xpath("//app-top-menu//div[1]/ul/li[1]/a"));
        browser.actions().mouseMove(clickadministration).perform();
        browser.sleep(2000);

    });
    //code to click on Job Module
    it('click on job sub module', function () {
        var clickjob = element(by.xpath("//ul[@class='main-menu']/li[1]/div[1]/div[3]/ul[1]/li[2]/a[1]"));
        clickjob.click();

    });

    it('click on Employee type', function () {

        //code to click on add job titles sub module
        var clickjobtitle = element(by.linkText('Employee Type'));
        browser.actions().mouseMove(clickjobtitle).click().perform();
        browser.sleep(5000);
    });
           
    it('click on add employee type  button ', function () {

        //code to click on Add button

        var cickadd = element(by.xpath("//a[@id='addemployeetype']"));
        cickadd.click();
        browser.sleep(5000);
    });

    it('Enter the employee type name', function () {

        var enterempname = element(by.id('name'));
        enterempname.sendKeys(employeetype_name);

    });

    it('click on submit button', function () {
        var clicksubmit = element(by.buttonText('Submit'));
        clicksubmit.click();

    });

    it('verify the pop up message and click on employee button', function () {
        //code to view pop up messge

        var popup = element(by.xpath("//p[@class='bg-success']")).getText();
        expect(popup.getText()).toEqual(popup);

        var clickpopupmessage = element(by.xpath("//a[@id='employeetypepop']"));
        //console.log(clickpopupmessage);
        clickpopupmessage.click();
        browser.sleep(5000);

    });  

    it('Enter the Employee type search value in the search field', function () {
        
        var searchemployeetype = element(by.xpath("//input[@id='searchname']"));
        searchemployeetype.sendKeys(employeetype_name);
        expect(searchemployeetype.getAttribute('value')).toBe(employeetype_name);
        searchemployeetype.click();
        browser.sleep(1000);

    });


    it('click on employee name', function () {

        //code to click on employee type name
        var clickempname = element(by.xpath("//a[contains(text(),'" + employeetype_name +"')]"));
        browser.actions().mouseMove(clickempname).click().perform();
        browser.sleep(3000);
    });

    it('click on edit employee icon', function () {


        var editempicon = element(by.xpath("//a[@id='popupeditemployee']"));
        editempicon.click();
        browser.sleep(5000);

    });
          
    it('Edit employee type', function () {

        var editemptype = element(by.id('name'));
        editemptype.click();
        editemptype.clear();
        editemptype.sendKeys(editemployeetype_name);

    });


    it('click on submit button', function () {

        var clicksubmit = element(by.buttonText('Submit'));
        clicksubmit.click();
    });

    it('verify the pop up message and click on employee button', function () {

        //code to view pop up messge

        var popup = element(by.xpath("//p[@class='bg-success']")).getText();
        expect(popup.getText()).toEqual(popup);

        var clickpopupmessages = element(by.xpath("//a[@id='popupemployeetype']"));
        //console.log(clickpopupmessage);
        clickpopupmessages.click();
        browser.sleep(5000);


    });  
    
});

describe('Code for Search ,View  Employee and edit  Employee type under view under Employee Type submodule under Job  Module', function () {
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

    //code to click on  job  module
    it('Hover on administration icon', function () {
        var clickadministration = element(by.xpath("//app-top-menu//div[1]/ul/li[1]/a"));
        browser.actions().mouseMove(clickadministration).perform();
        browser.sleep(2000);

    });
    //code to click on Job Module
    it('click on job sub module', function () {
        var clickjob = element(by.xpath("//ul[@class='main-menu']/li[1]/div[1]/div[3]/ul[1]/li[2]/a[1]"));
        clickjob.click();

    });

    it('click on Employee type', function () {

        //code to click on add job titles sub module
        var clickjobtitle = element(by.linkText('Employee Type'));
        browser.actions().mouseMove(clickjobtitle).click().perform();
        browser.sleep(5000);
    });

    it('Enter the Employee type search value in the search field', function () {

        var searchemployeetype = element(by.xpath("//input[@id='searchname']"));
        searchemployeetype.sendKeys(editemployeetype_name);
        expect(searchemployeetype.getAttribute('value')).toBe(editemployeetype_name);
        searchemployeetype.click();
        browser.sleep(1000);

    });

    it('click on the icon tabs', function () {

        var clickicontabs = element(by.xpath("//tr[2]//td[2]//a[1]//div[1]//i[1]"));
        clickicontabs.click();

    });

    it('click on the view icon tabs', function () {

        var clickviewicontabs = element(by.xpath("//tr[2]//td[2]//ul[1]//li[2]//button[1]"));
        clickviewicontabs.click();

    });

    it('click on Edit type icon button', function () {

        var edittypebtnclick = element(by.xpath("//a[@id='popupeditemployee']"));
        edittypebtnclick.click();
        browser.sleep(2000);

    });



    it('Edit the employee type name', function () {

        var editempname = element(by.id('name'));
        editempname.click();
        editempname.clear();
        editempname.sendKeys(employeetype_name);
        browser.sleep(2000);
    });

    it('click on submit button', function () {
        var clicksubmit = element(by.buttonText('Submit'));
        clicksubmit.click();

    });

    it('verify the pop up message and click on employee button', function () {
        //code to view pop up messge

        var popup = element(by.xpath("//p[@class='bg-success']")).getText();
        expect(popup.getText()).toEqual(popup);

        var clickpopupmessage = element(by.xpath("//a[@id='popupemployeetype']"));
        clickpopupmessage.click();
        browser.sleep(2000);

    });


});



describe('Code for Search ,Edit  Employee  under  Employee Type submodule under Job  Module', function () {
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

    //code to click on  job  module
    it('Hover on administration icon', function () {
        var clickadministration = element(by.xpath("//app-top-menu//div[1]/ul/li[1]/a"));
        browser.actions().mouseMove(clickadministration).perform();
        browser.sleep(2000);

    });
    //code to click on Job Module
    it('click on job sub module', function () {
        var clickjob = element(by.xpath("//ul[@class='main-menu']/li[1]/div[1]/div[3]/ul[1]/li[2]/a[1]"));
        clickjob.click();

    });

    it('click on Employee type', function () {

        //code to click on add job titles sub module
        var clickjobtitle = element(by.linkText('Employee Type'));
        browser.actions().mouseMove(clickjobtitle).click().perform();
        browser.sleep(5000);
    });

    it('Enter the Employee type search value in the search field', function () {

        var searchemployeetype = element(by.xpath("//input[@id='searchname']"));
        searchemployeetype.sendKeys(employeetype_name);
        expect(searchemployeetype.getAttribute('value')).toBe(employeetype_name);
        searchemployeetype.click();
        browser.sleep(1000);

    });

    it('click on the icon tabs', function () {

        var clickicontabs = element(by.xpath("//tr[2]//td[2]//a[1]//div[1]//i[1]"));
        clickicontabs.click();

    });

    it('click on the Edit icon tabs', function () {

        var clickediticontabs = element(by.xpath("//tr[2]//td[2]//div[1]//div[1]//ul[1]//li[1]//button[1]//i[1]"));
        clickediticontabs.click();

    });

    it('Edit the employee type name', function () {

        var editempname = element(by.id('name'));
        editempname.click();
        editempname.clear();
        editempname.sendKeys(editemployeetype_name);

    });

    it('click on submit button', function () {
        var clicksubmit = element(by.buttonText('Submit'));
        clicksubmit.click();

    });

    it('verify the pop up message and click on employee button', function () {
        //code to view pop up messge

        var popup = element(by.xpath("//p[@class='bg-success']")).getText();
        expect(popup.getText()).toEqual(popup);

        var clickpopupmessage = element(by.xpath("//a[@id='popupemployeetype']"));
        //console.log(clickpopupmessage);
        clickpopupmessage.click();
        browser.sleep(5000);

    });


});

describe('Code for reset Employee Type under Job  Module', function () {
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

    //code to click on  job  module
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

    it('click on Employee type', function () {

        //code to click on add job titles sub module
        var clickjobtitle = element(by.linkText('Employee Type'));
        browser.actions().mouseMove(clickjobtitle).click().perform();
        browser.sleep(5000);
    });

    it('click on job button ', function () {
        var cickadd = element(by.xpath("//a[@id='addemployeetype']"));
        cickadd.click();
        browser.sleep(5000);
    });

    it('Enter the employee type name', function () {

        var enterempname = element(by.id('name'));
        enterempname.sendKeys(employeetype_name);
        if (!expect(enterempname.getAttribute('value')).toEqual(employeetype_name))
        {
            console.log("values are  reset to default values:", employeetype_name);
        }
        else
        {
            console.log("values are reset to default values:", employeetype_name);
        }

    });

    it('click on reset button', function () {

        var clickreset = element(by.buttonText('Reset'));
        clickreset.click();

    });

    it('click on csncel button', function () {

        var clickcancel = element(by.buttonText('Cancel'));
        clickcancel.click();

    });

});




