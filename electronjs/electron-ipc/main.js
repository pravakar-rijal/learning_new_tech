const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('path');

const isDev = process.env.NODE_ENV !== 'production';
const isMac = process.platform === 'darwin';

const createMainWindow = () => {
    const mainWindow = new BrowserWindow({
        title: 'IPC',
        width: isDev ? 1000 : 500,
        height: isDev ? 800 : 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });

    mainWindow.loadFile('./renderer/index.html');
};

app.on('ready',() => {

    ipcMain.handle('ping', () => 'pong');
    createMainWindow();

    app.on('activate', () => {
        if(BrowserWindow.getAllWindows.length === 0)
            createWindow();
    });
});

app.on('window-all-closed', () => {
    if(!isMac)
        app.quit();
});