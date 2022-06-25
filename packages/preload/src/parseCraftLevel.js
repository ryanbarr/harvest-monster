export const parseCraftLevel = (line) => {
  return new Promise((resolve) => {
    const levelKeyword = "level";
    let level = 83;
    if (line.split(" ")[0] === levelKeyword) {
      level = parseInt(line.replace(/^\D+/g, ""));
    }
    resolve(level);
  });
};
