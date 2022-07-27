const libPdf = require("./pdfProcess")

const XLSX = require('xlsx')

const fs = require('fs');

const inputPdf = "data/foo.pdf";
const output = "./output/test.xlsx";

const pdfData = [];
const writeToFile = (fileName, data) => {
    fs.writeFile(fileName, JSON.stringify(data), () => {console.log("Done.")});
}

const writeToExcel = (jsonData) => {
    const ws = XLSX.utils.json_to_sheet(jsonData)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb,ws,"Assessment")
    XLSX.writeFile(wb, output)
}

libPdf.processPdf(inputPdf);
setTimeout(() => {
    pdfData.push(...libPdf.data);
    writeToExcel(pdfData);
}, 0);



