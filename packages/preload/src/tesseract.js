import Tesseract, { createWorker } from "tesseract.js";
import craft_keywords from "../assets/craft_keywords";
import tft_crafts from "../assets/crafts";
import log from "electron-log";
import path from "path";

const segMap = {
  PSM_SINGLE_BLOCK: Tesseract.PSM.SINGLE_BLOCK,
  PSM_SINGLE_COLUMN: Tesseract.PSM.SINGLE_COLUMN,
  PSM_SPARSE_TEXT: Tesseract.PSM_SPARSE_TEXT,
};

const langMap = {
  en: "eng",
  ru: "rus",
};

const characterWhitelist = {
  en: "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-+%,. ",
  ru: "0123456789абвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ-+%,. ",
};

const level_expression = /(?<=level\s)[0-9]+/i;
let worker;

(async () => {
  log.info("Creating Tesseract worker...");
  worker = createWorker({
    langPath: path.join(__dirname, "lang-data"),
    cachePath: path.join(__dirname, "lang-data"),
    logger: (v) => {
      log.info(
        `(${v.userJobId}) ${Math.ceil(v.progress * 100)}% - ${v.status}`
      );
      window.postMessage(v);
    },
  });
  await worker.load();
})();

export const tesseract = (blob, currentSettings) => {
  return new Promise(async (resolve, reject) => {
    try {
      const languageCode = currentSettings?.language?.code ?? "en";

      console.log(tft_crafts[languageCode]);

      const craft_expressions = Object.keys(tft_crafts[languageCode])
        .map((key) => {
          let expression = "(?=";
          key.split(" ").forEach((word) => {
            expression += `.*\\b${word}\\b`;
          });
          expression += ")";
          return [
            new RegExp(expression, "ui"),
            key,
            tft_crafts[languageCode][key],
          ];
        })
        .reverse();

      console.log(craft_expressions);
      const segMode =
        segMap[currentSettings?.segmentationMode] ?? segMap.PSM_SINGLE_BLOCK;

      await worker.loadLanguage(langMap[languageCode] ?? "eng");
      await worker.initialize(langMap[languageCode] ?? "eng");
      await worker.setParameters({
        tessedit_pageseg_mode: segMode,
        tessedit_char_whitelist: characterWhitelist[languageCode],
      });
      const { data } = await worker.recognize(blob);
      console.log(1, data.text.replace(/\n/gi, " "));

      const crafts = [];
      const potential_exp = new RegExp(
        `(?=\\b${craft_keywords[languageCode].join("\\b|\\b")}\\b)`,
        "gui"
      );

      const potential_crafts = data.text
        .replace(/\n/g, " ")
        .split(potential_exp);
      console.log(2, potential_crafts);

      log.info("Identifying crafts...");

      potential_crafts.forEach((value) => {
        for (let pair of craft_expressions) {
          console.log(3, value, pair[0], pair[0].test(value));
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
