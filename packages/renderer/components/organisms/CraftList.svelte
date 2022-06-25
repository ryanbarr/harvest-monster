<script>
  import { _ } from "svelte-i18n";
  import CraftRow from "../molecules/CraftRow.svelte";
  import ColumnHeader from "../atoms/ColumnHeader.svelte";

  let crafts;

  // $: filler = Array.from(Array(15 - $crafts?.length).keys());

  export { crafts };
</script>

{#if crafts}
  <div>
    <div class="flex flex-row space-x-2 text-center">
      <div class="flex flex-row flex-grow space-x-1 p-1 text-xs">
        <ColumnHeader class="w-12" field="quantity"
          >{$_("crafts_quantity")}</ColumnHeader
        >
        <ColumnHeader class="w-72 flex-grow" field="name"
          >{$_("crafts_craft")}</ColumnHeader
        >
        <ColumnHeader class="w-12" field="level"
          >{$_("crafts_level")}</ColumnHeader
        >
        <ColumnHeader class="w-16" field="price"
          >{$_("crafts_price")}</ColumnHeader
        >
      </div>
      <div class="w-24 text-sm" />
    </div>
    <div class="space-y-1.5">
      {#each crafts as craft}
        <CraftRow bind:craft />
      {/each}
      <!-- {#each filler as row}
      <CraftRow craft={null} /> -->
      <!-- {/each} -->
    </div>
  </div>
{/if}
