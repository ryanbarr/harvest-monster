<script>
  let name = "",
    value = "";
  export { name, value };
</script>

<textarea
  class="border-none w-full h-20 bg-background resize-none rounded-lg px-3 py-2 text-sm ring-offset-0 focus:outline focus:outline-highlight focus:ring focus:ring-higlight"
  {name}
  bind:value
  on:change
  on:keyup
/>
