const electron = require('electron');

const { ipcRenderer, remote } = electron;

const { BrowserWindow } = remote;

class ElectronBridge {

  name = 'eleBridge'

  electron = electron;

  //关闭窗口
  close = () => {
    remote.getCurrentWindow().close();
  };

  //最小化窗口
  min = () => {
    remote.getCurrentWindow().minimize();
  };

  //最大化窗口
  max = () => {
    // if (remote.getCurrentWindow().isMaximized()) {
    //   // remote.getCurrentWindow().restore();
    //   remote.getCurrentWindow().unmaximize(); //从最大化恢复到之前的状态
    // } else {
    //   // remote.getCurrentWindow().maximize();
    // }
    //https://bijinfeng.club/index.php/archives/31/
    if (remote.getCurrentWindow().isSimpleFullScreen()) {
      remote.getCurrentWindow().setSimpleFullScreen(false);
    } else {
      remote.getCurrentWindow().setSimpleFullScreen(true);
    }
  };

}

module.exports = ElectronBridge;
