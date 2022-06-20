<script>
  let clazz = "";
  export { clazz as class };
</script>

<button
  on:click
  class={`bg-container px-4 py-2 leading-none rounded-lg ${clazz}`}
  ><slot /></button
>
