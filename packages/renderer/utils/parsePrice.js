export const parsePrice = (displayPrice) => {
  if (!displayPrice) return null;
  let value = displayPrice.match(/\d+/g);
  const type = displayPrice.match(/[a-z]+/g);
  const remainder = value % 1;

  if (type === "ex" && remainder > 0) {
    value = parseFloat(value[0]).toFixed(2);
  } else {
    value = parseInt(value[0]);
  }

  return {
    value: value,
    type: type[0],
  };
};
