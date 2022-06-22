import { get } from "svelte/store";
import { ninjaPrices, tftPrices, settings } from "../stores";
import { fetchNinjaPrices, fetchTFTPrices } from "#preload";

export const fetchData = async () => {
  const currentSettings = await get(settings);
  if (currentSettings.autoPrice) {
    const currentNinjaPrices = await fetchNinjaPrices(currentSettings.league);
    const currentTFTPrices = await fetchTFTPrices(currentSettings.league);
    ninjaPrices.set(currentNinjaPrices);
    tftPrices.set(currentTFTPrices);
  }
};
