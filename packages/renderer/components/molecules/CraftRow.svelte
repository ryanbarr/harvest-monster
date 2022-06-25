<script>
  import { _ } from "svelte-i18n";
  import { get } from "svelte/store";
  import throttle from "lodash/throttle";
  import Button from "../atoms/Button.svelte";
  import Input from "../atoms/Input.svelte";
  import NumberInput from "../atoms/NumberInput.svelte";
  import { DollarSignIcon, XIcon } from "svelte-feather-icons";
  import { crafts, settings, exaltToChaosRate } from "../../stores";
  import { formatPrice } from "../../utils/formatPrice";
  import { warning } from "../../utils/toast";
  import { onMount } from "svelte";
  import { forceResize } from "#preload";

  let craft,
    index,
    fieldPrice,
    priceError = false;

  const handleChange = (field) => {
    crafts.edit(craft.key, field, craft[field]);
    crafts.save();
  };

  const handleMousewheel = throttle((e) => {
    e.preventDefault();
    let newQuantity = craft.quantity;
    if (e.deltaY > 0) {
      newQuantity += 1;
    } else if (e.deltaY < 0) {
      newQuantity -= 1;
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

  onMount(() => {
    fieldPrice = craft ? formatPrice(craft.price) : "";
  });

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
        round
      />
      <Input
        class="w-72 flex-grow"
        dark
        bind:value={craft["name"]}
        on:change={() => handleChange("name")}
        name="name"
        id={`name-${craft.key}`}
      />
      <Input
        class="w-12 text-center"
        bind:value={craft["level"]}
        on:change={() => handleChange("level")}
        round
      />
      <Input
        class="w-16 text-center text-xs"
        hasError={priceError}
        bind:value={fieldPrice}
        on:keyup={adjustPrice}
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
