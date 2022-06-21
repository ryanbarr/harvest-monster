// @ts-ignore
import App from "./App.svelte";
import CraftProcessingModal from "./components/organisms/CraftProcessingModal.svelte";
import { openModal } from "svelte-modals";
import { crafts } from "./stores";
import { parseCrafts } from "#preload";

// Bind the application to the root element.
const app = new App({
  target: document.getElementById("app"),
});

document.onpaste = async function () {
  openModal(CraftProcessingModal);
  const newCrafts = await parseCrafts();

  // If we have parsed new crafts, build and save.
  if (newCrafts && newCrafts.length > 0) {
    for (let craft of newCrafts) {
      // Add the craft to the store.
      crafts.add(craft);
    }
    // Save all of the crafts to memory.
    crafts.save();
  }
};

export default app;
