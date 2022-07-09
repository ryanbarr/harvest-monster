/**
 * @module preload
 */
import logger from "electron-log";
import { copyPost } from "./copyPost";
import { fetchNinjaPrices } from "./fetchNinjaPrices";
import { fetchTFTPrices } from "./fetchTFTPrices";
import { fetchLatestVersion } from "./fetchLatestVersion";
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
    const autocomplete = document.getElementById("autocomplete");

    if (
      requestedHeight === null ||
      requestedHeight === undefined ||
      requestedHeight < 1
    ) {
      requestedHeight = document.getElementById("main-content").clientHeight;
    }

    // If autocomplete is open, account for it.
    if (autocomplete) {
      const rect = autocomplete.getBoundingClientRect();
      const acHeight = rect.top + autocomplete.offsetHeight;
      if (acHeight > requestedHeight) {
        requestedHeight = acHeight;
        document
          .getElementById("main-content")
          .setAttribute("style", `height: ${requestedHeight}`);
      }
    }

    if (requestedHeight < 100) {
      requestedHeight = 200;
    }

    ipcRenderer.invoke("forceResize", requestedHeight);
  }, 0);
};

// prettier-ignore
export { copyPost, fetchLatestVersion, fetchNinjaPrices, fetchTFTPrices, minimize, parseCrafts };
