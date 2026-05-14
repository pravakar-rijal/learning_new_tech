const { app, BrowserWindow, Menu } = require('electron');
const monaco = require('monaco-editor');
const path = require('path');

const isDev = process.env.NODE_ENV !== 'production';
const isMac = process.platform === 'darwin';

const createMainWindow = () => {
    const mainWindow = new BrowserWindow({
        title: 'Visual Studio Code',
        width: isDev ? 1000 : 800,
        height: isDev ? 800: 600,
        nodeIntegration: false,
        contextIsolation: true,
        icon: path.join(__dirname, './assets/vscode.png'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });

    if(isDev)
       mainWindow.webContents.openDevTools();
        
    mainWindow.maximize();

    const mainMenu = Menu.buildFromTemplate(menu);
    Menu.setApplicationMenu(mainMenu);
    
     mainWindow.loadFile('./renderer/index.html');
}

const menu = [
    { label: 'File',
    submenu: [
    {   label: 'New Text File',
        accelerator: 'CtrlOrCmd+N',
    },
    { label: 'New File...' },
    { label: 'New Window' },
    { label: 'New Window with Profile' },
    { type: 'separator' },
    { label: 'Open File...'},
    { label: 'Open Folder...' },
    { label: 'Open Workspace From File...' },
    { label: 'Open Recent' },
    { type: 'separator' },
    { label: 'Add Folder to Workspace...' },
    { label: 'Save Workspace As...' },
    { label: 'Duplicate Workspace...' },
    { type: 'separator' },
    { label: 'Save' },
    { label: 'Save As...' },
    { label: 'Save All' },
    { type: 'separator' },
    { label: 'Share' },
    { type: 'separator' },
    { label: 'Auto Save' },
    { label: 'Preferences' },
    { type: 'separator' },
    { label: 'Revert File' },
    { label: 'Close Editor' },
    { label: 'Close Folder' },
    { label: 'Close Window' },
    { type: 'separator' },
    { label: 'Exit',
        accelerator: 'Ctrl+W',
        click: () => app.quit()
     },
    
    ]},
    {
        label: 'Edit',
        submenu: [
            { role: 'Undo' },
            { role: 'Redo' },
            { type: 'separator' },
            { role: 'Cut' },
            { role: 'Copy' },
            { role: 'Paste' },
            { type: 'separator' },
            { label: 'Find' },
            { label: 'Replace' },
            { type: 'separator' },
            { label: 'Find in Files' },
            { label: 'Replace in Files' },
            { type: 'separator' },
            { label: 'Toggle Line Comment' },
            { label: 'Toggle Block Comment' },
            { label: 'Emmet: Expand Abbreviation' },
            { type: 'separator' },

        ]
    },
    {
        label: 'Selection',
    },
    {
        label: 'View'
    },
    ,
    {
        label: '...'
    }
];

app.on('ready', () => {
    createMainWindow();

    app.on('activate', () => {
        if(BrowserWindow.getAllWindows.length === 0)
            createMainWindow();
    });
});

app.on('window-all-closed', () => {
    if(!isMac)
        app.quit();
})