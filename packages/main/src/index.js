import log from "electron-log";
import { app } from "electron";
import "./security-restrictions";
import { restoreOrCreateWindow } from "/@/mainWindow";

/**
 * Prevent multiple instances
 */
const isSingleInstance = app.requestSingleInstanceLock();
if (!isSingleInstance) {
  app.quit();
  process.exit(0);
}
app.on("second-instance", restoreOrCreateWindow);

/**
 * Disable Hardware Acceleration for more power-save
 */
app.disableHardwareAcceleration();

/**
 * Shout down background process if all windows was closed
 */
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

/**
 * @see https://www.electronjs.org/docs/v14-x-y/api/app#event-activate-macos Event: 'activate'
 */
app.on("activate", restoreOrCreateWindow);

/**
 * Create app window when background process will be ready
 */
app
  .whenReady()
  .then(restoreOrCreateWindow)
  .catch((e) => log.error("Failed to create window: ", e));

/**
 * Check new app version in production mode only
 */
if (import.meta.env.PROD) {
  app
    .whenReady()
    .then(() => import("electron-updater"))
    .then(({ autoUpdater }) => {
      log.info("Checking for app updates...");
      autoUpdater.logger = log;
      autoUpdater.checkForUpdatesAndNotify();
    })
    .catch((e) => log.error("Failed to check for updates: ", e));
}
