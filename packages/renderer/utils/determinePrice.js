/**
 * Takes a TFT craft and determines its presentational price.
 */
export const determinePrice = ({ exalt, chaos }) => {
  if (exalt >= 1) {
    return `${exalt}ex`;
  } else {
    return `${chaos}c`;
  }
};
