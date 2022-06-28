<script>
  import { _ } from "svelte-i18n";
  import { onMount } from "svelte";
  import { crafts as craftStore } from "../../stores";
  import CraftRow from "../molecules/CraftRow.svelte";
  import ColumnHeader from "../atoms/ColumnHeader.svelte";
  import Button from "../atoms/Button.svelte";
  import { PlusCircleIcon } from "svelte-feather-icons";
  import { forceResize, getOS } from "#preload";
  import Pre from "../atoms/Pre.svelte";

  let crafts;
  let platform;

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
      forceResize();
      document.getElementById(`name-${key}`).focus();
    }, 0);
  };

  onMount(async () => {
    platform = await getOS();
  });

  export { crafts };
</script>

{#if crafts}
  <div>
    {#if crafts.length > 0}
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
          <ColumnHeader class="w-16" field="displayPrice"
            >{$_("crafts_price")}</ColumnHeader
          >
        </div>
        <div class="w-24 text-sm" />
      </div>
    {/if}
    <div class="space-y-1.5">
      {#if crafts.length > 0}
        <div id="crafts-list" class="space-y-1.5">
          {#each crafts as craft}
            <CraftRow bind:craft />
          {/each}
        </div>
      {:else}
        <div
          class="px-12 py-8 border-4 border-container bg-container rounded-xl text-center text-lg leading-loose"
          >{#if platform === "win32"}
            Use <Pre>Windows + Shift + S</Pre> to take a screengrab of your crafts.
            Then, use <Pre>Ctrl + V</Pre> to paste it here.
          {:else if platform === "darwin"}
            Use <Pre>⌘ + Shift + 4</Pre>
            to take a screenshot. Click the image that appears in the bottom right
            notification. Use
            <Pre>⌘ + C</Pre>
            to copy it to your clipboard. Finally, use
            <Pre>⌘ + V</Pre> to paste it here.
          {:else}
            Take a screenshot of the crafts in your Horticrafting station. Then,
            paste the image here to process the crafts.
          {/if}</div
        >
      {/if}
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
      </div>
    </div>
  </div>
{/if}
