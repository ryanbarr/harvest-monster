import { writable } from "svelte/store";
import themes from "./assets/themes";

const CRAFTS_KEY = "hmStoredCrafts";
const SETTINGS_KEY = "hmUserSettings";
const standardTheme = themes.filter((t) => t.id === "standard")[0];

export interface Craft {
  id: Symbol;
  key: string;
  level: number;
  name: string;
  quantity: number;
}

export interface Settings {
  username: string;
  language: string;
  league: string;
  theme: string;
  backgroundColor: string;
  containerColor: string;
  highlightColor: string;
  textColor: string;
}

const defaultSettings: Settings = {
  username: "",
  language: "English",
  league: "Sentinel",
  theme: "standard",
  backgroundColor: standardTheme.backgroundColor,
  containerColor: standardTheme.containerColor,
  highlightColor: standardTheme.highlightColor,
  textColor: standardTheme.textColor,
};

function createCrafts() {
  const saved = window.localStorage.getItem(CRAFTS_KEY);
  const def = saved ? JSON.parse(saved) : [];
  const { subscribe, update } = writable<Craft[]>(def);

  return {
    save: () =>
      update((crafts: Craft[]) => {
        window.localStorage.setItem(CRAFTS_KEY, JSON.stringify(crafts));
        return crafts;
      }),
    subscribe,
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

function createSettings() {
  const saved = window.localStorage.getItem(SETTINGS_KEY);
  const def = saved ? JSON.parse(saved) : defaultSettings;
  const { set, subscribe, update } = writable<Settings>(def);

  return {
    save: () =>
      update((settings: Settings) => {
        window.localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
        return settings;
      }),
    updateSettings: (newSettings: Partial<Settings>) =>
      update((settings: Settings) => {
        const updatedSettings = {
          ...settings,
          ...newSettings,
        };
        window.localStorage.setItem(
          SETTINGS_KEY,
          JSON.stringify(updatedSettings)
        );
        return updatedSettings;
      }),
    set,
    subscribe,
    update,
  };
}

export const crafts = createCrafts();
export const settings = createSettings();
