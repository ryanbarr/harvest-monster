export const getInventory = (crafts) => {
  let count = 0,
    value = 0;

  crafts.forEach((craft) => {
    count += craft.quantity;
    value += craft.quantity * craft.price;
  });

  return {
    count,
    value,
  };
};
