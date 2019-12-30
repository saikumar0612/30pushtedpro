var Excel = require('exceljs');


  // create object for workbook
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
    
    global.member = inboundWorksheet.getRow(2).getCell(22).toString();
    global.defmember = inboundWorksheet.getRow(3).getCell(22).toString();

});

describe('Code for Add,search,view Member list  under Qualification  Module', function () {
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

    it('click on membership', function () {

        var clickmemberships = element(by.xpath("//a[contains(text(),'Memberships')]"));
        clickmemberships.click();

    });

    it('click on add icon', function () {

        var clickaddicon = element(by.xpath("//a[@id='addmembership']"));
        clickaddicon.click();

    });

    it('enter the membership name', function () {

        var entermembershipname = element(by.id('memName'));
        entermembershipname.sendKeys(member);

    });

    it('click on submit button', function () {

        var clicksubmit = element(by.buttonText('Submit'));
        clicksubmit.click();

    });
      
    it('verify pop up message and click on view membership button', function () {


        var popup = element(by.xpath("//p[@class='bg-success']")).getText();
        expect(popup.getText()).toEqual(popup);

        var clickpopupmessage = element(by.xpath("//a[@id='popmemberships']"));
        //console.log(clickpopupmessage);
        clickpopupmessage.click();

        browser.sleep(5000);


    });

    it('enter the membership name under the search field', function () {

        var searchmember = element(by.id('searchname')).click();
        searchmember.sendKeys(member);
        searchmember.click();
        expect(searchmember.getAttribute('value')).toBe(member);
        browser.sleep(1000);

    });

    it('click on membership name', function () {

        var clickmembername = element(by.xpath("//table[1]/tbody[1]/tr[2]/td[3]/a[1]")).click();
    });


    it('click on close button', function () {

        var clickclose = element(by.xpath("//a[@id='closePopup']")).click();

        browser.sleep(2000);
    });
       


    it('code to click on bar icon', function () {


        var clickbaricon = element(by.xpath("//tr[2]//td[2]//a[1]//div[1]//i[1]")).click();


    });

    it('click on view icon', function () {

        var clickviewicon = element(by.xpath("//tr[2]//td[2]//div[1]//ul[1]//li[2]//a[1]//button[1]//i[1]"));
        clickviewicon.click();

    });

    it('click on close button', function () {
        var clickclosebtn = element(by.xpath("//a[@id='closePopup']")).click();
    });

               
});

describe('Code for search, Edit Member name  under Qualification  Module', function () {
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

    it('click on membership', function () {

        var clickmemberships = element(by.xpath("//a[contains(text(),'Memberships')]"));
        clickmemberships.click();

    });

   

    it('enter the membership name under the search field', function () {

        var searchmember = element(by.id('searchname')).click();
        searchmember.sendKeys(member);
        searchmember.click();
        expect(searchmember.getAttribute('value')).toBe(member);
        browser.sleep(1000);

    });


    it('code to click on bar icon', function () {


        var clickbaricon = element(by.xpath("//tr[2]//td[2]//a[1]//div[1]//i[1]")).click();


    });

    it('click on Edit icon', function () {

        var clickediticon = element(by.xpath("//tr[2]/td[2]//div[1]/ul[1]/li[1]/a[1]/button[1]"));
        clickediticon.click();

    });


    it('Edit the membership name', function () {

        var editmembershipname = element(by.id('memName'));
        editmembershipname.click();
        editmembershipname.clear();
        editmembershipname.sendKeys(defmember);

    });

    it('click on submit button', function () {

        var clicksubmit = element(by.buttonText('Submit'));
        clicksubmit.click();

    });

    it('verify pop up message and click on view membership button', function () {


        var popup = element(by.xpath("//p[@class='bg-success']")).getText();
        expect(popup.getText()).toEqual(popup);

        var clickpopupmessage = element(by.xpath("//a[@id='viewmemberships']"));
        //console.log(clickpopupmessage);
        clickpopupmessage.click();

        browser.sleep(5000);


    });

});

describe('Code for Reset functionality for Member list  under Qualification  Module', function () {
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

    it('click on membership', function () {

        var clickmemberships = element(by.xpath("//a[contains(text(),'Memberships')]"));
        clickmemberships.click();

    });

    it('click on add icon', function () {

        var clickaddicon = element(by.xpath("//a[@id='addmembership']"));
        clickaddicon.click();

    });

    it('enter the membership name', function () {

        var entermembershipname = element(by.id('memName'));
        entermembershipname.sendKeys(member);

        if (!expect(entermembershipname.getAttribute('value')).toEqual(member)) {
            console.log("values are  reset to default values:", member);
        }
        else {
            console.log("values are reset to default values:", member);
        }


    });

   
    it('click on Reset button', function () {

        var click_resetbtn = element(by.xpath("//button[@id='reset']")).click();
    });


    it('click on close button', function () {

        var clickclose = element(by.xpath("//button[@id='cancel']")).click();

        browser.sleep(2000);
    });
   

});


