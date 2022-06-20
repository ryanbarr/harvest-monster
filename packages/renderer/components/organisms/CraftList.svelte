<script>
  import { onDestroy } from "svelte";
  import CraftRow from "../molecules/CraftRow.svelte";
  import { crafts } from "../../stores";
  $: test = Array.from(Array(15 - $crafts?.length).keys());
</script>

<div>
  <div class="flex flex-row space-x-2 text-center">
    <div class="flex flex-row flex-grow space-x-1 p-1 text-xs">
      <span class="w-12">Qty</span>
      <span class="w-72 flex-grow">Craft</span>
      <span class="w-12">Level</span>
      <span class="w-12">Price</span>
    </div>
    <div class="w-44 text-sm" />
  </div>
  <div class="space-y-1.5">
    {#each $crafts as craft}
      <CraftRow {craft} />
    {/each}
    {#each test as y}
      <CraftRow craft={null} />
    {/each}
  </div>
</div>
