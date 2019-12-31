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
           
    global.deptname = inboundWorksheet.getRow(2).getCell(1).toString();
    global.ejobtitle = inboundWorksheet.getRow(2).getCell(2).toString();
    global.ejobdesp = inboundWorksheet.getRow(2).getCell(3).toString();
    global.education = inboundWorksheet.getRow(2).getCell(4).toString();
    global.enotes = inboundWorksheet.getRow(2).getCell(5).toString();


    global.editdeptnames = inboundWorksheet.getRow(3).getCell(1).toString();
    global.editejobtitle = inboundWorksheet.getRow(3).getCell(2).toString();
    global.editejobdesp = inboundWorksheet.getRow(3).getCell(3).toString();
    global.editeducations = inboundWorksheet.getRow(3).getCell(4).toString();
    global.editenotes = inboundWorksheet.getRow(3).getCell(5).toString();

         });




describe('Code for Edit ,Reset Job titles under Job  Module', function () {
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
    //code to click on Job Module
    it('click on job', function () {
        var clickjob = element(by.xpath("//ul[@class='main-menu']/li[1]/div[1]/div[3]/ul[1]/li[2]/a[1]"));
        clickjob.click();

    });

    it('click on job Titles', function () {
        var click_jobtitles = element(by.xpath("//a[contains(text(),'Job Titles')]"));
        click_jobtitles.click();
        browser.sleep(2000);
    });

    it('click on add job', function () {
        var cickadd = element(by.xpath("//a[@id='addjobtitle']"));
        cickadd.click();
        browser.sleep(5000);
    });


    it('select the department from dropdown', function () {
        var selectdeptname = element(by.xpath("//select[@id='selectdept']//option[contains(text(),'" + deptname + "')]")).click();
        if (!expect(selectdeptname.getText()).toEqual(deptname))
        {
            console.log("values are  reset to default values:", deptname);
        }
        else
        {
            console.log("values are reset to default values:", deptname);
        }

    });



    it('enter job title', function () {
        var enterjobtitle = element(by.id('jobtitle'));
        enterjobtitle.sendKeys(ejobtitle);
        if (!expect(enterjobtitle.getAttribute('value')).toEqual(ejobtitle))
        {
            console.log("values are  reset to default values:", ejobtitle);
        }
        else
        {
            console.log("values are reset to default values:", ejobtitle);
        }
    });

    it('enter job Description', function () {
        var enterjobdesc = element(by.id('jobDesc'));
        enterjobdesc.sendKeys(ejobdesp);
        if (!expect(enterjobdesc.getAttribute('value')).toEqual(ejobdesp))
        {
            console.log("values are  reset to default values:", ejobdesp);
        }
        else
        {
            console.log("values are reset to default values:", ejobdesp);
        }

    });


    it('enter job Minimum Education', function () {
        var enter_mimieducation = element(by.name('minimumEdu'));
        enter_mimieducation.sendKeys(education);

        if (!expect(enter_mimieducation.getAttribute('value')).toEqual(education)) {
            console.log("values are  reset to default values:", education);
        }
        else {
            console.log("values are reset to default values:", education);
        }
    });


    it('enter job Note', function () {
        var enternotes = element(by.id('jobNote'));
        enternotes.sendKeys(enotes);
        if (!expect(enternotes.getAttribute('value')).toEqual(enotes))
        {
            console.log("values are  reset to default values:", enotes);
        }
        else
        {
            console.log("values are reset to default values:", enotes);
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

describe('Code for View and edit Job titles under Job  Module', function () {
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

    //code to click on  administration module

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

    //code to click on job titles submodule
    it('click on job title', function () {

        var click_jobtitles = element(by.xpath("//a[contains(text(),'Job Titles')]"));
        click_jobtitles.click();
        browser.sleep(2000);

    });



    it('search the job title', function () {
        //code to search JOB TTILES
        var searchjobtitle = element(by.xpath("//input[@id='searchjobtitle']"));
        searchjobtitle.click();
        searchjobtitle.sendKeys(editejobtitle);
        expect(searchjobtitle.getAttribute('value')).toBe(editejobtitle);
        browser.sleep(1000);

    });



    it('click on  icon tab', function () {

        var clickicon_tab = element(by.xpath("//tr[2]//td[2]//a[1]//div[1]//i[1]")).click();
    });

    it('click on view icon', function () {
        //code to edit job titles
        var clickviewicon = element(by.xpath("//tr[2]//td[2]//div[1]//ul[1]//li[2]//button[1]"));
        clickviewicon.click();
        browser.sleep(1000);

    });
    
    it('click on edit job title', function () {

        var clickediticon = element(by.xpath("//div[@class='row text-center']//a[@id='editjob']"));
        clickediticon.click();
        browser.sleep(1000);
    });


    it('edit the department name', function () {
        var editdeptname = element(by.xpath("//select[@id='selectdept']//option[contains(text(),'" + editdeptnames + "')]")).click();
    });

    it('edit the job title', function () {

        var editjobtitle = element(by.id('jobTitle'));
        editjobtitle.click();
        editjobtitle.clear();
        editjobtitle.sendKeys(editejobtitle);

    });


    it('edit the job description', function () {

        var enterjobdesc = element(by.id('jobDesc'));
        enterjobdesc.click();
        enterjobdesc.clear();
        enterjobdesc.sendKeys(editejobdesp);

    });

    it('Edit the minimum education', function () {
        var editeducation = element(by.id('minimumEducation'));
        editeducation.click();
        editeducation.clear();
        editeducation.sendKeys(editeducations);


    });

    it('edit the job note', function () {
        var enternotes = element(by.id('jobNote'));
        enternotes.click();
        enternotes.clear();
        enternotes.sendKeys(editenotes);

    });


    it('click on submit button', function () {
        var clicksubmit = element(by.buttonText('Submit'));
        clicksubmit.click();

    });


    it('verify pop up message', function () {
        //code to view pop up messge

        var popup = element(by.xpath("//p[@class='bg-success']")).getText();
        expect(popup.getText()).toEqual(popup);

        var clickpopupmessage = element(by.xpath("//a[@id='viewjobtitles']"));
        //console.log(clickpopupmessage);
        clickpopupmessage.click();
        browser.sleep(5000);

    });



});

describe('Code for edit Job titles under Job  Module', function () {
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

    //code to click on  administration module

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

    //code to click on job titles submodule
    it('click on job title', function () {

        var click_jobtitles = element(by.xpath("//a[contains(text(),'Job Titles')]"));
        click_jobtitles.click();
        browser.sleep(2000);

    });



    it('search the job title', function () {
        //code to search JOB TTILES
        var searchjobtitle = element(by.xpath("//input[@id='searchjobtitle']"));
        searchjobtitle.click();
        searchjobtitle.sendKeys(editejobtitle);
        expect(searchjobtitle.getAttribute('value')).toBe(editejobtitle);
        browser.sleep(1000);

    });



    it('click on  icon tab', function () {

        var clickicon_tab = element(by.xpath("//tr[2]//td[2]//a[1]//div[1]//i[1]")).click();
    });

    it('click on view icon', function () {
        //code to edit job titles
        var clicediticon = element(by.xpath("//tr[2]//td[2]//div[1]//ul[1]//li[1]//button[1]//i[1]"));
        clicediticon.click();
        browser.sleep(1000);

    });



    it('edit the department name', function () {
        var editdeptname = element(by.xpath("//select[@id='selectdept']//option[contains(text(),'" + editdeptnames + "')]")).click();
    });

    it('edit the job title', function () {

        var editjobtitle = element(by.id('jobTitle'));
        editjobtitle.click();
        editjobtitle.clear();
        editjobtitle.sendKeys(editejobtitle);

    });


    it('edit the job description', function () {

        var enterjobdesc = element(by.id('jobDesc'));
        enterjobdesc.click();
        enterjobdesc.clear();
        enterjobdesc.sendKeys(editejobdesp);

    });

    it('Edit the minimum education', function () {
        var editeducation = element(by.id('minimumEducation'));
        editeducation.click();
        editeducation.clear();
        editeducation.sendKeys(editeducations);


    });

    it('edit the job note', function () {
        var enternotes = element(by.id('jobNote'));
        enternotes.click();
        enternotes.clear();
        enternotes.sendKeys(editenotes);

    });


    it('click on submit button', function () {
        var clicksubmit = element(by.buttonText('Submit'));
        clicksubmit.click();

    });


    it('verify pop up message', function () {
        //code to view pop up messge

        var popup = element(by.xpath("//p[@class='bg-success']")).getText();
        expect(popup.getText()).toEqual(popup);

        var clickpopupmessage = element(by.xpath("//a[@id='viewjobtitles']"));
        //console.log(clickpopupmessage);
        clickpopupmessage.click();
        browser.sleep(5000);

    });



});


