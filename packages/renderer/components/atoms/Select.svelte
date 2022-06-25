<script>
  let name, value;
  export { name, value };
</script>

<div>
  <label for={name} class="block text-sm font-medium text-text">
    <slot name="label" />
  </label>
  <select
    bind:value
    on:change
    id={name}
    {name}
    class="border-none mt-1 block w-full pl-3 py-2 pr-10 text-base bg-background sm:text-sm rounded-lg focus:outline focus:ring focus:outline-highlight focus:ring-highlight"
  >
    <slot />
  </select>
</div>
