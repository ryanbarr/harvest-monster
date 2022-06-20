// @ts-ignore
import App from "./App.svelte";
import { crafts } from "./stores";
import { parseCrafts } from "#preload";

// Bind the application to the root element.
const app = new App({
  target: document.getElementById("app"),
});

document.onpaste = async function() {
  const newCrafts = await parseCrafts();

  if (newCrafts && newCrafts.length > 0) {
    for (let craft of newCrafts) {
      crafts.addCraft(craft);
    }
  }
};

export default app;
