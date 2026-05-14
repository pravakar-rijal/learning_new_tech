const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('message', {
    send: (channel, data) => ipcRenderer.send(channel, data)
})