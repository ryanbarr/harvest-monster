<script>
  import H2 from "../atoms/H2.svelte";
  import { closeAllModals } from "svelte-modals";
  import { afterUpdate } from "svelte";
  import { forceResize } from "#preload";

  export let isOpen;

  forceResize();

  afterUpdate(() => {
    setTimeout(() => forceResize(550), 0);
  });
</script>

{#if isOpen}
  <div
    class="relative z-30"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
    on:click={() => {
      closeAllModals();
      forceResize();
    }}
  >
    <div class="fixed z-10 inset-0 overflow-y-auto">
      <div
        class="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0"
      >
        <div
          class="relative bg-container rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all sm:w-3/4 sm:my-8 sm:p-6 space-y-4"
        >
          <H2>Capturing crafts</H2>
          <p class="text-lg"
            >It is recommended that you add your crafts to HarvestMonster as you
            store them in your Horticrafting Station, one-at-a-time.</p
          >
          <p class="text-lg"
            >A good capture includes only the text of the craft you're trying to
            add.</p
          >
          <img
            src="./hm-example.gif"
            alt="HarvestMonster Example"
            class="mx-auto rounded-2xl"
          />
        </div>
      </div>
    </div>
  </div>{/if}
