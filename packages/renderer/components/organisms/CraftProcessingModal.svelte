<script>
  import { afterUpdate, onDestroy, onMount } from "svelte";
  import ProgressBar from "../atoms/ProgressBar.svelte";
  import { closeAllModals } from "svelte-modals";

  let message = "Articulating splines...";
  let progress = 4;
  export let isOpen;

  const handleMessage = (event) => {
    if (!event.isTrusted) return;
    const { data } = event;
    message = data.status.replace("api", "API") + "...";
    if (data.status === "recognizing text") {
      progress = parseInt(data.progress * 100);
    }
  };

  afterUpdate(() => {
    if (progress === 100) {
      setTimeout(closeAllModals, 400);
    }
  });
  onMount(() => {
    window.addEventListener("message", handleMessage);
  });
  onDestroy(() => {
    window.removeEventListener("message", handleMessage);
  });
</script>

{#if isOpen}
  <div
    class="relative z-30"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
    on:click={closeAllModals}
  >
    <div class="fixed z-10 inset-0 overflow-y-auto">
      <div
        class="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0"
      >
        <div
          class="relative bg-container rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-sm sm:w-full sm:p-6"
        >
          <img src="./hm-logo.png" alt="HarvestMonster" class="w-1/4 mx-auto" />
          <div class="mt-3 text-center sm:mt-5 space-y-4">
            <h3
              class="text-lg leading-6 font-medium text-text capital"
              id="modal-title">{message}</h3
            >
            <ProgressBar percent={progress} />
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}
