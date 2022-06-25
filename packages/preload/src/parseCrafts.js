import { clipboard } from "electron";
import { tesseract } from "./tesseract";

export const parseCrafts = async () => {
  return await tesseract(clipboard.readImage().toPNG());
};
