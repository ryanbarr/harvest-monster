<script>
  import { _ } from "svelte-i18n";
  import Button from "../atoms/Button.svelte";
  import Input from "../atoms/Input.svelte";
  import { DollarSignIcon, XIcon } from "svelte-feather-icons";
  import { crafts } from "../../stores";
  import { formatPrice } from "../../utils/formatPrice";

  let craft;

  export { craft };
</script>

<div class={`flex flex-row space-x-2 ${craft ? "" : "opacity-50"}`}>
  <div class="bg-container rounded-2xl flex flex-row flex-grow space-x-1 p-1">
    <Input class="w-12 text-center" value={craft?.quantity} />
    <Input class="w-72 flex-grow" dark value={craft?.name} />
    <Input
      class="w-12 text-center"
      value={craft?.level > 0 ? craft?.level : craft === null ? "" : 83}
    />
    <Input class="w-16 text-center text-xs" value={formatPrice(craft?.price)} />
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
        <!-- {$_("crafts_sell")} -->
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
        <!-- {$_("crafts_delete")} -->
      </div>
    </Button>
  </div>
</div>
