const { app, BrowserWindow, Menu, ipcMain, shell } = require('electron');
const path = require('path');
const os = require('os');
const fs = require('fs');
const resizeImg = require('resize-img');

process.env.NODE_ENV = 'production';

const isDev = process.env.NODE_ENV !== 'production';
const isMac = process.platform === 'darwin';

let mainWindow; 

const createMainWindow = () => {
    mainWindow = new BrowserWindow({
        title: 'Image Resizer',
        width: isDev ? 1000 : 500,
        height: isDev ? 1200 : 600,
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js'),
        },
    });

    // if(isDev)
        mainWindow.webContents.openDevTools();

    mainWindow.loadFile(path.join(__dirname, './renderer/index.html'));
};

const createAboutWindow = () => {
    const aboutWindow = new BrowserWindow({
        title: 'About Image Resizer',
        width: 300,
        height: 300
    });

    aboutWindow.loadFile(path.join(__dirname,'./renderer/about.html'));
}


app.whenReady().then(()=>{
    createMainWindow();

    const mainMenu = Menu.buildFromTemplate(menu);
    Menu.setApplicationMenu(mainMenu);

    mainWindow.on('close',() => {
        mainWindow = null;
    })

    app.on('activate', () => {
        if(BrowserWindow.getAllWindows.length === 0)
            createMainWindow();
    })
    
});

const menu = [
    ...(isMac ? [{
        label: app.name,
        submenu: [{
            label: 'About',
            click: createAboutWindow,
        }]
    }]:[]),
    {
        role: 'fileMenu'
    },
    ...(!isMac ? [{
        label: 'Help',
        submenu: [{
            label: 'About',
            click: createAboutWindow
        }]
    }] : [])
]

//Respond to ipcRenderer resize
ipcMain.on('image:resize', (e,options) => {
    console.log(options);
    options.dest = path.join(os.homedir(),'imageresizer');
    resizeImage(options);
})

const resizeImage = async ({imgPath, width, height, dest}) =>{
    try
    {
        const newPath = await resizeImg(fs.readFileSync(imgPath),{
            width: +width,
            height: +height
        });

        const filename = path.basename(imgPath);

        //Create destination folder
        if(!fs.existsSync(dest)){
            fs.mkdirSync(dest, {recursive: true});
        }

        fs.writeFileSync(path.join(dest,filename),newPath);

        shell.openPath(dest);

        mainWindow.webContents.send('image:done');
        
    }catch(err)
    {
        console.log(err);
    }
}

app.on('window-all-closed',() => {
    if(!isMac)
        app.quit();
})
