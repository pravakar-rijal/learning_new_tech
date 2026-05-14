const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const getVideoDuration = require('get-video-duration');
const { error } = require('console');

const isDev = process.env.NODE_ENV !== 'production';
const isMac = process.platform === 'darwin';
let mainWindow;

const createMainWindow = () => {
    mainWindow = new BrowserWindow({
        title: 'Get Video Length',
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });

    if(isDev)
        mainWindow.webContents.openDevTools();

    mainWindow.loadFile(path.join(__dirname, './renderer/index.html'));
}

app.on('ready', () => {
    createMainWindow();

    mainWindow.on('closed',() => {
        mainWindow = null;
    });
    
    app.on('activate', () => {
        if(BrowserWindow.getAllWindows.length === 0)
            app.createMainWindow();
    });
});

ipcMain.on('video:submit', (event, data) => {
    getVideoDuration.getVideoDurationInSeconds(data).then((duration)=> {
        console.log(duration);
        mainWindow.webContents.send('video:duration',duration);
    }).catch((error) => {
        console.log(error);
        mainWindow.webContents.send('video:duration',0);
    })
});

app.on('window-all-closed', () => {
    if(!isMac)
        app.quit();
})