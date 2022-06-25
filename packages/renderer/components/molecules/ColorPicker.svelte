<script>
  import Input from "../atoms/Input.svelte";

  let color, name;
  export { color, name };
</script>

<div class="inline-flex items-center space-x-3 relative">
  <Input
    {name}
    bind:value={color}
    on:change
    class="inline-flex w-full font-bold"
  />
  <label
    class="w-8 h-8 inline-flex bg-black rounded-full shadow border-2 border-white cursor-pointer"
    style={`background-color: ${color}`}
  >
    <input
      type="color"
      bind:value={color}
      on:change
      class="opacity-0 cursor-pointer"
    />
  </label>
</div>
