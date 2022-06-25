export const filterBadWords = (line, target_words) => {
  const split = line.split(" ");

  return split.filter((word) => target_words.includes(word));
};
