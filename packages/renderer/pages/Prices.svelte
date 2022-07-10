<script>
  import { _ } from "svelte-i18n";
  import { onDestroy, onMount } from "svelte";
  import { fetchData } from "../utils/fetchData";
  import { determinePrice } from "../utils/determinePrice";
  import { settings, tftPrices } from "../stores";
  import Input from "../components/atoms/Input.svelte";
  import { forceResize } from "#preload";
  import { ChevronDownIcon, ChevronUpIcon } from "svelte-feather-icons";
  import tftTranslations from "../assets/locales/_tft";

  let filterText;
  let data = [];
  $: sortColumn = "name";
  $: sortDirection = "ascending";
  $: Icon = sortDirection === "ascending" ? ChevronUpIcon : ChevronDownIcon;
  $: prices = [];

  console.log($settings.language.code);

  onMount(async () => {
    // Get the latest pricing data, since the user explicitly loaded this page.
    await fetchData(true);
    forceResize();
  });

  const handleColumnClick = (column) => {
    if (column === sortColumn && sortDirection === "ascending") {
      sortDirection = "descending";
    } else {
      sortColumn = column;
      sortDirection = "ascending";
    }
    handleSort();
  };

  const handleTranslate = () => {
    const languageCode = $settings.language.code;
    const translations =
      tftTranslations?.[languageCode] ?? tftTranslations["en"];
    data = data.map((v) => {
      return {
        ...v,
        en_name: v.name,
        name: translations[v.name],
      };
    });
    prices = [...data];
  };

  const handleSort = () => {
    prices.sort((a, b) => {
      const ax = a[sortColumn];
      const bx = b[sortColumn];

      if (sortDirection === "ascending") {
        return ax > bx ? 1 : -1;
      } else {
        return bx > ax ? 1 : -1;
      }
    });
    prices = [...prices];
  };

  const handleFilter = () => {
    prices = data.filter((v) =>
      v.name.toLowerCase().includes(filterText.toLowerCase())
    );
    handleSort();
  };

  const unsubscribe = tftPrices.subscribe((tftData) => {
    data = tftData.data;
    prices = tftData.data;
    handleTranslate();
    handleSort();
  });

  onDestroy(unsubscribe);
</script>

<div class="p-2 pt-16 flex flex-col">
  <div class="flex flex-row pt-3 pb-3">
    <Input
      dark
      class="w-full"
      placeholder={$_("prices_filter")}
      bind:value={filterText}
      on:keyup={handleFilter}
    />
  </div>
  <table class="table-fixed">
    <thead class="text-left">
      <tr class="sticky top-[4.25rem] shadow z-10">
        <th
          class="text-sm px-4 py-2 bg-container rounded-l-lg cursor-pointer"
          colspan={2}
          on:click={() => handleColumnClick("name")}
          ><span
            class={`flex flex-row items-center select-none ${
              sortColumn === "name" ? "text-highlight" : ""
            }`}
            >{$_("prices_craft")}{#if sortColumn === "name"}<svelte:component
                this={Icon}
                size="1x"
                class="ml-1"
              />{/if}</span
          ></th
        >
        <th
          class="text-sm pl-0 pr-4 py-2 bg-container rounded-r-lg cursor-pointer"
          on:click={() => handleColumnClick("chaos")}
          ><span
            class={`flex flex-row items-center select-none ${
              sortColumn === "chaos" ? "text-highlight" : ""
            }`}
            >{$_("prices_price")}{#if sortColumn === "chaos"}<svelte:component
                this={Icon}
                size="1.25x"
                class="ml-1"
              />{/if}</span
          ></th
        >
      </tr>
    </thead>
    <tbody>
      {#each prices as craft, i}
        <tr>
          <td
            class={`group px-4 py-1 rounded-l-lg ${
              i % 2 === 1 ? "bg-container" : ""
            }`}
          >
            <span class="inline-block group-hover:hidden">{craft.name}</span
            ><span class="hidden group-hover:inline-block">{craft.en_name}</span
            ></td
          >
          <td class={`${i % 2 === 1 ? "bg-container" : ""}`}>
            {#if craft.lowConfidence}
              <span class="text-highlight text-xs">(Low confidence)</span>
            {/if}
          </td>
          <td
            class={`pl-0 pr-4 py-1 rounded-r-lg ${
              i % 2 === 1 ? "bg-container" : ""
            }`}
            ><span>{determinePrice(craft)}</span>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
