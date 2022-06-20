<script>
  import Button from "../atoms/Button.svelte";
  import Input from "../atoms/Input.svelte";
  import { DollarSignIcon, XIcon } from "svelte-feather-icons";

  let craft;

  export { craft };
</script>

<div class="flex flex-row space-x-2">
  <div class="bg-container rounded-xl flex flex-row flex-grow space-x-1 p-1">
    <Input class="w-12 text-center" value={craft?.quantity} />
    <Input class="w-72 flex-grow" dark value={craft?.name} />
    <Input class="w-12 text-center" value={craft?.level > 0 ? craft?.level : craft === null ? "" : 83} />
    <Input class="w-12 text-center" />
  </div>
  <div class="w-44 flex space-x-2 text-sm">
    <Button class="flex-grow"
      ><div class="inline-flex items-center">
        <DollarSignIcon size="1x" class="mr-1" /> Sell
      </div></Button
    >
    <Button class="flex-grow"
      ><div class="inline-flex items-center">
        <XIcon size="1x" class="mr-1" /> Delete
      </div></Button
    >
  </div>
</div>
