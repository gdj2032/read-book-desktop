// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const ElectronBridge = require('./communication/electronBridge')
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type]);
  }
});

const loadApi = [
  'electron', // 引入 electron
  'fs',
];
loadApi.map((item) => {
  window[item] = require(item);
});

window.eleBridge = new ElectronBridge();

window.require = require;
