const pdf_table_extractor = require("pdf-table-extractor");
PDFJS = require('pdfjs-dist/build/pdf.js');
PDFJS.workerSrc = "../../node_modules/pdfjs-dist/build/pdf.worker.js";
const { CONSTANT } = require("./constants")

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

    let keyArr = mergeHeaders(data);
    for (let i = CONSTANT.EXCEL_ROW_HEADER_SIZE; i < data.length; i++) {
        let obj = {}
        for (let j = 0; j < keyArr.length; j++) {
            obj[sanitize(keyArr[j])] = sanitize(data[i][j])
        }
        formattedArr.push(obj);
    }
    return formattedArr;
}

const mergeHeaders = (data) => {
    let headerFields = data.splice(0, CONSTANT.EXCEL_ROW_HEADER_SIZE)
    let primaryHeader = headerFields[0];
    if (headerFields.length == 1) {
        return primaryHeader;
    }
    let i = 1;
    let key = []
    while (i < headerFields.length) {
        let secondaryHeader = headerFields[i];
        if (primaryHeader.length != secondaryHeader.length)
            throw "Array length does not match for merge"
        for (let x = 0; x < primaryHeader.length; x++) {
            let primaryHeaderValue = primaryHeader[x] == '' ? primaryHeader[x - 1] : primaryHeader[x];
            let elem = primaryHeaderValue
            elem = secondaryHeader[x] == '' ? elem : elem + CONSTANT.EXCEL_MULTI_LEVEL_DELIMITER + secondaryHeader[x]
            key.push(elem)
        }

        primaryHeader = key
        i++;
    }
    return key;
}
const sanitize = (str) => { return str.replaceAll("\n", "").trim() }

module.exports = {
    processPdf,
    sanitize
}