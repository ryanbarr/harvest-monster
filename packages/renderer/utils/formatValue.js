import { formatPrice } from "./formatPrice";

export const formatValue = (value) => {
  const remainder = ((value * 100) % 100) / 100;
  const exalts = formatPrice(parseInt(value - remainder));
  const chaos = formatPrice(remainder);

  return `~${exalts}${exalts > 0 ? " " : ""}${chaos}`;
};
