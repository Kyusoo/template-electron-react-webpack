const path = require('path')
const fs = require('fs')
const { BrowserWindow, globalShortcut } = require('electron')
const { Config } = require('./config')

// This module runs on Main Process

class Application {
    constructor(app) {
        this.app = app
    }

    onReady() {
        this.createMainWindow()
        this.mainWindow.show()
    }

    onActivate() {
        if (BrowserWindow.getAllWindows().length === 0) {
            this.createMainWindow()
        }
    }

    onAllWindowsClosed() {
        if (process.platform !== 'darwin') {
            this.app.quit()
        }
    }

    createMainWindow() {
        this.mainWindow = new BrowserWindow({
            title: Config.app[MODE].title,
            width: Config.app[MODE].width,
            height: Config.app[MODE].height,
            icon: path.resolve(__dirname, '..', 'assets', 'icon.png'),
            show: false,
            resizable: false,
            useContentSize: true,
            webPreferences: {
                contextIsolation: false,
                nodeIntegration: true
            }
        })

        this.mainWindow.on('closed', () => {
            const wins = BrowserWindow.getAllWindows()
            wins.forEach(win => {
                win.destroy()
            })

            this.mainWindow = null

            if (process.platform === 'darwin') {
                this.app.quit()
            }
        })

        this.mainWindow.removeMenu()
        this.mainWindow.loadFile(path.resolve(__dirname, 'index.html'))

        if (MODE === 'development') {
            this.app.whenReady().then(() => {
                fs.watch(path.resolve(__dirname), (eventType, filename) => {

                    if (filename === 'index.js') {
                        this.mainWindow.reload()
                    }

                    if (filename === 'main.js') {
                        process.exit(RELOAD) // Refer to DefinePlugin in webpack.config.js
                    }

                })

                globalShortcut.register('CommandOrControl+F12', () => {
                    this.mainWindow.webContents.openDevTools({ mode: 'detach' })
                })
            })
        }
    }

    onLog(event, data) {
        console.log(`[Log][Render → Main] ${data}`)
    }
}

module.exports.Application = Application