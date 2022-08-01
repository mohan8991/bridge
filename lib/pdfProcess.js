const pdf_table_extractor = require("pdf-table-extractor");
PDFJS = require('pdfjs-dist/build/pdf.js');
PDFJS.workerSrc = "../../node_modules/pdfjs-dist/build/pdf.worker.js";

const processPdf = async (input) => {
    const pdfParser = (input) => new Promise(((resolve, reject) => {

        const success = (result) => {
            let rawData = [];
            result.pageTables.forEach(element => {
                rawData.push(...element.tables);
            });
            resolve(formatData(rawData));
        }

        function error(err) {
            reject('Error: ' + err);
        }

        pdf_table_extractor(input, success, error);

    }));
    return await pdfParser(input);
}

const formatData = (data) => {

    let formattedArr = []
    var keyArr = data[0];
    for (var i = 2; i < data.length; i++) {
        var obj = {}
        for (var j = 0; j < keyArr.length; j++) {
            obj[sanitize(keyArr[j])] = sanitize(data[i][j])
        }
        formattedArr.push(obj);
    }
    return formattedArr;
}

const sanitize = (str) => { return str.replaceAll("\n", "").trim() }

module.exports = {
    processPdf,
    sanitize
}