<script>
  import { Router } from "svelte-routing";
  import { settings } from "./stores";
  import MainTemplate from "./components/templates/MainTemplate.svelte";
  import "./index.css";
  import { onDestroy } from "svelte";

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

<Router>
  <MainTemplate />
</Router>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }
</style>
