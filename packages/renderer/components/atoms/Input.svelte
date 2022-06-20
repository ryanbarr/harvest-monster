<script>
  let clazz = "";
  let name = "";
  let value = "";
  export { clazz as class, name, value };
</script>

<input
  bind:value
  class={`bg-background text-text px-3 py-2 rounded-lg ${clazz}`}
  {name}
/>
