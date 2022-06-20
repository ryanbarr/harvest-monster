<script lang="ts">
  let clazz = "";

  export { clazz as class };
</script>

<div class={`bg-container rounded-lg px-6 py-5 ${clazz}`}>
  <slot />
</div>
