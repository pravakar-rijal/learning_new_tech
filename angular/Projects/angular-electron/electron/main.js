import { app, BrowserWindow } from 'electron';

process.env['NODE_ENV'] = 'development';

const isDev = process.env['NODE_ENV'] !== 'production';
const isMac = process.platform === 'darwin';

let mainWindow;

const createMainWindow = () =>{
    mainWindow = new BrowserWindow({
        title: 'Easy Task',
        width: 1000,
        height: 1000,
    });

    mainWindow.loadURL("http://localhost:4200/");
}

app.whenReady().then(() => {
    createMainWindow();

    mainWindow.on('closed', () => {
        mainWindow = null;
    })

    app.on('activate', () => {
        if(BrowserWindow.getAllWindows.length === 0)
            createMainWindow();
    });
});

app.on('window-all-closed', () => {
    if(!isMac)
        app.quit();
});