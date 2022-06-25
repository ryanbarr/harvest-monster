<script>
  let clazz = "",
    name = "",
    value = "",
    dark = false,
    hasError = false;
  export { clazz as class, dark, hasError, name, value };
</script>

<input
  bind:value
  on:change
  on:keyup
  class={`${
    dark ? "bg-container" : "bg-background"
  } text-text text-sm px-3 py-1 rounded-xl focus:outline-2 ${
    hasError ? "focus:outline-red-500" : "focus:outline-highlight"
  } focus:ring-0 ${clazz}`}
  {name}
/>
