const pdf_table_extractor = require("pdf-table-extractor");

const data = []
const success = (result) => {
    result.pageTables.forEach(element => {
       data.push(...element.tables);
    });
}

const error = (err) => {console.log("Error" + err);}

const processPdf = (inputPdf) => {
    pdf_table_extractor(inputPdf, success, error);
}

module.exports = { processPdf, data}