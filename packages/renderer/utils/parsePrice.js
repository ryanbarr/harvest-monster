import { get } from "svelte/store";
import { exaltToChaosRate } from "../stores";

export const parsePrice = (displayPrice) => {
  const exchangeRate = get(exaltToChaosRate);
  if (!displayPrice) return null;
  let value = displayPrice.match(/\d+/g);
  const type = displayPrice.match(/[a-z]+/g);
  let normalizedValue = parseInt(value[0]);
  const remainder = value % 1;

  if (type?.[0] === "ex" && remainder > 0) {
    value = parseFloat(value[0]).toFixed(2);
  } else {
    value = parseInt(value[0]);
  }

  if (type?.[0] === "ex") {
    normalizedValue = value * exchangeRate;
  }

  return {
    value: value,
    type: type?.[0],
    normalizedValue,
  };
};
