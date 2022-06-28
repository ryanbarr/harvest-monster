import { get } from "svelte/store";
import { crafts, settings, exaltToChaosRate } from "../stores";
import formatters from "../assets/formatters";

let leagues = {
  std: "Standard",
  lsc: "Sentinel Softcore",
  lhc: "Sentinel Hardcore",
};

export const formatPost = () => {
  const currentCrafts = get(crafts);
  const currentSettings = get(settings);
  const exchangeRate = get(exaltToChaosRate);
  const formatterSettings = {
    currentLeagueName: leagues[currentSettings.league.code],
    maxCraftLength: [...currentCrafts].sort((a, b) =>
      b.name.length > a.name.length ? 1 : -1
    )[0].name.length,
    exchangeRate: exchangeRate,
    ...currentSettings,
  };
  let post = "";

  const formatter =
    formatters[currentSettings.postFormatter] ?? formatters.standard;

  post += formatter.prefix(formatterSettings);

  for (let craft of currentCrafts) {
    post += formatter.craft(craft, formatterSettings);
  }

  post += formatter.suffix(formatterSettings);

  return post;
};
