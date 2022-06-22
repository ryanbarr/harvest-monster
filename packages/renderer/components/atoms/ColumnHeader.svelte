<script>
  import { crafts, settings } from "../../stores";
  import { ChevronDownIcon, ChevronUpIcon } from "svelte-feather-icons";

  let field;
  let clazz = "";

  const handleClick = () => {
    let newDirection = "ascending";

    if (field === $settings.sortColumn) {
      newDirection =
        $settings.sortDirection === "ascending" ? "descending" : "ascending";
    }

    settings.changeSetting("sortColumn", field);
    settings.changeSetting("sortDirection", newDirection);
    settings.save();
    crafts.sort();
    crafts.save();
  };

  $: isActive = $settings.sortColumn === field;
  $: Icon =
    $settings.sortDirection === "ascending" ? ChevronUpIcon : ChevronDownIcon;
  export { field, clazz as class };
</script>

<button
  class={`flex flex-row w-full justify-center items-center ${
    isActive ? "text-highlight" : ""
  } ${clazz}`}
  on:click={handleClick}
  ><slot />
  {#if isActive}<svelte:component
      this={Icon}
      size="1.25x"
      class="ml-1"
    />{/if}</button
>
