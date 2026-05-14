const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('path');

process.env.NODE_ENV = 'production';

const isDev = process.env.NODE_ENV !== 'production';
const isMac = process.platform === 'darwin';

let mainWindow;
let todoWindow;

const createMainWindow = () => {
    mainWindow = new BrowserWindow({
        title: 'To-Do Application',
        width: isDev ? 1000 : 500,
        height: isDev ? 1000 : 500,
        webPreferences: {
            preload: path.join(__dirname, 'mainWindowPreload.js')
        }
    });

    if(isDev)
        mainWindow.webContents.openDevTools();

    mainWindow.loadFile(path.join(__dirname,'./renderer/mainWindow.html'));
};

const createTodoWindow = () => {
    todoWindow = new BrowserWindow({
        width: isDev? 1000: 300,
        height: isDev? 1000: 200,
        webPreferences: {
            preload: path.join(__dirname, 'todoWindowPreload.js')
        }
    });

    todoWindow.on('closed', () =>{
        todoWindow = null;
    })
    if(isDev)
        todoWindow.webContents.openDevTools();

    todoWindow.loadFile(path.join(__dirname, './renderer/todoWindow.html'));
};

app.on('ready', () => {
    createMainWindow();

    mainWindow.on('closed',()=>{
        app.quit();
        mainWindow = null;
        todoWindow = null;
    });

    const mainMenu = Menu.buildFromTemplate(menu);
    Menu.setApplicationMenu(mainMenu);

    app.on('activate', () => {
        if(BrowserWindow.getAllWindows.length === 0)
            createMainWindow();
    });
});

ipcMain.on('todo:submit',(event, data) => {
    mainWindow.webContents.send('todo:add',data);
});

const clearTodo = () => {
    mainWindow.webContents.send('todo:clear');
}

const menu = [
    { 
        label: 'File',
        submenu: [
            {   label: 'Add a Todo',
                click: () => createTodoWindow()
             },
             {
                label: 'Clear Todo List',
                click: () => clearTodo(),
             },
            {   label: 'Exit',
                accelerator: 'Ctrl+W',
                click: () => app.quit()
            }]
    }];

app.on('window-all-closed', () => {
    if(!isMac)
        app.quit();
});