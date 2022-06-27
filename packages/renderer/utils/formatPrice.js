export const formatPrice = (parsedPrice) => {
  if (!parsedPrice) return "";
  let { type, value } = parsedPrice;
  let formattedValue = "";

  if (value > 0) {
    if (type === "ex") {
      formattedValue = `${value}ex`;
    } else {
      formattedValue = `${value}c`;
    }
  }

  return formattedValue;
};
