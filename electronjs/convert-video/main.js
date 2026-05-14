const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

const isDev = process.env.NODE_ENV !== 'production';
const isMac = process.platform === 'darwin';
const isWindows = process.platform === 'win32';

let mainWindow;

const createMainWindow = () => {
    mainWindow = new BrowserWindow({
        title: "Video Format Convertor",
        width: isDev ? 1000 : 500,
        height: isDev ? 1000 : 500,
        webPreferences: {
            backgroundThrottling: false,
            preload: path.join(__dirname, './preload.js')
        }
    });

    if(isDev)
        mainWindow.webContents.openDevTools();

    mainWindow.loadFile(path.join(__dirname, './renderer/index.html'));
}

app.on('ready', () => {
    createMainWindow();

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
    
    app.on('activate', () => {
        if(BrowserWindow.getAllWindows.length === 0)
            createMainWindow();
    });
});

app.on('window-all-closed', () => {
    if(!isMac)
        app.quit();
})