const {ipcRenderer, contextBridge} = require('electron');

contextBridge.exposeInMainWorld('version',{
node: () => process.versions.node,
chrome: () => process.versions.chrome,
electron: () => process.versions.electron,
});

contextBridge.exposeInMainWorld('message',{
    ping: () => ipcRenderer.invoke('ping')
})