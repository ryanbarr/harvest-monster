import { parsePrice } from "./parsePrice";

export const getInventory = (crafts) =>
  crafts.reduce(
    (total, craft) => {
      const quantity = parseInt(craft.quantity);
      const price = parsePrice(craft.displayPrice);

      if (price && quantity > 0) {
        total.count += quantity;

        if (price.value > 0) {
          if (price.type === "ex") {
            total.exalt += price.value * quantity;
          } else {
            total.chaos += price.value * quantity;
          }
        }
      }

      return total;
    },
    { count: 0, exalt: 0, chaos: 0 }
  );
