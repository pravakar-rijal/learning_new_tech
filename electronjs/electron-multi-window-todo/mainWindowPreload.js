const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('message', {
    on: (channel, func) => ipcRenderer.on(channel, (event, ...args) => func(...args)),
});