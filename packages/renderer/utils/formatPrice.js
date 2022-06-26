import { exaltToChaosRate } from "../stores";
import { get } from "svelte/store";

export const formatPrice = (price) => {
  const rate = get(exaltToChaosRate);

  if (price >= 1) {
    return `${price}ex`;
  }

  const chaosPrice = Math.floor(price * rate);

  if (isNaN(chaosPrice) || chaosPrice <= 0) return "";

  return `${chaosPrice}c`;
};
