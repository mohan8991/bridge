const { ipcRenderer, contextBridge } = require('electron');
const { handleFileEvent } = require("../../lib/methods")
const { EVENT } = require('../../lib/constants')

contextBridge.exposeInMainWorld('myAPI', {
  doAThing: () => {
    ipcRenderer.send(EVENT.FILE_REQUEST);
  }
})

ipcRenderer.on(EVENT.FILE, handleFileEvent);