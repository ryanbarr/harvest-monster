import { get, writable } from "svelte/store";
import themes from "./assets/themes";
import {
  HM_STANDARD_THEME,
  LS_CRAFTS_KEY,
  LS_EXALT_PRICE_KEY,
  LS_SETTINGS_KEY,
  NINJA_EXALT_NAME,
} from "./constants";

const standardTheme = themes.filter((t) => t.id === HM_STANDARD_THEME)[0];

export interface Craft {
  id: Symbol;
  key: string;
  level: number;
  name: string;
  price?: number;
  quantity: number;
}

export interface CraftPrice {
  chaos: number;
  exalt: number;
  lowConfidence: boolean;
  name: string;
}

export interface Currency {
  id: number;
  chaosEquivalent: number;
  name: string;
  icon: string;
}

export interface League {
  code: "std" | "lsc" | "lhc";
  name: "Standard" | "Sentinel Softcore" | "Sentinel Hardcore";
}

export interface Settings {
  username: string;
  language: string;
  league: League;
  theme: string;
  backgroundColor: string;
  containerColor: string;
  highlightColor: string;
  textColor: string;
  autoPrice: boolean;
  sortColumn: "quantity" | "name" | "level" | "price";
  sortDirection: "ascending" | "descending";
}

export interface TFTData {
  timestamp?: number;
  data?: CraftPrice[];
}

const defaultSettings: Settings = {
  username: "",
  language: "English",
  league: { code: "lsc", name: "Sentinel Softcore" },
  theme: "standard",
  backgroundColor: standardTheme.backgroundColor,
  containerColor: standardTheme.containerColor,
  highlightColor: standardTheme.highlightColor,
  textColor: standardTheme.textColor,
  autoPrice: true,
  sortColumn: "name",
  sortDirection: "ascending",
};

/**
 * A store for keeping track of crafts the user is selling. We specifically aren't
 * using a derived store (derived from TFT prices) because a user may choose to opt
 * out of automatic pricing.
 */
function createCrafts() {
  const saved = window.localStorage.getItem(LS_CRAFTS_KEY);
  const def = saved ? JSON.parse(saved) : [];
  const { set, subscribe, update } = writable<Craft[]>(def);

  return {
    save: () =>
      update((crafts: Craft[]) => {
        window.localStorage.setItem(LS_CRAFTS_KEY, JSON.stringify(crafts));
        return crafts;
      }),
    sort: () =>
      update((crafts: Craft[]) => {
        const { sortColumn, sortDirection } = get(settings);

        // Whenever we save the crafts, also sort them.
        crafts.sort((a, b) => {
          const ax = a[sortColumn] ?? "";
          const bx = b[sortColumn] ?? "";

          if (sortDirection === "ascending") {
            return ax > bx ? 1 : -1;
          } else {
            return bx > ax ? 1 : -1;
          }
          return 0;
        });

        return [...crafts];
      }),
    subscribe,
    set,
    add: (craft: Craft) =>
      update((crafts: Craft[]) => {
        // Check to see if this craft exists in the store already.
        const existingCraftIndex: number = crafts.findIndex(
          (v) => v.key == craft.key
        );

        // If the craft does exist, update its quantity by one and splice it over the old craft.
        if (existingCraftIndex > -1) {
          const existingCraft = crafts[existingCraftIndex];
          existingCraft.quantity += 1;
          crafts.splice(existingCraftIndex, 1, existingCraft);
          return [...crafts];
          // Otherwise, just add the craft to the array.
        } else {
          return [...crafts, craft];
        }
      }),
    delete: (craft: Craft) =>
      update((crafts: Craft[]) => {
        const thisCraftIndex = crafts.findIndex((c) => c.key === craft.key);
        crafts.splice(thisCraftIndex, 1);
        return [...crafts];
      }),
    sell: (craft: Craft) =>
      update((crafts: Craft[]) => {
        const thisCraftIndex = crafts.findIndex((c) => c.key === craft.key);
        const thisCraft = crafts[thisCraftIndex];
        // If we have more than one of this craft, decrement and save.
        if (thisCraft.quantity > 1) {
          thisCraft.quantity -= 1;
          crafts.splice(thisCraftIndex, 1, thisCraft);
          // Otherwise, remove it from the list.
        } else {
          crafts.splice(thisCraftIndex, 1);
        }
        return [...crafts];
      }),
  };
}
const crafts = createCrafts();

function createSettings() {
  const saved = window.localStorage.getItem(LS_SETTINGS_KEY);
  const def = saved ? JSON.parse(saved) : defaultSettings;
  const { set, subscribe, update } = writable<Settings>(def);

  return {
    save: () =>
      update((settings: Settings) => {
        window.localStorage.setItem(LS_SETTINGS_KEY, JSON.stringify(settings));
        return settings;
      }),
    changeSetting: (setting: keyof Settings, value) =>
      update((settings: Settings) => {
        const newSettings = {};
        newSettings[setting] = value;
        return { ...settings, ...newSettings };
      }),
    updateSettings: (newSettings: Partial<Settings>) =>
      update((settings: Settings) => {
        const updatedSettings = {
          ...settings,
          ...newSettings,
        };
        window.localStorage.setItem(
          LS_SETTINGS_KEY,
          JSON.stringify(updatedSettings)
        );
        return updatedSettings;
      }),
    set,
    subscribe,
    update,
  };
}
const settings = createSettings();

const ninjaPrices = writable<Currency[]>([]);

/**
 * After we fetch new PoE.Ninja data (via TFT) we store the exalt price
 * in memory so we can quickly access it when we format prices.
 */
ninjaPrices.subscribe((v: Currency[]) => {
  const exalt = v?.filter((c) => c.name === NINJA_EXALT_NAME)[0];
  let exaltToChaos = Math.round(exalt?.chaosEquivalent) ?? 0;
  if (isNaN(exaltToChaos)) exaltToChaos = -1;
  window.localStorage.setItem(LS_EXALT_PRICE_KEY, exaltToChaos.toString());
});

const tftPrices = writable<TFTData>({});

/**
 * After we fetch new TFT Harvest craft prices for the current league,
 * we update all of the existing crafts prices.
 */
tftPrices.subscribe((tft: TFTData) => {
  const currentCrafts = get(crafts);
  const updatedCrafts: Craft[] = currentCrafts.map((craft: Craft) => {
    // TODO: Only apply price if user indicated they prefer this.
    const price = tft?.data?.filter((v) => v.name === craft.name)[0];
    // TODO: Limit low confidence.
    craft.price = price?.exalt ?? -1;
    return craft;
  });
  crafts.set(updatedCrafts);
  crafts.save();
});

const page = writable<string>("crafts");

export { crafts, ninjaPrices, page, settings, tftPrices };
