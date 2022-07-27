const pdf_table_extractor = require("pdf-table-extractor");

let data = []
const success = (result) => {
    let rawData = [];
    result.pageTables.forEach(element => {
        rawData.push(...element.tables);
    });
    data.push(...formatData(rawData));
}

const error = (err) => {console.log("Error" + err);}

const processPdf = (inputPdf) => {
    pdf_table_extractor(inputPdf, success, error);

}

const formatData = (data) => {

    let formattedArr = []
    var keyArr = data[0];
    for(var i=2; i<data.length; i++) {
        var obj = {}
        for(var j=0;j<keyArr.length;j++){
            obj[keyArr[j]] = data[i][j]
        }
    formattedArr.push(obj);
    }
    return formattedArr;
}

module.exports = { processPdf, data}