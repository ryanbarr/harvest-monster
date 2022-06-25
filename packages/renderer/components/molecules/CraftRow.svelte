<script>
  import { _ } from "svelte-i18n";
  import Button from "../atoms/Button.svelte";
  import Input from "../atoms/Input.svelte";
  import { DollarSignIcon, XIcon } from "svelte-feather-icons";
  import { crafts, settings } from "../../stores";
  import { formatPrice } from "../../utils/formatPrice";
  import { warning } from "../../utils/toast";
  import { onMount } from "svelte";
  import { LS_EXALT_PRICE_KEY } from "../../constants";

  let craft,
    index,
    fieldPrice,
    priceError = false;

  const handleChange = (field) => {
    crafts.edit(craft.key, field, craft[field]);
    crafts.save();
  };

  const adjustPrice = () => {
    if ($settings.autoPrice) {
      settings.changeSetting("autoPrice", false);
      warning({
        title: "Auto-pricing turned off!",
        text: "Crafts will no longer be priced automatically since a price was changed manually.",
      });
    }

    priceError = false;
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
      const fpp = parseInt(
        (chaosValue /
          parseFloat(window.localStorage.getItem(LS_EXALT_PRICE_KEY))) *
          100
      );
      exaltValue = parseFloat(fpp / 100);
    }

    if (isNaN(exaltValue)) {
      exaltValue = 0;
    }

    crafts.edit(craft.key, "price", exaltValue);
    crafts.save();
  };

  onMount(() => {
    fieldPrice = craft ? formatPrice(craft.price) : "";
  });

  export { craft };
</script>

{#if craft !== null}
  <div class={`flex flex-row space-x-2 ${craft ? "" : "opacity-50"}`}>
    <div class="bg-container rounded-2xl flex flex-row flex-grow space-x-1 p-1">
      <Input
        class="w-12 text-center"
        bind:value={craft["quantity"]}
        on:change={() => handleChange("quantity")}
      />
      <Input
        class="w-72 flex-grow"
        dark
        bind:value={craft["name"]}
        on:change={() => handleChange("name")}
      />
      <Input
        class="w-12 text-center"
        bind:value={craft["level"]}
        on:change={() => handleChange("level")}
      />
      <Input
        class="w-16 text-center text-xs"
        hasError={priceError}
        bind:value={fieldPrice}
        on:keyup={adjustPrice}
      />
    </div>
    <div class="w-24 flex space-x-2 text-sm">
      <Button
        class="flex-grow"
        disabled={craft === null}
        on:click={() => {
          crafts.sell(craft);
          crafts.save();
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
        }}
      >
        <div class="inline-flex items-center">
          <XIcon size="1x" class="mx-auto" />
        </div>
      </Button>
    </div>
  </div>
{/if}
