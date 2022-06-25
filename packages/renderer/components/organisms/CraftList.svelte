<script>
  import { _ } from "svelte-i18n";
  import { crafts as craftStore } from "../../stores";
  import CraftRow from "../molecules/CraftRow.svelte";
  import ColumnHeader from "../atoms/ColumnHeader.svelte";
  import Button from "../atoms/Button.svelte";
  import { PlusCircleIcon } from "svelte-feather-icons";

  let crafts;

  const addCraft = () => {
    const key = `custom-craft-${new Date().getTime()}`;
    craftStore.add({
      key,
      level: 83,
      name: "",
      price: 0,
      quantity: 1,
    });

    setTimeout(() => {
      document.getElementById(`name-${key}`).focus();
    }, 0);
  };

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
      <div id="crafts-list" class="space-y-1.5">
        {#each crafts as craft}
          <CraftRow bind:craft />
        {/each}
      </div>
      <div class="flex flex-row space-x-2">
        <div class="flex-grow">
          <Button
            class="w-full items-center inline-flex justify-center"
            on:click={addCraft}
            ><span class="py-2 flex items-center"
              ><PlusCircleIcon class="mr-3" size="1.25x" /> Add Craft</span
            ></Button
          >
        </div>
        <div class="w-24">&nbsp;</div>
      </div>
    </div>
  </div>
{/if}
