const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('message',{
    send: (event, data) => ipcRenderer.send(event, data)
});