const { ipcRenderer, remote } = require('electron');

const { BrowserWindow } = remote;

class ElectronBridge {

  name = 'eleBridge'

}

module.exports = ElectronBridge;

