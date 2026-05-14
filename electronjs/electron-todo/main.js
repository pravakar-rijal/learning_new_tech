const { app, BrowserWindow, dialog, Menu } = require('electron');
const path = require('path');

const isMac = process.platform === 'darwin';
const isDev = process.env.NODE_ENV !== 'production';

const createMainWindow = () => {
    const mainWindow = new BrowserWindow({
        title: 'To-Do',
        width: isDev ? 1000 : 500,
        height: isDev ? 1000 : 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });

    dialog.showMessageBox(mainWindow, {
        type: 'info',
        title: 'Welcome',
        message: 'Welcome to To-Do Application',
        buttons: ['Ok'],
      });


    mainWindow.loadFile('./renderer/html/index.html');
}

app.whenReady().then(() => {
    createMainWindow();

    const mainMenu = Menu.buildFromTemplate(menu);
    Menu.setApplicationMenu(mainMenu);
    
    app.on('activate',() => {
        if(BrowserWindow.getAllWindows.length === 0)
            createMainWindow();
    });
});

const menu = [{
    role: 'fileMenu'
},
{
    label: 'Help',
    submenu: [{
        label: 'About',
        click: () => app.quit(),
    }]
}];



app.on('window-all-closed', () => {
    if(!isMac)
        app.quit();
});