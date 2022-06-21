<script>
  import { _ } from "svelte-i18n";
  import CraftRow from "../molecules/CraftRow.svelte";
  import { crafts } from "../../stores";
  $: filler = Array.from(Array(15 - $crafts?.length).keys());
</script>

<div>
  <div class="flex flex-row space-x-2 text-center">
    <div class="flex flex-row flex-grow space-x-1 p-1 text-xs">
      <span class="w-12">{$_("crafts_quantity")}</span>
      <span class="w-72 flex-grow">{$_("crafts_craft")}</span>
      <span class="w-12">{$_("crafts_level")}</span>
      <span class="w-12">{$_("crafts_price")}</span>
    </div>
    <div class="w-44 text-sm" />
  </div>
  <div class="space-y-1.5">
    {#each $crafts as craft}
      <CraftRow {craft} />
    {/each}
    {#each filler as row}
      <CraftRow craft={null} />
    {/each}
  </div>
</div>
