var xlsx = require('F:/node_modules/xlsx');

class xlReader {

    read_from_excel(sheetName, filepath)
    {
        var Workbook = xlsx.readFile("F:/Jasmine/TestData/Testdata.xlsx");
        var worksheet = Workbook.Sheets['Sheet1'];

        //var cell = 'A2';

        //console.log("The A2 value is:" + worksheet[cell].v);

        return xlsx.utils.sheet_to_json(worksheet);
    }
}
module.exports = new xlReader();


