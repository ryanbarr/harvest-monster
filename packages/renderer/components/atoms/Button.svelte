<script>
  let clazz = "",
    disabled = false;
  export { clazz as class, disabled };
</script>

<button
  on:click
  class={`bg-container px-3 pt-0.5 leading-none rounded-lg ${
    disabled ? "" : "hover:bg-highlight hover:text-container"
  } ${clazz}`}
  {disabled}
>
  <slot />
</button>
