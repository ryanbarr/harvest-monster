<script>
  import { Router, Route, Link } from "svelte-routing";
  import Button from "./components/atoms/Button.svelte";
  import Crafts from "./pages/Crafts.svelte";
  import SettingsPage from "./pages/Settings.svelte";
  import { ServerIcon, SettingsIcon } from "svelte-feather-icons";
  import { settings } from "./stores";

  let autoList = false;
  function handleAutoListToggle() {
    console.log("yes");
    autoList = !autoList;
  }
  import LabeledToggle from "./components/molecules/LabeledToggle.svelte";
  import "./index.css";
  import { onDestroy } from "svelte";

  const root = document.documentElement;
  const unsubscribe = settings.subscribe(() => {
    root.style.setProperty("--color-background", $settings.backgroundColor);
    root.style.setProperty("--color-container", $settings.containerColor);
    root.style.setProperty("--color-highlight", $settings.highlightColor);
    root.style.setProperty("--color-text", $settings.textColor);
  });

  onDestroy(unsubscribe);
</script>

<span />

<Router>
  <div class="flex flex-row justify-between items-center p-2 space-x-4">
    <div>
      <h1 class="font-mono text-2xl">
        <span class="text-highlight">C</span>raft<span class="text-highlight"
          >S</span
        >ell
      </h1>
    </div>
    <div class="grow">
      <div class="flex flex-row justify-end">
        <LabeledToggle on:click={handleAutoListToggle} enabled={autoList}
          >Autolist</LabeledToggle
        >
      </div>
    </div>
    <nav class="flex flex-row justify-end space-x-2">
      <Link to="/">
        <Button
          ><div class="inline-flex items-center">
            <ServerIcon size="1.25x" class="mr-2" /> Crafts
          </div></Button
        >
      </Link>
      <Link to="/settings">
        <Button
          ><div class="inline-flex items-center">
            <SettingsIcon size="1.25x" class="mr-2" /> Settings
          </div></Button
        >
      </Link>
    </nav>
  </div>
  <Route path="/settings"><SettingsPage /></Route>
  <Route path="/"><Crafts /></Route>
</Router>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }
</style>
