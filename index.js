const libPdf = require("./lib/pdfProcess")
const XLSX = require('xlsx')
const fs = require('fs');

const inputPdf = "data/foo.pdf";
const output = "./output/test.xlsx";

const pdfData = [];

const writeToExcel = (jsonData) => {
    const ws = XLSX.utils.json_to_sheet(jsonData)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb,ws,"Assessment")
    XLSX.writeFile(wb, output)
}

async function main() {
   let result = await libPdf.processPdf(inputPdf);
   pdfData.push(...result);
   writeToExcel(pdfData);
}
main()



