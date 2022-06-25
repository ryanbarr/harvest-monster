<script>
  import Toggle from "../atoms/Toggle.svelte";

  let enabled = false;
  export { enabled };
</script>

<div class="flex flex-row items-center space-x-3">
  <Toggle on:click {enabled} />
  <span>
    <slot />
  </span>
</div>
