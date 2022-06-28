import { formatPrice } from "../../utils/formatPrice";
import { parsePrice } from "../../utils/parsePrice";

const emojiMap = {
  Red: ":chromatic:",
  Blue: ":chromatic:",
  Green: ":chromatic:",
  White: ":chromatic:",
  Reforge: ":chaos:",
  Augment: ":ex:",
  Reroll: ":divine:",
  "Upgrade Magic": ":regal:",
  Links: ":fusing:",
  Divination: ":sdeck:",
  Enchant: ":enchant:",
  Remove: ":annul_ex:",
  Fracture: ":fractured:",
};

const findEmoji = (craftName) => {
  let emoji = ":label:";
  for (let key of Object.keys(emojiMap)) {
    if (craftName.includes(key)) {
      emoji = emojiMap[key];
      break;
    }
  }
  return emoji;
};

export default {
  key: "standardEmoji",
  name: "Standard w/ Emoji",
  prefix: ({
    currentLeagueName,
    username,
    customNotes,
    exchangeRate,
    includeExchangeRate,
    willingToStream,
  }) => {
    let post = "";

    post += `**WTS ${currentLeagueName}**`;

    if (username && username.trim() !== "") {
      post += ` - IGN: **${username}**`;
    }

    post += ` \`| generated by HarvestMonster\``;

    post += `\n`;

    // Custom Notes
    if (customNotes.trim() !== "") {
      post += `${customNotes}\n`;
    }

    // Exchange Rate
    if (includeExchangeRate) {
      post += `   **Exchange Rate:** ${exchangeRate}c to 1ex\n`;
    }

    // Willing to Stream
    if (willingToStream) {
      post += `   *Can stream if requested*\n`;
    }

    return post;
  },
  craft: (craft, { maxCraftLength }) => {
    const emoji = findEmoji(craft.name);
    let post = "";
    const quantityLengthAdjustment = `${craft.quantity}`.length - 1;
    let bufferLength =
      maxCraftLength - craft.name.length + 4 - quantityLengthAdjustment;

    const buffer = Array.from(Array(bufferLength), () => "").join(" ");

    post += "   ";

    if (craft.quantity === 0) {
      post += "~~";
    }

    post += `\`${craft.quantity}x \`${emoji}\` ${craft.name}${buffer} [${
      craft.level > 0 ? craft.level : "83"
    }]  <${formatPrice(parsePrice(craft.displayPrice))}>\``;

    if (craft.quantity === 0) {
      post += "~~";
    }

    post += "\n";

    return post;
  },
  suffix: () => "",
};
