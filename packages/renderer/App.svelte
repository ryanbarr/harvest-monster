<script>
  import "./i18n.js";
  import { Modals } from "svelte-modals";
  import { SvelteToast } from "@zerodevx/svelte-toast";
  import { settings } from "./stores";
  import ModalBackdrop from "./components/atoms/ModalBackdrop.svelte";
  import MainTemplate from "./components/templates/MainTemplate.svelte";
  import "./index.css";
  import { onDestroy, onMount } from "svelte";
  import { isLoading, locale } from "svelte-i18n";
  import { forceResize } from "#preload";
  import { fetchData } from "./utils/fetchData";

  /**
   * This allows us to subscribe to store changes and change CSS variables
   * on-the-fly, and is what powers real-time theme changes from settings.
   */
  const root = document.documentElement;
  const unsubscribe = settings.subscribe(() => {
    locale.set($settings.language.code);
    root.style.setProperty("--color-background", $settings.backgroundColor);
    root.style.setProperty("--color-container", $settings.containerColor);
    root.style.setProperty("--color-highlight", $settings.highlightColor);
    root.style.setProperty("--color-text", $settings.textColor);
    root.style.setProperty("--toastBackground", $settings.containerColor);
  });
  onDestroy(unsubscribe);

  onMount(() => {
    forceResize();
    fetchData();
  });

  const toastOptions = {
    dismissable: false,
  };
</script>

{#if $isLoading}
  <span>Loading...</span>
{:else}
  <main id="main-content">
    <Modals>
      <ModalBackdrop slot="backdrop" />
    </Modals>
    <MainTemplate />
    <SvelteToast options={toastOptions} />
  </main>
{/if}
