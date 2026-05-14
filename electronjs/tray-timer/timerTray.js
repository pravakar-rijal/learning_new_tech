const { Tray, Menu, app } = require('electron');

    class TimerTray extends Tray {
        constructor(iconPath, mainWindow, isWindows) {
            super(iconPath);

            this.mainWindow = mainWindow;
            this.isWindows = isWindows;

            this.setToolTip("Tray Timer");
            this.on('click', this.onClick.bind(this));
            this.on('right-click', this.onRightClick.bind(this));
        }

        onClick = (event, bounds) =>{
            const { x, y } = bounds;
            const { width, height } = this.mainWindow.getBounds();

            if (this.mainWindow.isVisible()) {
                this.mainWindow.hide();
            }
            else {
                this.mainWindow.setBounds({
                    x: x - (width / 2),
                    y: this.isWindows ? y - height : y,
                });
                this.mainWindow.show();
            }
        }

        onRightClick = (event) => {
            const menu = [{
                label: "Exit",
                click: () => app.quit()
            }];

            const contextMenu = Menu.buildFromTemplate(menu);
            this.popUpContextMenu(contextMenu);
        }
    }

module.exports = TimerTray;
