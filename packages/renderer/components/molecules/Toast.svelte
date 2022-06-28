<script>
  import { toast } from "@zerodevx/svelte-toast";

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

<div class={`border-l-8 px-6 py-4 ${clazz}`} on:click={() => toast.pop(0)}>
  <span class="font-bold">{title}</span><br />
  <span class="text-sm">{text}</span>
</div>
