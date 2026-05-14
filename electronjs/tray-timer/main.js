const { app, BrowserWindow, Menu, ipcMain} = require('electron');
const TimerTray = require('./timerTray');
const MainWindow = require('./mainWindow');

const isMac = process.platform === 'darwin';
const isWindows = process.platform === 'win32';

let mainWindow;
let tray; 

const createMainWindow = () => {
    mainWindow = new MainWindow('./renderer/index.html');
    tray = new TimerTray(isWindows ? "./assests/windows_stopwatch.png" : "./assests/mac_stopwatch.png", mainWindow, isWindows);
}

app.on('ready', () => {
    if(isMac)
        app.dock.hide();

    createMainWindow();

    const mainMenu = Menu.buildFromTemplate(menu);
    Menu.setApplicationMenu(mainMenu);

    mainWindow.on('closed', () => {
        mainWindow = null;
        tray = null;
    });

    app.on('activate', () => {
        if(BrowserWindow.getAllWindows.length === 0)
            createMainWindow();
    });
});

const menu = [];

ipcMain.on('timer:update', (event, data) => {
    console.log(data);
    tray.setToolTip(data);
});

ipcMain.on('timer:complete', (event, data) => {
    console.log(data);
    tray.setToolTip(data);
})


app.on('window-all-closed', () => {
    if(!isMac)
        app.quit();
});