import { LS_EXALT_PRICE_KEY } from "../constants";

export const formatPrice = (price) => {
  const exaltToChaos = parseFloat(
    window.localStorage.getItem(LS_EXALT_PRICE_KEY)
  );

  if (price >= 1) {
    return `${price}ex`;
  }

  const chaosPrice = Math.ceil(price * exaltToChaos);

  if (isNaN(chaosPrice) || chaosPrice <= 0) return "";

  return `${chaosPrice}c`;
};
