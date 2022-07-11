import { clipboard } from "electron";

export const hasClipboardImage = () => {
  const image = clipboard.readImage();
  return !image.isEmpty();
};
