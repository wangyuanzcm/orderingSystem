//src\main\CommonWindowEvent.ts
import { BrowserWindow, ipcMain, app } from 'electron';
// 主进程公共消息处理逻辑
export class CommonWindowEvent {
  private static getWin(event: any) {
    return BrowserWindow.fromWebContents(event.sender);
  }
  public static listen() {
    ipcMain.handle('minimizeWindow', (e) => {
      this.getWin(e)?.minimize();
    });

    ipcMain.handle('maxmizeWindow', (e) => {
      this.getWin(e)?.maximize();
    });

    ipcMain.handle('unmaximizeWindow', (e) => {
      this.getWin(e)?.unmaximize();
    });

    ipcMain.handle('hideWindow', (e) => {
      this.getWin(e)?.hide();
    });

    ipcMain.handle('showWindow', (e) => {
      this.getWin(e)?.show();
    });

    ipcMain.handle('closeWindow', (e) => {
      this.getWin(e)?.close();
    });
    ipcMain.handle('resizable', (e) => {
      return this.getWin(e)?.isResizable();
    });
    ipcMain.handle('getPath', (e, name: any) => {
      return app.getPath(name);
    });
  }
  //主进程公共事件处理逻辑
  public static regWinEvent(win: BrowserWindow) {
    win.on('maximize', () => {
      win.webContents.send('windowMaximized');
    });
    win.on('unmaximize', () => {
      win.webContents.send('windowUnmaximized');
    });
  }
}
