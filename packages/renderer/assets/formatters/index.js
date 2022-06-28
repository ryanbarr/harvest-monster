import standard from "./standard";
import standardEmoji from "./standardEmoji";
import plainText from "./plainText";
import plainTextEmoji from "./plainTextEmoji";
import richText from "./richText";

const formatters = {
  standard,
  standardEmoji,
  plainText,
  plainTextEmoji,
  richText,
};
export const formatterOptions = [];

Object.keys(formatters).forEach((key) => {
  const formatter = formatters[key];
  formatterOptions.push({ key: formatter.key, name: formatter.name });
});

export default formatters;
