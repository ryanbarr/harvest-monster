import standard from "./standard";
import standardEmoji from "./standardEmoji";
import plainText from "./plainText";
import plainTextEmoji from "./plainTextEmoji";

const formatters = { standard, standardEmoji, plainText, plainTextEmoji };
export const formatterOptions = [];

Object.keys(formatters).forEach((key) => {
  const formatter = formatters[key];
  formatterOptions.push({ key: formatter.key, name: formatter.name });
});

export default formatters;
