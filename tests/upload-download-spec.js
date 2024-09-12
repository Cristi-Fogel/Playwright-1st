const ExcelJs = require('exceljs');
const {test, expect} = require('@playwright/test');

async function writeExcelTest(searchText, replaceText, change, filePath){
    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile(filePath);
    
    const worksheet = workbook.getWorksheet('Sheet1'); // This needs to be declared before calling readExcel

    // Call readExcel and wait for its completion
    const output = await readExcel(worksheet, searchText, change);

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
    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html")

})