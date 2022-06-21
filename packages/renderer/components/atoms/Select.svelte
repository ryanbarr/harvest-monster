<script>
  let name, value;
  export { name, value };
</script>
<div>
  <label for={name} class="block text-sm font-medium text-gray-700">
    <slot name="label" />
  </label>
  <select bind:value on:change id={name} {name} class="mt-1 block w-full pl-1 py-2 text-base bg-container border border-background sm:text-sm rounded-md">
    <slot />
  </select>
</div>