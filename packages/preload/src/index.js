/**
 * @module preload
 */
import { copyPost } from "./copyPost";
import { fetchNinjaPrices } from "./fetchNinjaPrices";
import { fetchTFTPrices } from "./fetchTFTPrices";
import { ipcRenderer } from "electron";
import { parseCrafts } from "./parseCrafts";

const minimize = async () => {
  await ipcRenderer.invoke("minimize");
};

export const getAppVersion = async () => {
  return await ipcRenderer.invoke("version");
};

export { copyPost, fetchNinjaPrices, fetchTFTPrices, minimize, parseCrafts };
