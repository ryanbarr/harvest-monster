<script>
  import { closeModal } from "svelte-modals";
</script>

<div
  class="w-full h-full fixed bg-background opacity-75 transition-opacity z-30"
  on:click={closeModal}
/>
