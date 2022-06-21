import { writable } from "svelte/store";
import themes from "./assets/themes";

export interface Craft {
  id: Symbol;
  key: string;
  level: number;
  name: string;
  quantity: number;
}

export interface Settings {
  backgroundColor?: string;
  containerColor?: string;
  highlightColor?: string;
  textColor?: string;
}

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
  const { set, subscribe, update } = writable<Settings>({
    backgroundColor: "#353535",
    containerColor: "#232323",
    highlightColor: "#52DFFF",
    textColor: "#C6C6C6",
  });

  return {
    reset: () =>
      update((currentSettings) => {
        return {
          ...currentSettings,
          backgroundColor: "#353535",
          containerColor: "#232323",
          highlightColor: "#52DFFF",
          textColor: "#C6C6C6",
        };
      }),
    applyTheme: (themeId) => {
      const theme = themes[themes.findIndex((t) => t.id === themeId)];
      update((currentSettings) => {
        return {
          ...currentSettings,
          backgroundColor: theme.backgroundColor,
          containerColor: theme.containerColor,
          highlightColor: theme.highlightColor,
          textColor: theme.textColor,
        };
      });
    },
    set,
    subscribe,
  };
}

export const crafts = createCrafts();
export const settings = createSettings();
