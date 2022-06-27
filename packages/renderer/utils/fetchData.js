import { get } from "svelte/store";
import { warning } from "./toast";
import { ninjaPrices, tftPrices, settings } from "../stores";
import { fetchNinjaPrices, fetchTFTPrices } from "#preload";

export const fetchData = async (force) => {
  const currentSettings = await get(settings);
  if (currentSettings.autoPrice || force) {
    warning({
      title: "Fetching latest information...",
      text: "The latest TFT and PoE.Ninja data is being updated and will be ready momentarily.",
    });
    const currentNinjaPrices = await fetchNinjaPrices(currentSettings.league);
    const currentTFTPrices = await fetchTFTPrices(currentSettings.league);
    ninjaPrices.set(currentNinjaPrices);
    tftPrices.set(currentTFTPrices);
  }
};
