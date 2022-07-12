import { get } from "svelte/store";
import { crafts, tftPrices } from "../stores";

export const updateCraftPrices = async () => {
  let currentCrafts = get(crafts);
  let currentPrices = get(tftPrices);

  currentCrafts = currentCrafts.map((craft) => {
    let price = "";

    price = currentPrices?.data?.filter((c) => c.name === craft.name)[0];

    craft.price = price;

    if (price?.exalt >= 1) {
      craft.displayPrice = `${price.exalt}ex`;
    } else if (price?.chaos > 0) {
      craft.displayPrice = `${price.chaos}c`;
    }

    return craft;
  });

  crafts.set(currentCrafts);
};
