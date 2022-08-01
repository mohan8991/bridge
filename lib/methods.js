const { CONSTANT, SHOW_DIALOG_PROP, EVENT } = require("./constants")
const fs = require('fs');
const path = require('path');
const { dialog } = require('electron');

const createDirWrite = (filePath, data) => {
  filePath = path.parse(filePath);
  let dest = CONSTANT.DIR_ASSET;
  let fullFilepath = path.join(dest, filePath.base);

  if (!fs.existsSync(dest)) {
    fs.mkdir(dest, (err) => {
      if (err) return err;
      writeToFile(fullFilepath, data)
    })
  } else
    writeToFile(fullFilepath, data)
}

const writeToFile = (filePath, data) => {
  fs.writeFile(filePath, data, () => { console.log("done") })
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

const handleFileEvent = (event, file) => {
  fs.readFile(file, CONSTANT.FILE_ENCODING, function (err, data) {
    if (!err)
      createDirWrite(file, data);
    else
      console.error(err)
  })
}

module.exports = {
  createDirWrite,
  showFileDialog,
  handleFileEvent
}