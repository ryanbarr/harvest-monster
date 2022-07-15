<script>
  import { ZapIcon } from "svelte-feather-icons";
  import tips from "../../assets/tips.json";
  $: tipIndex = Math.floor(Math.random() * tips.length);
</script>

{#if tipIndex !== null}
  <div class="bg-container rounded-lg flex flex-row space-x-2 py-2 px-3 mb-4">
    <div class="font-bold text-highlight uppercase text-xs pt-1"
      ><ZapIcon size="1.5x" /></div
    >
    <p>{tips[tipIndex]}</p>
  </div>
{/if}
