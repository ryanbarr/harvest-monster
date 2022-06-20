export const createCraftString = (words) => {
    return new Promise((resolve) => {
        return resolve([...new Set(words)].join(" ").trim());
    });
};