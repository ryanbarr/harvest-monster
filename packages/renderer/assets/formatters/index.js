import standard from "./standard";
import standardEmoji from "./standardEmoji";

const formatters = { standard, standardEmoji };
export const formatterOptions = [];

Object.keys(formatters).forEach((key) => {
  const formatter = formatters[key];
  formatterOptions.push({ key: formatter.key, name: formatter.name });
});

export default formatters;
