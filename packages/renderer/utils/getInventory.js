export const getInventory = (crafts) => {
  let count = 0,
    value = 0;

  crafts.forEach((craft) => {
    const quant = parseInt(craft.quantity);

    if (!isNaN(quant)) {
      count += parseInt(craft.quantity);
      value += craft.quantity * craft.price;
    }
  });

  return {
    count,
    value,
  };
};
