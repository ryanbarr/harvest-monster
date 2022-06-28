<script>
  import { CheckIcon, ChevronDownIcon } from "svelte-feather-icons";
  import { afterUpdate } from "svelte";

  let isOpen = false,
    onChange = () => {},
    options = [],
    selected,
    selectedOption;

  afterUpdate(() => {
    if (options && options.length > 0)
      selectedOption = options.find((o) => o.key === selected) ?? null;
  });

  export { isOpen, onChange, options, selected };
</script>

{#if selectedOption}
  <div class="mt-1 relative">
    <button
      type="button"
      class="relative w-full bg-background rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default sm:text-sm"
      on:click={() => (isOpen = !isOpen)}
    >
      <span class="w-full inline-flex truncate">
        <span class="truncate">{selectedOption.name}</span>
      </span>
      <span
        class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
      >
        <ChevronDownIcon size="1.25x" />
      </span>
    </button>
    {#if isOpen}
      <ul
        class="absolute z-10 mt-1 w-full bg-background shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
        tabindex="-1"
      >
        {#each options as option}
          <li
            class="text-text select-none relative py-2 pl-3 pr-9 hover:bg-container"
            id="listbox-option-0"
            on:click={() => {
              selected = option.key;
              onChange(selected);
              isOpen = false;
            }}
          >
            <div class="flex flex-col">
              <span
                class={`text-base font-bold truncate ${
                  selected === option.key ? "text-highlight" : ""
                }`}>{option.name}</span
              >
              <span
                class={`truncate ${
                  selected === option.key ? "text-highlight" : ""
                }`}>{option.description}</span
              >
            </div>

            {#if selected === option.key}
              <span
                class="text-highlight absolute inset-y-0 right-0 flex items-center pr-4"
              >
                <CheckIcon size="1.5x" />
              </span>
            {/if}
          </li>
        {/each}
      </ul>
    {/if}
  </div>
{/if}
