<script>
  import Titlebar from "../organisms/Titlebar.svelte";
  import Navigation from "../organisms/CraftBar.svelte";
  import Crafts from "../../pages/Crafts.svelte";
  import Settings from "../../pages/Settings.svelte";
  import Prices from "../../pages/Prices.svelte";
  import { page } from "../../stores";
</script>

<div class="bg-background w-full h-full rounded-lg bg-clip-content">
  <Titlebar />
  <div class="relative">
    {#if $page === "crafts"}
      <Navigation />
      <Crafts />
    {:else if $page === "settings"}
      <Settings />
    {:else if $page === "prices"}
      <Prices />
    {/if}
  </div>
</div>
