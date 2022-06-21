<script>
  import ToolbarButton from "../atoms/ToolbarButton.svelte";
  import { MinusIcon, XIcon } from "svelte-feather-icons";
  import { minimize } from "#preload";
</script>

<div
  id="titlebar"
  class="bg-container px-1 py-1 fixed w-full flex justify-between rounded-t-lg z-20"
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
