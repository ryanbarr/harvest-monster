/**
 * @module preload
 */
import { fetchNinjaPrices } from "./fetchNinjaPrices";
import { fetchTFTPrices } from "./fetchTFTPrices";
import { ipcRenderer } from "electron";
import { parseCrafts } from "./parseCrafts";

const minimize = async () => {
  await ipcRenderer.invoke("minimize");
};

export { fetchNinjaPrices, fetchTFTPrices, minimize, parseCrafts };
