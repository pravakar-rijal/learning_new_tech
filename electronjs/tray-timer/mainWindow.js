const { BrowserWindow } = require('electron');
const path = require('path');

const isWindows = process.platform === 'win32';
const isDev = process.env.NODE_ENV !== 'production';

class MainWindow extends BrowserWindow{
    constructor(webFile){
        super({
            icon: isWindows ? "./assests/windows_stopwatch.png" : "./assests/mac_stopwatch.png",
            width: isDev ? 500: 200,
            height: isDev ? 500: 300,
            frame: false,
            show: false,
            resizable: false,
            webPreferences: {
                preload: path.join(__dirname, './preload.js'),
                backgroundThrottling: false,
            }
        });
        
        this.setSkipTaskbar(true);
        this.loadFile(path.join(__dirname,webFile));
        this.on('blur',() => {this.hide()});
    }
}

module.exports = MainWindow;