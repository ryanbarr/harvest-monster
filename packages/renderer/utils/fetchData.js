import { get } from "svelte/store";
import { ninjaPrices, tftPrices, settings } from "../stores";
import { fetchNinjaPrices, fetchTFTPrices } from "#preload";

export const fetchData = async (force) => {
  const currentSettings = await get(settings);

  const currentNinjaPrices = await fetchNinjaPrices(currentSettings.league);
  ninjaPrices.set(currentNinjaPrices);

  // If the user doesn't want auto-pricing, don't bother fetching TFT data.
  if (currentSettings.autoPrice || force) {
    const currentTFTPrices = await fetchTFTPrices(currentSettings.league);
    tftPrices.set(currentTFTPrices);
  }
};
