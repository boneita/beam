/* eslint strict: 0 */
'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'production';

const electron = require('electron');
const setupMenu = require('./setupMenu.js');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const crashReporter = electron.crashReporter;
let mainWindow = null;

crashReporter.start({
  productName: 'YourName',
  companyName: 'YourCompany',
  submitURL: 'https://your-domain.com/url-to-submit',
  autoSubmit: true
});

if (process.env.NODE_ENV === 'development') {
  require('electron-debug')();
}


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});


app.on('ready', () => {
  // BrowserWindow.addDevToolsExtension('node_modules/remotedev-extension/dist');

  // Main Window
  mainWindow = new BrowserWindow({ width: 1024, height: 728 });
  mainWindow.loadURL(`file://${__dirname}/app/app.html`);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  if (true || process.env.NODE_ENV === 'development') {
    mainWindow.openDevTools();
  }

  setupMenu(mainWindow);
});
