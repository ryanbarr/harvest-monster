<script>
  import { Router, Route } from "svelte-routing";
  import Link from "./components/atoms/Link.svelte";
  import PrimaryButton from "./components/atoms/PrimaryButton.svelte";
  import LabeledToggle from "./components/molecules/LabeledToggle.svelte";
  import ToolbarButton from "./components/atoms/ToolbarButton.svelte";
  import Crafts from "./pages/Crafts.svelte";
  import SettingsPage from "./pages/Settings.svelte";
  import {
    Maximize2Icon,
    MinusIcon,
    ServerIcon,
    SettingsIcon,
    XIcon,
  } from "svelte-feather-icons";
  import { settings } from "./stores";
  import { minimize } from "#preload";

  export let url = "";
  let autoList = false;
  function handleAutoListToggle() {
    autoList = !autoList;
  }
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

  const getProps = () => {};
</script>

<Router {url}>
  <div
    id="titlebar"
    class="bg-container px-1 py-1 fixed w-full flex justify-between rounded-t-lg"
  >
    <span class="px-2">Harvest<span class="text-highlight">Monster</span></span>
    <div class="flex flex-grow justify-end space-x-1">
      <ToolbarButton on:click={() => minimize()}
        ><MinusIcon size="1x" /></ToolbarButton
      >
      <ToolbarButton on:click={() => window.close()}
        ><XIcon size="1x" /></ToolbarButton
      >
    </div>
  </div>
  <div
    class="flex flex-row justify-between items-center p-2 space-x-6 fixed w-full bg-background z-10 mt-8"
  >
    <div class="pl-2">
      <img src="./hm-logo.png" alt="HarvestMonster" class="w-10" />
    </div>
    <nav
      class="flex flex-row justify-end items-center space-x-4 pt-1 leading-[0]"
    >
      <Link to="/" {getProps} class="border-l-4">
        <span class="inline-flex items-center">
          <ServerIcon size="1.25x" class="mr-2" /> Crafts
        </span>
      </Link>
      <Link to="/settings">
        <span class="inline-flex items-center">
          <SettingsIcon size="1.25x" class="mr-2" /> Settings
        </span>
      </Link>
    </nav>
    <div class="grow">
      <div class="flex flex-row justify-end space-x-6">
        <LabeledToggle on:click={handleAutoListToggle} enabled={autoList}>
          Autolist
        </LabeledToggle>
        <PrimaryButton>Create post</PrimaryButton>
      </div>
    </div>
  </div>
  <div class="h-20" />
  <div class="bg-background rounded-b-lg">
    <Route path="/settings"><SettingsPage /></Route>
    <Route path="/"><Crafts /></Route>
  </div>
</Router>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }
</style>
