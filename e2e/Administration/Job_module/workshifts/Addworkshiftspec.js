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

    global.shiftnames = inboundWorksheet.getRow(2).getCell(12).toString();
    global.assignemployee = inboundWorksheet.getRow(2).getCell(13).toString();
    global.starthourss = inboundWorksheet.getRow(2).getCell(14).toString();
    global.startminutess = inboundWorksheet.getRow(2).getCell(15).toString();
    global.startendhourss = inboundWorksheet.getRow(2).getCell(16).toString();
    global.startendminutess = inboundWorksheet.getRow(2).getCell(17).toString();
  

    global.edit_shiftnames = inboundWorksheet.getRow(3).getCell(12).toString();
    global.editassignemployee = inboundWorksheet.getRow(3).getCell(13).toString();
    global.editstarthourss = inboundWorksheet.getRow(3).getCell(14).toString();
    global.editstartminutess = inboundWorksheet.getRow(3).getCell(15).toString();
    global.editstartendhourss = inboundWorksheet.getRow(3).getCell(16).toString();
    global.editstartendminutess = inboundWorksheet.getRow(3).getCell(17).toString();

    global.searchshiftnames = inboundWorksheet.getRow(4).getCell(12).toString();
    global.editsearchshiftnames = inboundWorksheet.getRow(5).getCell(12).toString();
});




describe('Code for Add work shift name under Work shifts submodule under Job Module', function () {

    browser.ignoreSynchronization = true; // for non-angular websites


    it('open the browser', function () {
        browser.get(browser.params.url);
        // set implicit time to 30 seconds
        browser.manage().window().maximize();
        browser.manage().timeouts().implicitlyWait(30000);
    });
    // browser.debugger();
    // create object for workbook

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

    it('click on work shifts', function () {

        var clickworkshifts = element(by.xpath("//a[contains(text(),'Work Shifts')]"));
        clickworkshifts.click();
        browser.sleep(2000);

    });

    it('click on add button', function () {

        var cickadd = element(by.xpath("//a[@id='addworkshifts']"));
        cickadd.click();
        browser.sleep(5000);

    });

    it('enter the shift name', function () {

        var entershiftname = element(by.name('shiftName'));
        entershiftname.sendKeys(shiftnames);

    });

    it('code to enter hours under  the start hours', function () {

        var enterhours = element(by.xpath("//ngb-timepicker[@name='startTime']//input[@placeholder='HH']"));
        enterhours.click();
        enterhours.clear();
        enterhours.sendKeys(starthourss);

    });

    it('code to enter minutes under  the start hours', function () {

        var enterminhrs = element(by.xpath("//ngb-timepicker[@name='startTime']//input[@placeholder='MM']"));
        enterminhrs.click();
        enterminhrs.clear();
        enterminhrs.sendKeys(startminutess);

    });

    it('code to enter hours under  the End hours', function () {

        var enterendhours = element(by.xpath("//ngb-timepicker[@name='endTime']//input[@placeholder='HH']"));
        enterendhours.click();
        enterendhours.clear();
        enterendhours.sendKeys(startendhourss);

    });

    it('code to enter minutes under  the End hours', function () {

        var enterendminhrs = element(by.xpath("//ngb-timepicker[@name='endTime']//input[@placeholder='MM']"));
        enterendminhrs.click();
        enterendminhrs.clear();
        enterendminhrs.sendKeys(startendminutess);

    });



    it('code to assign employees', function () {

        var assignemp = element(by.xpath("//span[@class='dropdown-btn']"));
        assignemp.click();

    });



    it('Enter the value in the search field', function () {

        var entersearcvalue = element(by.xpath("//input[@placeholder='Search']"));
        entersearcvalue.sendKeys(assignemployee);

    });


    it('code to click on the checkbox', function () {

        var clickcheck = element(by.xpath("//div[contains(text(),'" + assignemployee +"')]"));
        clickcheck.click();

    });


    it('click on submit ', function () {
        var clicksubmit = element(by.buttonText('Submit'));
        clicksubmit.click();

    });



    it('open the verify the pop up message and click on view all', function () {

        var popup = element(by.xpath("//p[@class='bg-success']")).getText();
        expect(popup.getText()).toEqual(popup);

        var clickpopupmessage = element(by.xpath("//a[@class='btn btn-success mlr-5']"));
        //console.log(clickpopupmessage);
        clickpopupmessage.click();
        browser.sleep(5000);

    });

});

describe('Code for search and click work shift name under Work shifts submodule under Job Module', function () {

    browser.ignoreSynchronization = true; // for non-angular websites


    it('open the browser', function () {
        browser.get(browser.params.url);
        // set implicit time to 30 seconds
        browser.manage().window().maximize();
        browser.manage().timeouts().implicitlyWait(30000);
    });
    // browser.debugger();
    // create object for workbook

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

    it('click on work shifts', function () {

        var clickworkshifts = element(by.xpath("//a[contains(text(),'Work Shifts')]"));
        clickworkshifts.click();
        browser.sleep(2000);

    });


    it('Enter the shift name under search field', function () {

        var searchshiftname = element(by.xpath("//input[@id='searchname']"));
        searchshiftname.sendKeys(searchshiftnames);
        expect(searchshiftname.getAttribute('value')).toBe(searchshiftnames);
        searchshiftname.click();
        browser.sleep(1000);


    });

    it('click on shift name', function () {

        var click_shiftname = element(by.xpath("//a[contains(text(),'" + searchshiftnames + "')]"));
        browser.actions().mouseMove(click_shiftname).click().perform();
        browser.sleep(3000);

    });

    it('click on edit work shifts button', function () {

        var click_editbtn = element(by.xpath("//a[@id='popupeditworkshifts']"));
        click_editbtn.click();
        browser.sleep(3000);

    });


    it('Edit the shift name', function () {

        var editshiftname = element(by.name('shiftName'));
        editshiftname.click();
        editshiftname.clear();
        editshiftname.sendKeys(edit_shiftnames);

    });

    it('code to Edit hours under  the start hours', function () {

        var edithours = element(by.xpath("//ngb-timepicker[@name='startTime']//input[@placeholder='HH']"));
        edithours.click();
        edithours.clear();
        edithours.sendKeys(editstarthourss);

    });

    it('code to Edit minutes under  the start hours', function () {

        var editminhrs = element(by.xpath("//ngb-timepicker[@name='startTime']//input[@placeholder='MM']"));
        editminhrs.click();
        editminhrs.clear();
        editminhrs.sendKeys(editstartminutess);

    });

    it('code to Edit hours under  the End hours', function () {

        var editendhours = element(by.xpath("//ngb-timepicker[@name='endTime']//input[@placeholder='HH']"));
        editendhours.click();
        editendhours.clear();
        editendhours.sendKeys(editstartendhourss);

    });

    it('code to Edit minutes under  the End hours', function () {

        var editendminhrs = element(by.xpath("//ngb-timepicker[@name='endTime']//input[@placeholder='MM']"));
        editendminhrs.click();
        editendminhrs.clear();
        editendminhrs.sendKeys(editstartendminutess);

    });



    it('code to Edit assign employees', function () {

        var assignemp = element(by.xpath("//span[@class='dropdown-btn']"));
        assignemp.click();

    });



    it('Edit the value in the search field', function () {

        var entersearcvalue = element(by.xpath("//input[@placeholder='Search']"));
        entersearcvalue.sendKeys(editassignemployee);

    });


    it('code to click on the checkbox', function () {

        var clickcheck = element(by.xpath("//div[contains(text(),'" + editassignemployee + "')]"));
        clickcheck.click();

    });


    it('click on submit ', function () {
        var clicksubmit = element(by.buttonText('Submit'));
        clicksubmit.click();

    });



    it('open the verify the pop up message and click on view all', function () {

        var popup = element(by.xpath("//p[@class='bg-success']")).getText();
        expect(popup.getText()).toEqual(popup);

        var clickpopupmessage = element(by.xpath("//a[@class='btn btn-success mlr-5']"));
        clickpopupmessage.click();
        browser.sleep(5000);

    });

});

describe('Code for search and Edit work shift name under Work shifts submodule under Job Module', function () {

    browser.ignoreSynchronization = true; // for non-angular websites


    it('open the browser', function () {
        browser.get(browser.params.url);
        // set implicit time to 30 seconds
        browser.manage().window().maximize();
        browser.manage().timeouts().implicitlyWait(30000);
    });
    // browser.debugger();
    // create object for workbook

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

    it('click on work shifts', function () {

        var clickworkshifts = element(by.xpath("//a[contains(text(),'Work Shifts')]"));
        clickworkshifts.click();
        browser.sleep(2000);

    });


    it('Enter the shift name under search field', function () {

        var searchshiftname = element(by.xpath("//input[@id='searchname']"));
        searchshiftname.sendKeys(editsearchshiftnames);
        expect(searchshiftname.getAttribute('value')).toBe(editsearchshiftnames);
        searchshiftname.click();
        browser.sleep(1000);


    });

    it('click on icons tab', function () {

        var click_icontab = element(by.xpath("//table[1]/tbody[1]/tr[2]/td[2]//div[1]/i[1]"));
        click_icontab.click();

    });

    it('click on Edit icons tab', function () {

        var click_editicontab = element(by.xpath("//table[1]/tbody[1]//div[1]/ul[1]/li[2]//button[1]"));
        click_editicontab.click();

    });


    it('Edit the shift name', function () {

        var editshiftname = element(by.name('shiftName'));
        editshiftname.click();
        editshiftname.clear();
        editshiftname.sendKeys(shiftnames);

    });

    it('code to Edit hours under  the start hours', function () {

        var edithours = element(by.xpath("//ngb-timepicker[@name='startTime']//input[@placeholder='HH']"));
        edithours.click();
        edithours.clear();
        edithours.sendKeys(starthourss);

    });

    it('code to Edit minutes under  the start hours', function () {

        var editminhrs = element(by.xpath("//ngb-timepicker[@name='startTime']//input[@placeholder='MM']"));
        editminhrs.click();
        editminhrs.clear();
        editminhrs.sendKeys(startminutess);

    });

    it('code to Edit hours under  the End hours', function () {

        var editendhours = element(by.xpath("//ngb-timepicker[@name='endTime']//input[@placeholder='HH']"));
        editendhours.click();
        editendhours.clear();
        editendhours.sendKeys(startendhourss);

    });

    it('code to Edit minutes under  the End hours', function () {

        var editendminhrs = element(by.xpath("//ngb-timepicker[@name='endTime']//input[@placeholder='MM']"));
        editendminhrs.click();
        editendminhrs.clear();
        editendminhrs.sendKeys(startendminutess);

    });



    //it('code to Edit assign employees', function () {

    //    var assignemp = element(by.xpath("//span[@class='dropdown-btn']"));
    //    assignemp.click();

    //});



    //it('Edit the value in the search field', function () {

    //    var entersearcvalue = element(by.xpath("//input[@placeholder='Search']"));
    //    entersearcvalue.sendKeys(editassignemployee);

    //});


    //it('code to click on the checkbox', function () {

    //    var clickcheck = element(by.xpath("//div[contains(text(),'" + editassignemployee + "')]"));
    //    clickcheck.click();

    //});


    it('click on submit ', function () {
        var clicksubmit = element(by.buttonText('Submit'));
        clicksubmit.click();

    });



    it('open the verify the pop up message and click on view all', function () {

        var popup = element(by.xpath("//p[@class='bg-success']")).getText();
        expect(popup.getText()).toEqual(popup);

        var clickpopupmessage = element(by.xpath("//a[@class='btn btn-success mlr-5']"));
        clickpopupmessage.click();
        browser.sleep(5000);

    });

});

describe('Code for Reset  work shifts under  Work shifts submodule under Job Module', function () {

    browser.ignoreSynchronization = true; // for non-angular websites


    it('open the browser', function () {
        browser.get(browser.params.url);
        // set implicit time to 30 seconds
        browser.manage().window().maximize();
        browser.manage().timeouts().implicitlyWait(30000);
    });
    // browser.debugger();
    // create object for workbook

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

    it('click on work shifts', function () {

        var clickworkshifts = element(by.xpath("//a[contains(text(),'Work Shifts')]"));
        clickworkshifts.click();
        browser.sleep(2000);

    });

    it('click on add button', function () {

        var cickadd = element(by.xpath("//a[@id='addworkshifts']"));
        cickadd.click();
        browser.sleep(5000);

    });

    it('enter the shift name', function () {

        var entershiftname = element(by.name('shiftName'));
        entershiftname.sendKeys(shiftnames);

        if (!expect(entershiftname.getAttribute('value')).toEqual(shiftnames))
        {
            console.log("values are  reset to default values:", shiftnames);
        }
        else
        {
            console.log("values are reset to default values:", shiftnames);
        }


    });

    it('code to enter hours under  the start hours', function () {

        var enterhours = element(by.xpath("//ngb-timepicker[@name='startTime']//input[@placeholder='HH']"));
        enterhours.click();
        enterhours.clear();
        enterhours.sendKeys(starthourss);

        if (!expect(enterhours.getAttribute('value')).toEqual(starthourss))
        {
            console.log("values are  reset to default values:", starthourss);
        }
        else
        {
            console.log("values are reset to default values:", starthourss);
        }


    });

    it('code to enter minutes under  the start hours', function () {

        var enterminhrs = element(by.xpath("//ngb-timepicker[@name='startTime']//input[@placeholder='MM']"));
        enterminhrs.click();
        enterminhrs.clear();
        enterminhrs.sendKeys(startminutess);


        if (!expect(enterminhrs.getAttribute('value')).toEqual(startminutess)) {
            console.log("values are  reset to default values:", startminutess);
        }
        else {
            console.log("values are reset to default values:", startminutess);
        }


    });

    it('code to enter hours under  the End hours', function () {

        var enterendhours = element(by.xpath("//ngb-timepicker[@name='endTime']//input[@placeholder='HH']"));
        enterendhours.click();
        enterendhours.clear();
        enterendhours.sendKeys(startendhourss);


        if (!expect(enterendhours.getAttribute('value')).toEqual(startendhourss))
        {
            console.log("values are  reset to default values:", startendhourss);
        }
        else
        {
            console.log("values are reset to default values:", startendhourss);
        }



    });

    it('code to enter minutes under  the End hours', function () {

        var enterendminhrs = element(by.xpath("//ngb-timepicker[@name='endTime']//input[@placeholder='MM']"));
        enterendminhrs.click();
        enterendminhrs.clear();
        enterendminhrs.sendKeys(startendminutess);


        if (!expect(enterendminhrs.getAttribute('value')).toEqual(startendminutess))
        {
            console.log("values are  reset to default values:", startendminutess);
        }
        else
        {
            console.log("values are reset to default values:", startendminutess);
        }


    });



    it('code to assign employees', function () {

        var assignemp = element(by.xpath("//span[@class='dropdown-btn']"));
        assignemp.click();

    });



    it('Enter the value in the search field', function () {

        var entersearcvalue = element(by.xpath("//input[@placeholder='Search']"));
        entersearcvalue.sendKeys(assignemployee);

    });


    it('code to click on the checkbox', function () {

        var clickcheck = element(by.xpath("//div[contains(text(),'" + assignemployee + "')]"));
        clickcheck.click();

    });


    it('click on reset ', function () {
        var clickreset = element(by.buttonText('Reset'));
        clickreset.click();

    });




    it('click on cancel ', function () {
        var clickcancel = element(by.buttonText('Cancel'));
        clickcancel.click();

    });
    
});



