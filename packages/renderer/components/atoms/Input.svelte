<script>
  let clazz = "",
    id = "",
    name = "",
    value = "",
    dark = false,
    placeholder = "",
    round = false,
    hasError = false;
  export {
    clazz as class,
    dark,
    hasError,
    id,
    name,
    placeholder,
    round,
    value,
  };
</script>

<input
  bind:value
  on:blur
  on:change
  on:focus
  on:keyup
  on:mousewheel
  class={`${
    dark ? "bg-container" : "bg-background"
  } text-text text-sm px-3 py-1 focus:ring focus:outline ${
    hasError
      ? "focus:outline-red-500 focus:ring-red-500"
      : "focus:outline-highlight focus:ring-highlight"
  } ${round ? "rounded-xl" : "rounded-lg"} ${clazz}`}
  {name}
  {id}
  {placeholder}
/>
