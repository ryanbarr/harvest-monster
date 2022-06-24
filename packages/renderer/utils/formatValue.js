import { formatPrice } from "./formatPrice";

export const formatValue = (value) => {
  const chaos = (parseInt(value * 100) % 100) / 100;
  const exalts = parseInt(value - chaos);

  console.log(exalts);

  return `~${formatPrice(exalts)}${exalts > 0 ? " " : ""}${formatPrice(chaos)}`;
};
