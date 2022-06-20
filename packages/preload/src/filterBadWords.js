export const filterBadWords = (line, target_words) => {
    const split = line.split(" ");
    if (split.length === 1) return split;

    return split.filter((word) => target_words.includes(word));
};