<script>
  let clazz = "";
  let name = "";
  let value = "";
  let dark = false;
  export { clazz as class, dark, name, value };
</script>

<input
  bind:value
  class={`${
    dark ? "bg-container" : "bg-background"
  } text-text text-sm px-3 py-1 rounded-xl focus:outline-2 focus:outline-highlight focus:ring-0 ${clazz}`}
  {name}
/>
