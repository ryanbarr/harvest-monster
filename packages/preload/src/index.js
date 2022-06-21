/**
 * @module preload
 */
import { ipcRenderer } from "electron";
import { parseCrafts } from "./parseCrafts";

const minimize = async () => {
  await ipcRenderer.invoke("minimize");
};

export { minimize, parseCrafts };
