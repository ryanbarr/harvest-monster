import { formatPrice } from "../../utils/formatPrice";
import { parsePrice } from "../../utils/parsePrice";

export default {
  key: "standard",
  name: "Standard",
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
  craft: (craft, { maxCraftLength, fallback }) => {
    let post = "";
    const fb = fallback ? "83" : "";
    const quantityLengthAdjustment = `${craft.quantity}`.length - 1;
    let bufferLength =
      maxCraftLength - craft.name.length + 4 - quantityLengthAdjustment;

    const buffer = Array.from(Array(bufferLength), () => "").join(" ");

    post += "   ";

    if (craft.quantity === 0) {
      post += "~~";
    }

    post += `\`${craft.quantity}x ${craft.name}${buffer} [${
      craft.level > 0 ? craft.level : fb
    }]  <${formatPrice(parsePrice(craft.displayPrice))}>\``;

    if (craft.quantity === 0) {
      post += "~~";
    }

    post += "\n";

    return post;
  },
  suffix: () => "",
};
