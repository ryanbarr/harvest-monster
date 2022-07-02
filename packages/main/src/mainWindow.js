import log from "electron-log";
import { app, BrowserWindow, ipcMain, screen, shell } from "electron";
import { join } from "path";
import { URL } from "url";
import os from "os";

async function createWindow() {
  log.info("Creating the main window...");

  ipcMain.handle("minimize", async () => {
    browserWindow.minimize();
  });

  ipcMain.handle("version", async () => {
    const version = app.getVersion();
    log.info(`Reporting app version as v${version}.`);
    return version;
  });

  ipcMain.handle("os", async () => {
    const platform = os.platform();
    log.info(`Reporting platform as ${platform}.`);
    return platform;
  });

  ipcMain.handle("forceResize", async (event, requestedHeight) => {
    const primaryDisplay = screen.getPrimaryDisplay();
    const { height } = primaryDisplay.workAreaSize;
    const maxHeight = parseInt(height * 0.7);
    let setHeight = requestedHeight;

    // Don't allow the window to get _too_ tall on forced resizes.
    if (requestedHeight > maxHeight) {
      setHeight = maxHeight;
    }

    browserWindow.setSize(browserWindow.getSize()[0], setHeight);
  });

  const browserWindow = new BrowserWindow({
    // width: 705,
    // height: 760,
    minWidth: 705,
    minHeight: 100,
    height: 400,
    useContentSize: true,
    show: false, // Use 'ready-to-show' event to show window
    frame: false,
    transparent: true,
    webPreferences: {
      webviewTag: false, // The webview tag is not recommended. Consider alternatives like iframe or Electron's BrowserView. https://www.electronjs.org/docs/latest/api/webview-tag#warning
      preload: join(__dirname, "../../preload/dist/index.cjs"),
      enablePreferredSizeMode: true,
    },
  });

  browserWindow.removeMenu();

  /**
   * If you install `show: true` then it can cause issues when trying to close the window.
   * Use `show: false` and listener events `ready-to-show` to fix these issues.
   *
   * @see https://github.com/electron/electron/issues/25012
   */
  browserWindow.on("ready-to-show", () => {
    log.info("Main window is ready.");
    browserWindow?.show();

    if (import.meta.env.DEV) {
      browserWindow?.webContents.openDevTools();
    }
  });

  /**
   * URL for main window.
   * Vite dev server for development.
   * `file://../renderer/index.html` for production and test
   */
  const pageUrl =
    import.meta.env.DEV && import.meta.env.VITE_DEV_SERVER_URL !== undefined
      ? import.meta.env.VITE_DEV_SERVER_URL
      : new URL(
          "../renderer/dist/index.html",
          "file://" + __dirname
        ).toString();

  log.info("Loading application into main window...");
  await browserWindow.loadURL(pageUrl);
  log.info("Application has been loaded into main window.");

  browserWindow.webContents.setWindowOpenHandler(({ url }) => {
    log.info("Opening external link...");
    shell.openExternal(url);
  });

  return browserWindow;
}

/**
 * Restore existing BrowserWindow or Create new BrowserWindow
 */
export async function restoreOrCreateWindow() {
  let window = BrowserWindow.getAllWindows().find((w) => !w.isDestroyed());

  if (window === undefined) {
    window = await createWindow();
  }

  if (window.isMinimized()) {
    window.restore();
  }

  window.focus();
}
