import { formatPrice } from "./formatPrice";

export const formatValue = (value) => {
  const chaos = (parseInt(value * 100) % 100) / 100;
  const exalts = parseInt(value - chaos);

  if (chaos === 0 && exalts === 0) {
    return "0c";
  }

  return `${formatPrice(exalts)}${exalts > 0 ? " " : ""}${formatPrice(chaos)}`;
};
