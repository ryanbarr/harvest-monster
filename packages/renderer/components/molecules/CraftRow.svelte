<script>
  import { _ } from "svelte-i18n";
  import { get } from "svelte/store";
  import throttle from "lodash/throttle";
  import Button from "../atoms/Button.svelte";
  import Input from "../atoms/Input.svelte";
  import NumberInput from "../atoms/NumberInput.svelte";
  import { DollarSignIcon, XIcon } from "svelte-feather-icons";
  import { crafts, settings, exaltToChaosRate, dictionary } from "../../stores";
  import { formatPrice } from "../../utils/formatPrice";
  import { warning } from "../../utils/toast";
  import { onDestroy, onMount } from "svelte";
  import { forceResize } from "#preload";
  import { parsePrice } from "../../utils/parsePrice";
  import Autocomplete from "./Autocomplete.svelte";

  let craft,
    index,
    fieldPrice,
    priceError = false,
    suggestions = [],
    isFocused = false;

  const handleChange = (field) => {
    crafts.edit(craft.key, field, craft[field]);
    crafts.save();
  };

  const handleMousewheel = throttle((e) => {
    e.preventDefault();
    let newQuantity = craft.quantity;
    if (e.deltaY > 0) {
      newQuantity -= 1;
    } else if (e.deltaY < 0) {
      newQuantity += 1;
    }

    if (newQuantity < 0) {
      newQuantity = 0;
    }

    crafts.edit(craft.key, "quantity", newQuantity);
    crafts.save();
  }, 100);

  const adjustPrice = (e) => {
    priceError = false;
    const rate = get(exaltToChaosRate);
    const length = fieldPrice.length;
    const isExalts = fieldPrice.substr(length - 2, length) === "ex";
    const isChaos = fieldPrice.substr(length - 1, length) === "c";
    let exaltValue = 0;

    if (!isExalts && !isChaos) {
      priceError = true;
    } else if (isExalts) {
      exaltValue = parseFloat(fieldPrice.substr(0, length - 2));
    } else if (isChaos) {
      const chaosValue = parseInt(fieldPrice.substr(0, length - 1));
      const fpp = parseInt((chaosValue / rate) * 100);
      exaltValue = parseFloat(fpp / 100);
    }

    if (isNaN(exaltValue)) {
      exaltValue = 0;
    }

    if (exaltValue !== craft.price) {
      crafts.edit(craft.key, "price", exaltValue);
      crafts.save();

      if ($settings.autoPrice) {
        settings.changeSetting("autoPrice", false);
        settings.save();
        warning({
          title: "Auto-pricing turned off!",
          text: "Crafts will no longer be priced automatically since a price was changed manually.",
        });
      }
    }
  };

  const handleSuggestions = async (e) => {
    const name = craft["name"];
    const dict = await get(dictionary);

    // If we don't have autocomplete support for this language, don't try.
    if (!dict) return;

    let options = Object.values(dict.value);

    // Filter to only crafts that start with this input.
    options = options.filter((v) =>
      v.toLowerCase().startsWith(name.toLowerCase().trim())
    );

    // Only show five suggestions.
    options.length = options.length > 5 ? 5 : options.length;

    // If there is only one suggestion and it matches the current value, don't show it.
    if (options.length === 1 && options[0] === name) {
      options.length = 0;
    }

    suggestions = options;

    forceResize();
  };

  const clearSuggestions = (e) => {
    suggestions = null;
    forceResize();
  };

  const acceptSuggestion = async (suggestion) => {
    const dict = await get(dictionary);
    craft["name"] = Object.keys(dict?.value).find(
      (v) => dict?.value[v] === suggestion
    );
    handleChange("name");
    clearSuggestions();
  };

  const unsubscribe = settings.subscribe(() => {
    fieldPrice = craft ? formatPrice(parsePrice(craft.displayPrice)) : "";
  });

  onMount(() => {
    fieldPrice = craft ? formatPrice(parsePrice(craft.displayPrice)) : "";
  });

  onDestroy(unsubscribe);

  export { craft };
</script>

{#if craft !== null}
  <div class={`flex flex-row space-x-2 ${craft ? "" : "opacity-50"}`}>
    <div class="bg-container rounded-2xl flex flex-row flex-grow space-x-1 p-1">
      <NumberInput
        class="w-12 text-center"
        bind:value={craft["quantity"]}
        on:change={() => handleChange("quantity")}
        on:mousewheel={(e) => handleMousewheel(e)}
        on:focus={() => clearSuggestions()}
        round
      />
      <div class="relative w-72 flex-grow">
        <Input
          class={`w-full ${craft.quantity === 0 ? "line-through" : ""}`}
          dark
          bind:value={craft["name"]}
          on:keyup={() => handleSuggestions()}
          on:change={() => handleChange("name")}
          name="name"
          id={`name-${craft.key}`}
        />
        <Autocomplete
          bind:suggestions
          on:clickoutside={() => clearSuggestions()}
          onSelect={acceptSuggestion}
        />
      </div>
      <Input
        class="w-12 text-center"
        bind:value={craft["level"]}
        on:change={() => handleChange("level")}
        on:focus={() => clearSuggestions()}
        round
      />
      <Input
        class="w-16 text-center text-xs"
        hasError={priceError}
        bind:value={craft["displayPrice"]}
        on:keyup={adjustPrice}
        on:focus={() => clearSuggestions()}
        round
      />
    </div>
    <div class="w-24 flex space-x-2 text-sm">
      <Button
        class="flex-grow"
        disabled={craft === null}
        on:click={() => {
          crafts.sell(craft);
          crafts.save();
          forceResize();
        }}
      >
        <div class="inline-flex items-center">
          <DollarSignIcon size="1x" class="mx-auto" />
        </div>
      </Button>
      <Button
        class="flex-grow"
        disabled={craft === null}
        on:click={() => {
          crafts.delete(craft);
          crafts.save();
          forceResize();
        }}
      >
        <div class="inline-flex items-center">
          <XIcon size="1x" class="mx-auto" />
        </div>
      </Button>
    </div>
  </div>
{/if}
