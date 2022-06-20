<script>
  import Toggle from "../atoms/Toggle.svelte";

  let enabled = false;
  export { enabled };
</script>

<div class="flex items-center">
  <Toggle on:click {enabled} />
  <span class="ml-2">
    <slot />
  </span>
</div>
