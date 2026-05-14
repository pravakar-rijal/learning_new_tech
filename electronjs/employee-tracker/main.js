const { app, BrowserWindow, Menu, Tray } = require('electron');
const path = require('path');
const screenshot = require('screenshot-desktop');
const cron = require('node-cron');

let tray;

app.on('ready', () => {
    let win = new BrowserWindow({
        show: false,
    });

    tray = new Tray(path.join(__dirname, "icon.png"));

    const contextMenu = Menu.buildFromTemplate([{
        label: "Exit",
        click: () => app.quit(),
    }]);

    tray.setContextMenu(contextMenu);

    cron.schedule("2 * * * * *", () => {
        const filePath = path.join(__dirname, `screenshot-${Date.now()}.png`);
        screenshot({filename: filePath})
        .then(() => console.log(`screenshot saved: ${filePath}`))
        .catch((error) => console.log("Error taking screenshot",error));
    });
});