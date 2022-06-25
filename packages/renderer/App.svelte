<script>
  import "./i18n.js";
  import { Modals } from "svelte-modals";
  import { SvelteToast } from "@zerodevx/svelte-toast";
  import { settings } from "./stores";
  import ModalBackdrop from "./components/atoms/ModalBackdrop.svelte";
  import MainTemplate from "./components/templates/MainTemplate.svelte";
  import "./index.css";
  import { onDestroy } from "svelte";
  import { isLoading, locale } from "svelte-i18n";
  import { forceResize } from "#preload";

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
  // This timeout forces a resize after all content is loaded and only after the window is presented.
  setTimeout(() => forceResize(document.body.scrollHeight), 0);

  const toastOptions = {
    dismissable: false,
  };
</script>

{#if $isLoading}
  <span>Loading...</span>
{:else}
  <main>
    <Modals>
      <ModalBackdrop slot="backdrop" />
    </Modals>
    <MainTemplate />
    <SvelteToast options={toastOptions} />
  </main>
{/if}
