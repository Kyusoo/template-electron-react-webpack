const { app } = require('electron')
const { Application } = require('./application')
const { IPC } = require('./ipc')

const application = new Application(app)

launchApp(application)
addIpcHandlers()

function launchApp(application) {
    app.on('ready', application.onReady.bind(application))
    app.on('activate', application.onActivate.bind(application))
    app.on('window-all-closed', application.onAllWindowsClosed.bind(application))
}

function addIpcHandlers() {
    IPC.addMainReceiver('Log', application.onLog.bind(application))
}