import {app, BrowserWindow, Menu, dialog } from "electron";
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

// Get the equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow;

const isDev = process.env.NODE_ENV !== 'production';
const isMac = process.platform === 'darwin';

const createMainWindow = () => {
    mainWindow = new BrowserWindow({
        title: "Visual Studio Code",
        width: 1000,
        height: 1000,
        icon: path.join(__dirname, 'vscode.png'),
        webPreferences: {
            preload: './preload.js'
        }
    });

    const mainMenu = Menu.buildFromTemplate(menu);
    Menu.setApplicationMenu(mainMenu);

    mainWindow.maximize();
    mainWindow.loadURL("http://localhost:4200/");
}

const openFile = async () => {
    const result = await dialog.showOpenDialog({
        properties: ['openFile'],
        filters: [{ name: 'All Files', extensions: ['*'] }]
    });

    if (!result.canceled && result.filePaths.length > 0) {
        const filePath = result.filePaths[0];
        const content = fs.readFileSync(filePath, 'utf-8');
        console.log(filePath, content);
    }

    return null;
};

const openFolder = async () => {
    const result = await dialog.showOpenDialog({
        properties: ['openDirectory']
    });

    // if (!result.canceled && result.filePaths.length > 0) {
    //     const filePath = result.filePaths[0];
    //     const content = fs.readFileSync(filePath, 'utf-8');
    //     console.log(filePath, content);
    // }

    // return null;
};

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
    { label: 'Open File...',
        click: () => openFile()
    },
    { label: 'Open Folder...',
        click: () => openFolder()
     },
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