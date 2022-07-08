import ansi from "./ansi";
import markdown from "./markdown";
import plainText from "./plainText";
import plainTextEmoji from "./plainTextEmoji";
import richText from "./richText";
import richTextEmoji from "./richTextEmoji";
import standard from "./standard";
import standardEmoji from "./standardEmoji";

const formatters = {
  standard,
  standardEmoji,
  plainText,
  plainTextEmoji,
  richText,
  richTextEmoji,
  markdown,
  ansi,
};
export const formatterOptions = [];

Object.keys(formatters).forEach((key) => {
  const formatter = formatters[key];
  formatterOptions.push({ key: formatter.key, name: formatter.name });
});

export default formatters;
