<script>
  let clazz = "";
  let percent = 0;

  export { percent, clazz as class };
</script>

<div class={`w-full h-2 rounded-full bg-background ${clazz}`}>
  <div
    class="h-full bg-highlight rounded-full transition-all"
    style={`width: ${percent}%`}
  />
</div>
