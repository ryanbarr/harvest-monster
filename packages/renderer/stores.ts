import { writable } from "svelte/store";
import themes from "./assets/themes";

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
  const { subscribe, update } = writable<Craft[]>([]);

  return {
    subscribe,
    addCraft: (craft: Craft) =>
      update((arr: Craft[]) => {
        // Check to see if this craft exists in the store already.
        const existingCraftIndex: number = arr.findIndex(
          (v) => v.key == craft.key
        );

        // If the craft does exist, update its quantity by one and splice it over the old craft.
        if (existingCraftIndex > -1) {
          const existingCraft = arr[existingCraftIndex];
          existingCraft.quantity += 1;
          arr.splice(existingCraftIndex, 1, existingCraft);
          return [...arr];
          // Otherwise, just add the craft to the array.
        } else {
          return [...arr, craft];
        }
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
