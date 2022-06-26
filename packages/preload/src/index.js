/**
 * @module preload
 */
import logger from "electron-log";
import { copyPost } from "./copyPost";
import { fetchNinjaPrices } from "./fetchNinjaPrices";
import { fetchTFTPrices } from "./fetchTFTPrices";
import { ipcRenderer } from "electron";
import { parseCrafts } from "./parseCrafts";

export const log = logger;

const minimize = async () => {
  await ipcRenderer.invoke("minimize");
};

export const getAppVersion = async () => {
  return await ipcRenderer.invoke("version");
};

export const getOS = async () => {
  return await ipcRenderer.invoke("os");
};

export const forceResize = async (requestedHeight) => {
  // This timeout forces the resize to take place after all changes have been made to the DOM.
  setTimeout(() => {
    if (
      requestedHeight === null ||
      requestedHeight === undefined ||
      requestedHeight < 1
    ) {
      requestedHeight = document.body.scrollHeight;
    }

    if (requestedHeight < 100) {
      requestedHeight = 200;
    }

    ipcRenderer.invoke("forceResize", requestedHeight);
  }, 0);
};

export { copyPost, fetchNinjaPrices, fetchTFTPrices, minimize, parseCrafts };
