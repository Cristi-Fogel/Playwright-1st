const ExcelJs = require('exceljs');
const {test, expect} = require('@playwright/test');

async function writeExcelTest(searchText, replaceText, change, filePath){
    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet('Sheet1'); // This needs to be declared before calling readExcel
    const output = await readExcel(worksheet, searchText, change);     // Call readExcel and wait for its completion
    //perform the change
    if (output.row !== -1 && output.column !== -1) {
        const cell = worksheet.getCell(output.row, output.column + change.colChange);
        cell.value = replaceText;
        await workbook.xlsx.writeFile(filePath);
        console.log(`Replaced price for '${searchText}' to '${replaceText}' at row ${output.row}, column ${output.column}.`);
    } else {
        console.log(`Text '${searchText}' not found in the file.`);
    }
}

async function readExcel(worksheet, searchText) {
    let output = { row: -1, column: -1 };
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            if (cell.value === searchText) {
                output.row = rowNumber;
                output.column = colNumber;
            }
        });
    });
    return output;
}

//update mango price to 350
// writeExcelTest("Republic", 350, {rowChange: 0, colChange:2}, "./files/excellDownloadTest.xlsx");


test('Upload download excel validation', async ({page})=>
{
    const textSearch = 'Mango';
    const updateValue = '350';
    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
    const downloadPromise = page.waitForEvent('download'); //this so it waits for download to happen, not run test with partial download
    await page.getByRole('button', {name: 'Download'}).click();
    await downloadPromise; //wait until promise is resolved

    await writeExcelTest(textSearch, updateValue, {rowChange: 0, colChange:2}, "./tests/files/excellDownloadTest.xlsx");
    
    await page.locator("#fileinput").click();
    await page.locator("#fileinput").setInputFiles("./tests/files/excellDownloadTest.xlsx"); //component type needs to be file (because you upload a file)

    //apply filtering within table to find cell
    const textLocator = page.getByText(textSearch);
    const desiredRow = await page.getByRole('row').filter({has: textLocator});
    
    await expect (desiredRow.locator("#cell-4-undefined")).toContainText(updateValue);

})