<script>
  import { _ } from "svelte-i18n";
  import PrimaryButton from "../atoms/PrimaryButton.svelte";
  import LabeledToggle from "../molecules/LabeledToggle.svelte";
  import { copyPost } from "#preload";
  import { formatPost } from "../../utils/formatPost";
  import { formatValue } from "../../utils/formatValue";
  import { getInventory } from "../../utils/getInventory";
  import { crafts } from "../../stores";
  import { LS_EXALT_PRICE_KEY } from "../../constants";

  let inventory = getInventory($crafts);
  let autoList = false;
  function handleAutoListToggle() {
    autoList = !autoList;
  }

  crafts.subscribe(() => {
    inventory = getInventory($crafts);
  });
</script>

<div
  class="flex flex-row justify-between items-center px-2 py-4 space-x-6 fixed w-full bg-background z-10 mt-16"
>
  <div>
    <span class="bg-container rounded py-2 px-4 ml-2 text-sm"
      >{inventory.count}
      {$_("nav_crafts").toLowerCase()} | {formatValue(inventory.value)}</span
    >
    <span class="text-xs"
      >{window.localStorage.getItem(LS_EXALT_PRICE_KEY)}:1</span
    ></div
  >
  <div class="grow">
    <div class="flex flex-row justify-end space-x-6">
      <LabeledToggle on:click={handleAutoListToggle} enabled={autoList}>
        {$_("nav_autolist")}
      </LabeledToggle>
      <PrimaryButton on:click={() => copyPost(formatPost())}
        >{$_("nav_copy")}</PrimaryButton
      >
    </div>
  </div>
</div>
