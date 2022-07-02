<script>
  import { onDestroy, onMount } from "svelte";
  let onSelect,
    selected = -1,
    suggestions;

  const clickOutside = (node) => {
    const handleClick = (event) => {
      if (node && !node.contains(event.target) && !event.defaultPrevented) {
        node.dispatchEvent(new CustomEvent("clickoutside", node));
      }
    };

    document.addEventListener("click", handleClick, true);

    return {
      destroy() {
        document.removeEventListener("click", handleClick, true);
      },
    };
  };

  const handleKeydown = (e) => {
    if (suggestions && suggestions.length > 0) {
      if (e?.key === "ArrowDown") {
        if (selected !== suggestions.length - 1) {
          selected++;
        }
      } else if (e?.key === "ArrowUp") {
        e.preventDefault();
        if (selected !== 0) {
          selected--;
        }
      } else if (e?.key === "Enter" && selected !== -1) {
        onSelect(suggestions[selected]);
        selected = -1;
      }
    }
  };

  onMount(() => {
    selected = -1;
    document.addEventListener("keydown", handleKeydown, true);
  });

  onDestroy(() => {
    selected = -1;
    document.removeEventListener("keydown", handleKeydown, true);
  });

  export { onSelect, suggestions };
</script>

{#if suggestions && suggestions.length > 0}
  <div
    class="absolute left-0 top-8 z-10 bg-container rounded-lg w-full border border-text flex flex-col divide-y"
    id="autocomplete"
    use:clickOutside
    on:clickoutside
    tabindex="-1"
  >
    {#each suggestions as suggestion, i}
      <button
        on:click={() => onSelect(suggestion)}
        class={`w-full text-left px-4 py-2 hover:bg-background first:rounded-t-lg last:rounded-b-lg ${
          selected === i ? "bg-background" : ""
        }`}
        tabindex="-1">{suggestion}</button
      >
    {/each}</div
  >
{/if}
