import { clipboard } from "electron";

export const copyPost = (postBody) => {
  clipboard.writeText(postBody);
};
