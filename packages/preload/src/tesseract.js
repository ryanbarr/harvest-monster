import { createCraftString } from "./createCraftString";
import { createWorker } from "tesseract.js";
import { filterBadWords } from "./filterBadWords";
import { parseCraftLevel } from "./parseCraftLevel";
import craft_keywords from "../assets/craft_keywords";
import tft_crafts from "../assets/tft_crafts";

export const tesseract = (blob) => {
  return new Promise(async (resolve) => {
    const worker = createWorker({
      logger: (v) => window.postMessage(v),
    });
    await worker.load();
    await worker.loadLanguage();
    await worker.initialize();
    const keywords = Object.keys(craft_keywords);
    const { data } = await worker.recognize(blob);
    await worker.terminate();
    const cleanLines = data.lines.map((line) =>
      line.text.replace(/\W\s/g, " ").toLowerCase().trim()
    );
    const crafts = [];

    for (let i in cleanLines) {
      const index = parseInt(i);

      /**
       * Some crafts are one line, others two, others three. We check all three
       * lines for matches, because in some cases two or more lines will match.
       * For example: "Reforge Physical" matches on line two, but
       * "Reforge Physical More Common" matches on line three as well.
       *
       * Line four is for looking for the craft's level.
       */
      const lineOne = cleanLines[index];
      const lineTwo =
        cleanLines.length > index + 1 ? cleanLines[index + 1] : "";
      const lineThree =
        cleanLines.length > index + 2 ? cleanLines[index + 2] : "";
      const lineFour =
        cleanLines.length > index + 3 ? cleanLines[index + 3] : "";

      /**
       * We determine the craft type by finding the first tier 1 craft keyword
       * that appears in the string. This helps us account for random garbage
       * that the OCR added to the line that was not cleaned out.
       */
      const craftType = lineOne
        .split(" ")
        .filter((word) => keywords.includes(word))[0];

      // If we were able to identify a craft type, we proceed with attempting to match.
      if (craft_keywords.hasOwnProperty(craftType)) {
        /**
         * Since we matched on line one, we need to add the tier 1 craft keyword back
         * to the first line then concat the remainder to it.
         */
        const lineOneWords = [craftType].concat(
          filterBadWords(lineOne, craft_keywords[craftType])
        );
        const lineTwoWords = [...lineOneWords].concat(
          filterBadWords(lineTwo, craft_keywords[craftType])
        );
        const lineThreeWords = [...lineTwoWords].concat(
          filterBadWords(lineThree, craft_keywords[craftType])
        );

        // Generate the three eligible craft strings.
        const lineOneCraft = await createCraftString(lineOneWords);
        const lineTwoCraft = await createCraftString(lineTwoWords);
        const lineThreeCraft = await createCraftString(lineThreeWords);

        // Determine if any of back three lines has a level, so we can ignore it after parsing.
        const lineTwoLevel = await parseCraftLevel(lineTwo);
        const lineThreeLevel = await parseCraftLevel(lineThree);
        const lineFourLevel = await parseCraftLevel(lineFour);

        /**
         * Finally, return the craft which matched the most lines.
         * Note that a two-line craft with a level will still match at three,
         * which is why we make sure the level is non-existent.
         */
        if (tft_crafts.hasOwnProperty(lineThreeCraft) && lineThreeLevel < 0) {
          crafts.push({
            id: Symbol("harvest_craft"),
            key: lineThreeCraft,
            name: tft_crafts[lineThreeCraft],
            level: lineFourLevel,
            quantity: 1,
          });
          // console.log(`Identified TFT craft as: ${tft_crafts[lineThreeCraft]}`);
          // console.log(`Level: ${lineFourLevel}`);
        } else if (
          tft_crafts.hasOwnProperty(lineTwoCraft) &&
          lineTwoLevel < 0
        ) {
          crafts.push({
            id: Symbol("harvest_craft"),
            key: lineTwoCraft,
            name: tft_crafts[lineTwoCraft],
            level: lineThreeLevel,
            quantity: 1,
          });
          // console.log(`Identified TFT craft as: ${tft_crafts[lineTwoCraft]}`);
          // console.log(`Level: ${lineThreeLevel}`);
        } else if (tft_crafts.hasOwnProperty(lineOneCraft)) {
          crafts.push({
            id: Symbol("harvest_craft"),
            key: lineOneCraft,
            name: tft_crafts[lineOneCraft],
            level: lineTwoLevel,
            quantity: 1,
          });
          // console.log(`Identified TFT craft as: ${tft_crafts[lineOneCraft]}`);
          // console.log(`Level: ${lineTwoLevel}`);
        } else {
          // console.log(`Unable to find TFT craft for: ${lineThreeCraft}`);
        }
      }
    }

    return resolve(crafts);
  });
};
