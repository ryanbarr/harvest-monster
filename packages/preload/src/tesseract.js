import Tesseract, { createWorker } from "tesseract.js";
import craft_keywords from "../assets/craft_keywords";
import tft_crafts from "../assets/tft_crafts";
import log from "electron-log";
import path from "path";

const segMap = {
  PSM_SINGLE_BLOCK: Tesseract.PSM.SINGLE_BLOCK,
  PSM_SINGLE_COLUMN: Tesseract.PSM.SINGLE_COLUMN,
  PSM_SPARSE_TEXT: Tesseract.PSM_SPARSE_TEXT,
};

const craft_expressions = Object.keys(tft_crafts)
  .map((key) => {
    let expression = "";
    key.split(" ").forEach((word) => {
      expression += `(?=.*\\b${word}\\b)`;
    });
    return [new RegExp(expression, "i"), key, tft_crafts[key]];
  })
  .reverse();
const level_expression = /(?<=level\s)[0-9]+/i;
let worker;

(async () => {
  log.info("Creating Tesseract worker...");
  worker = createWorker({
    cachePath: path.join(__dirname, "lang-data"),
    logger: (v) => {
      log.info(
        `(${v.userJobId}) ${Math.ceil(v.progress * 100)}% - ${v.status}`
      );
      window.postMessage(v);
    },
  });
  await worker.load();
  await worker.loadLanguage();
  await worker.initialize();
})();

export const tesseract = (blob, currentSettings) => {
  const segMode =
    segMap[currentSettings?.segmentationMode] ?? segMap.PSM_SINGLE_BLOCK;
  return new Promise(async (resolve, reject) => {
    try {
      await worker.setParameters({
        tessedit_pageseg_mode: segMode,
        tessedit_char_whitelist:
          "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-+%,. ",
      });
      const { data } = await worker.recognize(blob);

      const crafts = [];
      const potential_exp = new RegExp(`(?=${craft_keywords.join("|")})`, "gi");
      const potential_crafts = data.text
        .replace(/\n/g, " ")
        .split(potential_exp);

      log.info("Identifying crafts...");

      potential_crafts.forEach((value) => {
        for (let pair of craft_expressions) {
          if (pair[0].test(value)) {
            const level_guess = value.match(level_expression)?.[0] ?? 83;
            const level = parseInt(level_guess) ?? 83;
            crafts.push({
              id: Symbol("harvest_craft"),
              key: pair[1],
              name: pair[2],
              level: level,
              quantity: 1,
            });
            break;
          }
        }
      });

      return resolve(crafts);
    } catch (e) {
      return reject(e);
    }
  });
};
