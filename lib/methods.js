const { CONSTANT, SHOW_DIALOG_PROP, EVENT } = require("./constants");
const { processPdf } = require("./pdfProcess");
const fs = require('fs');
const path = require('path');
const { dialog } = require('electron');
const XLSX = require('xlsx')

const createDirWrite = (data) => {
  let dest = CONSTANT.DIR_ASSET;
  let fullPath = path.join(dest, CONSTANT.DEFAULT_OUTPUT_FILE_NAME);
  if (!fs.existsSync(dest)) {
    fs.mkdir(dest, (err) => {
      if (err) return err;
      writeToExcel(data, fullPath)
    })
  } else
    writeToExcel(data, fullPath)
}

const showFileDialog = (event) => {
  if (process.platform !== 'darwin')
    handleDialog(event)
  else
    handleDialog(event)
}

const handleDialog = (event) => {
  dialog.showOpenDialog(SHOW_DIALOG_PROP).then(file => {
    if (!file.canceled) {
      const filepath = file.filePaths[0].toString();
      event.sender.send(EVENT.FILE, filepath);
    }
  }).catch(err => {
    console.log(err)
  });
}

async function handleFileEvent(event, file) {
  let result = await processPdf(file);
  createDirWrite(result);
}

const writeToExcel = (jsonData, dest) => {
  const ws = XLSX.utils.json_to_sheet(jsonData)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, "Assessment")
  XLSX.writeFile(wb, dest)
}

const error = (error) => { console.error(error) }

module.exports = {
  createDirWrite,
  showFileDialog,
  handleFileEvent,
  error
}