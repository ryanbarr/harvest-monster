import { clipboard } from "electron";
import { tesseract } from "./tesseract";

export const parseCrafts = async (currentSettings) => {
  return await tesseract(clipboard.readImage().toPNG(), currentSettings);
};
