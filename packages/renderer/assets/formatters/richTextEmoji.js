import { formatPrice } from "../../utils/formatPrice";
import { parsePrice } from "../../utils/parsePrice";
import emojiMap, { defaultEmoji } from "./emojiMap";

const findEmoji = (craftName) => {
  let emoji = defaultEmoji;
  for (let key of Object.keys(emojiMap)) {
    if (craftName.includes(key)) {
      emoji = emojiMap[key];
      break;
    }
  }
  return emoji;
};

export default {
  key: "richTextEmoji",
  name: "Rich Text w/ Emoji",
  prefix: ({
    currentLeagueName,
    customNotes,
    exchangeRate,
    includeExchangeRate,
    willingToStream,
  }) => {
    let post = "";

    post += `**WTS ${currentLeagueName}**`;

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
  craft: (craft) => {
    const emoji = findEmoji(craft.name);
    let post = "";

    post += "   ";

    if (craft.quantity === 0) {
      post += "~~";
    }

    post += `\`[${craft.quantity}x]\` | ${emoji} **${craft.name}** - *[${
      craft.level > 0 ? craft.level : "83"
    }] <${formatPrice(parsePrice(craft.displayPrice))}>*`;

    if (craft.quantity === 0) {
      post += "~~";
    }

    post += "\n";

    return post;
  },
  suffix: () => "",
};
