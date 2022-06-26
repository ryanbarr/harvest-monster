import { formatPrice } from "./formatPrice";

export const formatValue = (value) => {
  let chaos = (parseInt(value * 100) % 100) / 100;
  let exalts = parseInt((value * 100 - chaos * 100) / 100);

  if (chaos <= 0 && exalts <= 0) {
    return "0c";
  }

  if (chaos < 0) chaos = 0;
  if (exalts < 0) exalts = 0;

  return `${formatPrice(exalts)}${exalts > 0 ? " " : ""}${formatPrice(chaos)}`;
};
