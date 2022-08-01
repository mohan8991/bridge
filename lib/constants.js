const path = require('path');

const CONSTANT = {
    DIR_ASSET: __dirname + '/../assets',
    DIR_HOME: require('os').homedir(),
    DIALOG_BOX_TITLE: "Select the File to be uploaded",
    DIALOG_BOX_BUTTON_LABEL: "Upload",
    DIALOG_BOX_FILTER: [{ name: 'PDF', extensions: ['pdf'] }],
    DIALOG_BOX_PROPERTIES: ['openFile'],
    FILE_ENCODING: { encoding: 'utf-8' },
    PATH_PRELOAD_JS: path.join(__dirname + '/../src/node', 'preload.js'),
    DEFAULT_OUTPUT_FILE_NAME: "report.xlsx",
    EXCEL_MULTI_LEVEL_DELIMITER: " / ",
    EXCEL_ROW_HEADER_SIZE: 2
}

const SHOW_DIALOG_PROP = {
    title: CONSTANT.DIALOG_BOX_TITLE,
    defaultPath: CONSTANT.DIR_HOME,
    buttonLabel: CONSTANT.DIALOG_BOX_BUTTON_LABEL,
    filters: CONSTANT.DIALOG_BOX_FILTER,
    properties: CONSTANT.DIALOG_BOX_PROPERTIES
}

const EVENT = {
    FILE: 'file',
    FILE_REQUEST: 'file-request'
}

const WINDOW_PREFERENCE = { webPreferences: { preload: CONSTANT.PATH_PRELOAD_JS } }

module.exports = {
    CONSTANT,
    SHOW_DIALOG_PROP,
    EVENT,
    WINDOW_PREFERENCE
}