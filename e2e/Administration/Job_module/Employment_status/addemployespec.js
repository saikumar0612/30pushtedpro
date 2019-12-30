var Excel = require('exceljs');

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
    
    global.employee_status = inboundWorksheet.getRow(2).getCell(10).toString();
    global.editemployee_status = inboundWorksheet.getRow(3).getCell(10).toString();
    global.editemployee_statu = inboundWorksheet.getRow(4).getCell(10).toString();
    global.editemployee_statuees = inboundWorksheet.getRow(5).getCell(10).toString();

});

            

describe('Code for add ,search,click on emp name Employment Status under Job  Module', function () {
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

    it('click on employee status sub module', function () {
       
        var clickemployestatus = element(by.linkText('Employee status'));
        browser.actions().mouseMove(clickemployestatus).click().perform();
        browser.manage().timeouts().setScriptTimeout(360000);
        browser.sleep(5000);


    });

    it('click on job', function () {

    
        var cickadd = element(by.xpath("//a[@id='addemploymentstatus']"));
        cickadd.click();
        browser.sleep(5000);

    });     
    it('Enter the employee status name', function () {

        var enterstatusname = element(by.id('empStatus'));
        enterstatusname.sendKeys(employee_status);

    });
        
    it('click on submit button', function () {

        var clicksubmit = element(by.buttonText('Submit'));
        clicksubmit.click();

    });      

    it('verify pop up message and click on employeestatus button', function () {

        //code to view pop up messge

        var popup = element(by.xpath("//p[@class='bg-success']")).getText();
        expect(popup.getText()).toEqual(popup);

        var clickpopupmessage = element(by.xpath("//a[@id='popupemploymentstatus']"));
        //console.log(clickpopupmessage);
        clickpopupmessage.click();
        browser.sleep(5000);

    });
            
    it('Enter the employee status value in the field', function () {


        var searchemployeestatus = element(by.xpath("//input[@id='searchname']"));
        searchemployeestatus.sendKeys(employee_status);
        expect(searchemployeestatus.getAttribute('value')).toBe(employee_status);
        searchemployeestatus.click();
        browser.sleep(1000);

    });


    it('click on employee status name', function () {

        //code to click on pay grde name
        var clickemplyeestatusname = element(by.xpath("//*[@id='viewshowJobDetails']"));
        browser.actions().mouseMove(clickemplyeestatusname).click().perform();
        browser.sleep(5000);

    });
        
    it('click on edit employee status button', function () {

        //code to edit pay grade

        var editempstatus = element(by.xpath("//a[@id='employmentstatuspopup']"));
        editempstatus.click();
        browser.sleep(5000);
        
    });

    it('Edit the employeement status value in the field', function () {

        var editstaus = element(by.id('empStatus'));
        editstaus.click();
        editstaus.clear();
        editstaus.sendKeys(editemployee_status);

    });      

            

    it('click on submit button', function () {
        var clicksubmit = element(by.buttonText('Submit'));
        clicksubmit.click();

    });

       
    it('verify the pop up message and click on employee status button', function () {

        //code to view pop up messge

        var popup = element(by.xpath("//p[@class='bg-success']")).getText();
        expect(popup.getText()).toEqual(popup);

        var clickpopupmessages = element(by.xpath("//a[@id='employmentstatuspopup']"));
        //console.log(clickpopupmessage);
        clickpopupmessages.click();
        browser.sleep(5000);

    });
           
});

describe('Code for search,Click view icon under Employment Status under Job  Module', function () {
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

    it('click on employee status sub module', function () {

        var clickemployestatus = element(by.linkText('Employee status'));
        browser.actions().mouseMove(clickemployestatus).click().perform();
        browser.manage().timeouts().setScriptTimeout(360000);
        browser.sleep(5000);


    });

    it('Enter the employee status value in the field', function () {


        var searchemployeestatus = element(by.xpath("//input[@id='searchname']"));
        searchemployeestatus.sendKeys(editemployee_status);
        expect(searchemployeestatus.getAttribute('value')).toBe(editemployee_status);
        searchemployeestatus.click();
        browser.sleep(1000);

    });


    it('click on the icon', function () {

        var clickicons = element(by.xpath("//tr[2]//td[2]//a[1]//div[1]//i[1]"));
        clickicons.click();

    });

    it('click on the view  icon', function () {

        var clickviewicon = element(by.xpath("//tr[2]//td[2]//li[2]//a[1]//button[1]//i[1]"));
        clickviewicon.click();

    });

    it('click on the Edit employment status button  icon', function () {

        var clickempstatus = element(by.xpath("//a[@id='employmentstatuspopup']"));
        clickempstatus.click();

    });

    it('Edit the employeement status value in the field', function () {

        var editstaus = element(by.id('empStatus'));
        editstaus.click();
        editstaus.clear();
        editstaus.sendKeys(editemployee_statu);

    });      


    it('click on submit button', function () {

        var clicksubmit = element(by.buttonText('Submit'));
        clicksubmit.click();

    });

    it('verify pop up message and click on employeestatus button', function () {

        //code to view pop up messge

        var popup = element(by.xpath("//p[@class='bg-success']")).getText();
        expect(popup.getText()).toEqual(popup);

        var clickpopupmessage = element(by.xpath("//a[@id='employmentstatuspopup']"));
        //console.log(clickpopupmessage);
        clickpopupmessage.click();
        browser.sleep(5000);

    });


});


describe('Code for search,Click Edit icon under Employment Status under Job  Module', function () {
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

    it('click on employee status sub module', function () {

        var clickemployestatus = element(by.linkText('Employee status'));
        browser.actions().mouseMove(clickemployestatus).click().perform();
        browser.manage().timeouts().setScriptTimeout(360000);
        browser.sleep(5000);


    });

    it('Enter the employee status value in the field', function () {


        //code for search pay grades

        var searchemployeestatus = element(by.xpath("//input[@id='searchname']"));
        searchemployeestatus.sendKeys(editemployee_statu);
        expect(searchemployeestatus.getAttribute('value')).toBe(editemployee_statu);
        searchemployeestatus.click();
        browser.sleep(1000);

    });


    it('click on the icon', function () {

        var clickicons = element(by.xpath("//tr[2]//td[2]//a[1]//div[1]//i[1]"));
        clickicons.click();

    });

    it('click on the Edit  icon', function () {

        var clickEditicon = element(by.xpath("//tr[2]//td[2]//div[1]//div[1]//ul[1]//li[1]//button[1]//i[1]"));
        clickEditicon.click();

    });

  

    it('Edit the employeement status value in the field', function () {

        var editstaus = element(by.id('empStatus'));
        editstaus.click();
        editstaus.clear();
        editstaus.sendKeys(editemployee_statuees);

    });


    it('click on submit button', function () {

        var clicksubmit = element(by.buttonText('Submit'));
        clicksubmit.click();

    });

    it('verify pop up message and click on employeestatus button', function () {

        //code to view pop up messge

        var popup = element(by.xpath("//p[@class='bg-success']")).getText();
        expect(popup.getText()).toEqual(popup);

        var clickpopupmessage = element(by.xpath("//a[@id='employmentstatuspopup']"));
        //console.log(clickpopupmessage);
        clickpopupmessage.click();
        browser.sleep(5000);

    });

  
});

describe('Code for Reset Employee status under Job  Module', function () {
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


    it('click on employee status sub module', function () {

        var clickemployestatus = element(by.linkText('Employee status'));
        browser.actions().mouseMove(clickemployestatus).click().perform();
        browser.manage().timeouts().setScriptTimeout(360000);
        browser.sleep(5000);


    });

    it('click on job', function () {

        //code to click on Add button

        var cickadd = element(by.xpath("//a[@id='addemploymentstatus']"));
        cickadd.click();
        browser.sleep(5000);



    });

    it('Enter the status name', function () {

        var enterstatusname = element(by.id('empStatus'));
        enterstatusname.sendKeys(employee_status);

        if (!expect(enterstatusname.getAttribute('value')).toEqual(employee_status))
        {
            console.log("values are  reset to default values:", employee_status);
        }
        else
        {
            console.log("values are reset to default values:", employee_status);
        }


    });

    it('click on reset button', function () {

        var clickreset = element(by.buttonText('Reset'));
        clickreset.click();

    });


    it('click on cancel button', function () {

        var clickcancel = element(by.buttonText('Cancel'));
        clickcancel.click();


    });


});


