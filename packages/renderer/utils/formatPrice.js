export const formatPrice = (parsedPrice) => {
  if (!parsedPrice) return "";
  let { type, value, normalizedValue } = parsedPrice;
  let formattedValue = "";

  console.log(value, normalizedValue);

  if (value && value > 0) {
    if (type === "ex") {
      formattedValue = `${value}ex`;
    } else {
      formattedValue = `${value}c`;
    }
  } else if (normalizedValue) {
    console.log("wee", normalizedValue);
    formattedValue = normalizedValue;
  }

  return formattedValue;
};
