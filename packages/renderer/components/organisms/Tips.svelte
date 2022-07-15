<script>
  import { RefreshCwIcon, ZapIcon } from "svelte-feather-icons";
  import tips from "../../assets/tips.json";

  const generateIndex = () => {
    return Math.floor(Math.random() * tips.length);
  };

  const newTip = () => {
    const newIndex = generateIndex();
    if (newIndex === tipIndex) {
      newTip();
    } else {
      tipIndex = newIndex;
    }
  };

  $: tipIndex = generateIndex();
</script>

{#if tipIndex !== null}
  <div class="bg-container rounded-lg flex flex-row space-x-2 py-2 px-3 mb-4">
    <div class="font-bold text-highlight uppercase text-xs pt-1"
      ><ZapIcon size="1.5x" /></div
    >
    <p>{tips[tipIndex]}</p>
    <div class="inline-flex items-center min-h-full px-2">
      <button on:click={() => newTip()}
        ><RefreshCwIcon size="1.25x" class="opacity-70" /></button
      >
    </div>
  </div>
{/if}
