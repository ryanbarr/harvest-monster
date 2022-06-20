<script>
  let clazz = "",
    disabled = false;
  export { clazz as class, disabled };
</script>

<button
  on:click
  class={`bg-highlight text-container font-bold px-3.5 py-3 leading-none rounded-lg ${clazz}`}
  {disabled}
>
  <slot />
</button>
