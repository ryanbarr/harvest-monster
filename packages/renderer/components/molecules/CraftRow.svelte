<script>
  import Button from "../atoms/Button.svelte";
  import Input from "../atoms/Input.svelte";
  import { DollarSignIcon, TrashIcon } from "svelte-feather-icons";

  let craft;

  export { craft };
</script>

<div class="flex flex-row space-x-2">
  <div class="bg-container rounded-xl flex flex-row flex-grow space-x-1 p-1">
    <div>
      <Input class="w-12 text-center" value={craft?.quantity} />
    </div>
    <div class="flex-grow">
      <Input class="w-72 min-w-full" value={craft?.name} />
    </div>
    <div>
      <Input class="w-12 text-center" value={craft?.level > 0 ? craft?.level : 83} />
    </div>
    <div class="bg-background w-12 h-8 rounded-lg" />
  </div>
  <div class="w-44 flex space-x-2 text-sm">
    <Button class="flex-grow"
      ><div class="inline-flex items-center">
        <DollarSignIcon size="1x" class="mr-1" /> Sell
      </div></Button
    >
    <Button class="flex-grow"
      ><div class="inline-flex items-center">
        <TrashIcon size="1x" class="mr-1" /> Delete
      </div></Button
    >
  </div>
</div>
