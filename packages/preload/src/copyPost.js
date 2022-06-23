import log from "electron-log";
import { clipboard } from "electron";

export const copyPost = (postBody) => {
  log.info("Copying post text to clipboard...");
  try {
    clipboard.writeText(postBody);
  } catch (e) {
    log.error("Unable to copy post text to clipboard.", e);
  }
};
