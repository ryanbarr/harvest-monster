export const getInventory = (crafts) => {
  let count = 0,
    value = 0;

  crafts.forEach((craft) => {
    const quant = parseInt(craft.quantity);
    let price = 0;

    if (craft.price > 0) price = craft.price;

    if (!isNaN(quant)) {
      count += parseInt(craft.quantity);
      value += (craft.quantity * (craft.price * 100)) / 100;
    }
  });

  return {
    count,
    value,
  };
};
