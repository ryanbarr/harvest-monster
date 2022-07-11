import { get, writable } from "svelte/store";
import themes from "./assets/themes";
import {
  HM_STANDARD_THEME,
  LS_CRAFTS_KEY,
  LS_SETTINGS_KEY,
  NINJA_EXALT_NAME,
} from "./constants";
import { parsePrice } from "./utils/parsePrice";
// @ts-ignore-line
import { log, forceResize } from "#preload";
import dictionaries from "./assets/locales/_tft";

const standardTheme = themes.filter((t) => t.id === HM_STANDARD_THEME)[0];

export interface Craft {
  id: Symbol;
  key: string;
  level: number;
  name: string;
  price?: CraftPrice;
  displayPrice?: string;
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

export interface Dictionary {
  code: string;
  value: object;
}

export interface Language {
  code: string;
  name: string;
}

export interface League {
  code: "std" | "lsc" | "lhc";
  name: "Standard" | "Sentinel Softcore" | "Sentinel Hardcore";
}

export enum SegmentationMode {
  PSM_SINGLE_BLOCK = "PSM_SINGLE_BLOCK",
  PSM_SINGLE_COLUMN = "PSM_SINGLE_COLUMN",
  PSM_SPARSE_TEXT = "PSM_SPARSE_TEXT",
}

export interface Settings {
  language: Language;
  league: League;
  theme: string;
  backgroundColor: string;
  containerColor: string;
  highlightColor: string;
  textColor: string;
  autoPrice: boolean;
  sortColumn: "quantity" | "name" | "level" | "displayPrice";
  sortDirection: "ascending" | "descending";
  willingToStream: boolean;
  includeExchangeRate: boolean;
  customNotes: string;
  postFormatter: string;
  segmentationMode: SegmentationMode;
  openDiscordOnCopy: boolean;
}

export interface TFTData {
  timestamp?: number;
  data?: CraftPrice[];
}

const defaultSettings: Settings = {
  language: { code: "en", name: "English" },
  league: { code: "lsc", name: "Sentinel Softcore" },
  theme: "standard",
  backgroundColor: standardTheme.backgroundColor,
  containerColor: standardTheme.containerColor,
  highlightColor: standardTheme.highlightColor,
  textColor: standardTheme.textColor,
  autoPrice: true,
  sortColumn: "name",
  sortDirection: "ascending",
  willingToStream: false,
  includeExchangeRate: false,
  customNotes: "",
  postFormatter: "standard",
  segmentationMode: SegmentationMode.PSM_SINGLE_BLOCK,
  openDiscordOnCopy: false,
};

/**
 * A store for keeping track of crafts the user is selling. We specifically aren't
 * using a derived store (derived from TFT prices) because a user may choose to opt
 * out of automatic pricing.
 */
function createCrafts() {
  const saved = window.localStorage.getItem(LS_CRAFTS_KEY);
  const def = saved ? JSON.parse(saved) : [];
  log.info(`Loaded ${def.length} existing crafts.`);
  const { set, subscribe, update } = writable<Craft[]>(def);

  return {
    save: () =>
      update((crafts: Craft[]) => {
        log.info("Saving crafts...");
        window.localStorage.setItem(LS_CRAFTS_KEY, JSON.stringify(crafts));
        return crafts;
      }),
    sort: () =>
      update((crafts: Craft[]) => {
        const { sortColumn, sortDirection } = get(settings);
        log.info(`Sorting crafts by ${sortColumn}, ${sortDirection}...`);

        // Whenever we save the crafts, also sort them.
        crafts.sort((a, b) => {
          let ax = a[sortColumn] ?? 0;
          let bx = b[sortColumn] ?? 0;

          if (sortColumn === "displayPrice") {
            // @ts-ignore-line
            ax = parsePrice(a[sortColumn])?.normalizedValue ?? 0;
            // @ts-ignore-line
            bx = parsePrice(b[sortColumn])?.normalizedValue ?? 0;
          }

          if (sortDirection === "ascending") {
            return ax > bx ? 1 : -1;
          } else {
            return bx > ax ? 1 : -1;
          }
        });

        return [...crafts];
      }),
    subscribe,
    set,
    add: (craft: Craft) =>
      update((crafts: Craft[]) => {
        log.info("Adding craft...", craft);
        // Check to see if this craft exists in the store already.
        const existingCraftIndex: number = crafts.findIndex(
          (v) => v.key == craft.key && v.level == craft.level
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
    edit: (key, field, value) =>
      update((crafts: Craft[]) => {
        const index = crafts.findIndex((c) => c.key === key);
        crafts[index][field] = value;
        return [...crafts];
      }),
    delete: (craft: Craft) =>
      update((crafts: Craft[]) => {
        log.info("Deleting craft...", craft);
        const thisCraftIndex = crafts.findIndex((c) => c.key === craft.key);
        crafts.splice(thisCraftIndex, 1);
        return [...crafts];
      }),
    sell: (craft: Craft) =>
      update((crafts: Craft[]) => {
        log.info("Selling craft...", craft);
        const thisCraftIndex = crafts.findIndex((c) => c.key === craft.key);
        const thisCraft = crafts[thisCraftIndex];
        // If we have more than one of this craft, decrement and save.
        if (thisCraft.quantity > 0) {
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

  if (!saved) {
    log.info("No existing user settings found, generating defaults...");
  } else {
    log.info("Existing user settings found, loading...");
  }

  const def = saved ? JSON.parse(saved) : defaultSettings;
  log.info("Loaded user settings.", def);

  // We always spread default settings first in case an app update adds new settings.
  const { set, subscribe, update } = writable<Settings>({
    ...defaultSettings,
    ...def,
  });

  return {
    save: () =>
      update((settings: Settings) => {
        log.info("Saving user settings...");
        window.localStorage.setItem(LS_SETTINGS_KEY, JSON.stringify(settings));
        return settings;
      }),
    changeSetting: (setting: keyof Settings, value) =>
      update((settings: Settings) => {
        log.info(`Setting ${setting} to: `, value);
        const newSettings = {};
        newSettings[setting] = value;
        return { ...settings, ...newSettings };
      }),
    updateSettings: (newSettings: Partial<Settings>) =>
      update((settings: Settings) => {
        log.info(`Updating settings...`);
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
const exaltToChaosRate = writable<number>(0);

/**
 * After we fetch new PoE.Ninja data (via TFT) we store the exalt price
 * in memory so we can quickly access it when we format prices.
 */
ninjaPrices.subscribe((v: Currency[]) => {
  const exalt = v?.filter((c) => c.name === NINJA_EXALT_NAME)[0];
  let exaltToChaos = Math.round(exalt?.chaosEquivalent) ?? 0;
  if (isNaN(exaltToChaos)) exaltToChaos = -1;
  log.info(`Storing Exalt to Chaos conversion rate at ${exaltToChaos}.`);
  exaltToChaosRate.set(exaltToChaos);
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
    craft.price = price;
    return craft;
  });
  crafts.set(updatedCrafts);
  crafts.save();
});

const page = writable<string>("crafts");

page.subscribe(async () => {
  // When users switch pages, reset the scroll position.
  window.scroll(0, 0);
  // We use setTimeout to trick the resize to happen after the page content has updated.
  forceResize();
});

const dictionary = writable<Dictionary>();

settings.subscribe(async (currentSettings) => {
  const currentDictionary = get(dictionary);
  const newCode = currentSettings?.language?.code;
  if (newCode !== currentDictionary?.code) {
    const dict = dictionaries[newCode];
    // If we don't have this dictionary, don't attempt to save it.
    if (!dict) return;
    dictionary.set({
      code: newCode,
      value: dict,
    });
  }
});

export {
  crafts,
  dictionary,
  exaltToChaosRate,
  ninjaPrices,
  page,
  settings,
  tftPrices,
};
