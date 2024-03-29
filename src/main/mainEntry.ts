// src\main\mainEntry.ts
import { app, BrowserWindow } from 'electron';
import { CommonWindowEvent } from './CommonWindowEvent';
// import { Updater } from './Updater';
import { CustomScheme } from './CustomScheme';
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true';
app.on('browser-window-created', (e, win) => {
  CommonWindowEvent.regWinEvent(win);
});
let mainWindow: BrowserWindow;

app.whenReady().then(() => {
  const config = {
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
      allowRunningInsecureContent: true,
      contextIsolation: false,
      webviewTag: true,
      spellcheck: false,
      disableHtmlFullscreenWindowResize: true,
    },
  };
  mainWindow = new BrowserWindow(config);
  mainWindow.webContents.openDevTools({ mode: 'undocked' });
  if (process.argv[2]) {
    mainWindow.loadURL(process.argv[2]);
  } else {
    CustomScheme.registerScheme();
    mainWindow.loadURL(`app://index.html`);
    // Updater.check();
  }
  CommonWindowEvent.listen();
});
