<script>
  let clazz, href;

  export { clazz as class, href };
</script>

<a
  {href}
  target="_blank"
  class={`text-highlight hover:text-text underline ${clazz}`}><slot /></a
>
