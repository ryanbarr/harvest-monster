<script>
  import "./i18n.js";
  import { Router } from "svelte-routing";
  import { Modals } from "svelte-modals";
  import { settings } from "./stores";
  import ModalBackdrop from "./components/atoms/ModalBackdrop.svelte";
  import MainTemplate from "./components/templates/MainTemplate.svelte";
  import "./index.css";
  import { onDestroy } from "svelte";
  import { isLoading } from "svelte-i18n";

  /**
   * This allows us to subscribe to store changes and change CSS variables
   * on-the-fly, and is what powers real-time theme changes from settings.
   */
  const root = document.documentElement;
  const unsubscribe = settings.subscribe(() => {
    root.style.setProperty("--color-background", $settings.backgroundColor);
    root.style.setProperty("--color-container", $settings.containerColor);
    root.style.setProperty("--color-highlight", $settings.highlightColor);
    root.style.setProperty("--color-text", $settings.textColor);
  });
  onDestroy(unsubscribe);
</script>

{#if $isLoading}
  <span>Loading...</span>
{:else}
  <Router>
    <Modals>
      <ModalBackdrop slot="backdrop" />
    </Modals>
    <MainTemplate />
  </Router>
{/if}
