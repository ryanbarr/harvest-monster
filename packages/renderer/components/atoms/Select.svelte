<script>
  let name, value;
  export { name, value };
</script>
<div>
  <label for={name} class="block text-sm font-medium text-text">
    <slot name="label" />
  </label>
  <select bind:value on:change id={name} {name} class="mt-1 block w-full pl-1 py-2 text-base bg-background sm:text-sm rounded-md">
    <slot />
  </select>
</div>