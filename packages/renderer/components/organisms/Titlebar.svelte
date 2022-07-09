<script>
  import { onMount } from "svelte";
  import { _ } from "svelte-i18n";
  import ToolbarButton from "../atoms/ToolbarButton.svelte";
  import {
    DollarSignIcon,
    MinusIcon,
    ServerIcon,
    SettingsIcon,
    XIcon,
  } from "svelte-feather-icons";
  import { minimize } from "#preload";
  import { page } from "../../stores";
  import { isNewVersionAvailable } from "../../utils/isNewVersionAvailable";

  let updateAvailable = false;

  onMount(async () => {
    updateAvailable = await isNewVersionAvailable();
  });
</script>

<div
  id="titlebar"
  class="bg-container pl-1 pr-0.5 py-2 fixed w-full flex justify-between rounded-t-lg z-50 space-x-6"
>
  <div class="pl-2">
    <img src="./hm-logo.png" alt="HarvestMonster" class="w-12" />
  </div>
  <nav
    class="flex flex-row justify-end items-center space-x-4 pt-1 leading-[0]"
  >
    <button
      class={`border-l-4 ${$page === "crafts" ? "active" : "inactive"}`}
      on:click={() => page.set("crafts")}
    >
      <span class="inline-flex items-center">
        <ServerIcon size="1.25x" class="mr-2" />
        {$_("nav_crafts")}
      </span>
    </button>
    <button
      class={`border-l-4 ${$page === "prices" ? "active" : "inactive"}`}
      on:click={() => page.set("prices")}
    >
      <span class="inline-flex items-center">
        <DollarSignIcon size="1.25x" class="mr-1" />
        {$_("nav_prices")}
      </span>
    </button>
    <button
      class={`border-l-4 ${$page === "settings" ? "active" : "inactive"}`}
      on:click={() => page.set("settings")}
    >
      <span class="inline-flex items-center">
        <SettingsIcon size="1.25x" class="mr-2" />
        {$_("nav_settings")}
      </span>
    </button>
  </nav>
  <div class="inline-flex items-center flex-grow justify-end space-x-0.5 pr-2">
    {#if updateAvailable}
      <span
        class="bg-background text-highlight text-xs font-bold px-1 py-0.5 rounded mr-4"
        >UPDATE AVAILABLE</span
      >
    {:else}
      <span
        class="bg-background text-highlight text-xs font-bold px-1 py-0.5 rounded mr-4"
        >BETA BUILD</span
      >
    {/if}
    <ToolbarButton on:click={() => minimize()}
      ><MinusIcon size="1x" /></ToolbarButton
    >
    <ToolbarButton on:click={() => window.close()}
      ><XIcon size="1x" /></ToolbarButton
    >
  </div>
</div>
