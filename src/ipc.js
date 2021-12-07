const { ipcMain, ipcRenderer } = require('electron')

class IPC {
    static channels = ['Log']

    static sendToMain(channel, data) {
        if(IPC.channels.includes(channel)) {
            ipcRenderer.send(channel, data)
        }
    }

    static addMainReceiver(channel, handler) {
        if(IPC.channels.includes(channel)) {
            ipcMain.on(channel, handler)
        }
    }

    static addRendererReceiver(channel, handler) {
        if(IPC.channels.includes(channel)) {
            ipcRenderer.on(channel, handler)
        }
    }
}

exports.IPC = IPC