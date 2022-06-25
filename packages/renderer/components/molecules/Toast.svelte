<script>
  let text = "",
    title = "",
    type = "success",
    clazz = "";

  if (type === "success") {
    clazz = "border-highlight";
  } else if (type === "warning") {
    clazz = "border-yellow-500";
  } else if (type === "error") {
    clazz = "border-red-500";
  }

  export { text, title, type };
</script>

<div class={`border-l-8 px-6 py-4 ${clazz}`}>
  <span class="font-bold">{title}</span><br />
  <span class="text-sm">{text}</span>
</div>
