<script>
  let clazz = "",
    name = "",
    value = "",
    dark = false,
    round = false,
    hasError = false,
    min = 0;
  export { clazz as class, dark, hasError, min, name, round, value };
</script>

<input
  bind:value
  on:blur
  on:change
  on:focus
  on:keyup
  on:mousewheel
  type="number"
  {min}
  class={`${
    dark ? "bg-container" : "bg-background"
  } text-text text-center text-sm px-3 py-1 border-none focus:ring focus:outline ${
    hasError
      ? "focus:outline-red-500 focus:ring-red-500"
      : "focus:outline-highlight focus:ring-highlight"
  } ${round ? "rounded-xl" : "rounded-lg"} ${clazz}`}
  {name}
/>
