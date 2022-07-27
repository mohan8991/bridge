const libPdf = require("./pdfProcess")
const fs = require('fs');

const inputPdf = "data/foo.pdf";
const output = "output/foo.json";

const pdfData = [];
const writeToFile = (fileName, data) => {
    fs.writeFile(fileName, data, () => {console.log("Done.")});
}

libPdf.processPdf(inputPdf);
console.log(pdfData)