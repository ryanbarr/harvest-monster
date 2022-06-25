<script>
  let name = "",
    value = "";
  export { name, value };
</script>

<textarea
  class="w-full h-20 bg-background resize-none rounded-lg px-3 py-2 text-sm"
  {name}
  bind:value
  on:change
  on:keyup
/>
