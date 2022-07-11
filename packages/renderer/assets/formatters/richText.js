import { formatPrice } from "../../utils/formatPrice";
import { parsePrice } from "../../utils/parsePrice";

export default {
  key: "richText",
  name: "Rich Text",
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
    let post = "";

    post += "   ";

    if (craft.quantity === 0) {
      post += "~~";
    }

    post += `\`[${craft.quantity}x]\` | **${craft.name}** - *[${
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
