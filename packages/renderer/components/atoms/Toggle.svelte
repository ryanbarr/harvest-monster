<script>
  import { CheckIcon, XIcon } from "svelte-feather-icons";
  let enabled = false;
  export { enabled };
</script>

<button
  type="button"
  class={`${
    enabled ? "bg-highlight" : "bg-container"
  } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
  role="switch"
  aria-checked="false"
  on:click
>
  <span class="sr-only">Use setting</span>
  <span
    aria-hidden="true"
    class={`${
      enabled ? "translate-x-5" : "translate-x-0"
    } pointer-events-none inline-block h-5 w-5 rounded-full bg-text text-container shadow transform ring-0 transition ease-in-out duration-200`}
    ><span
      class={`${
        enabled
          ? "opacity-0 ease-out duration-100"
          : "opacity-100 ease-in duration-200"
      } absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`}
      aria-hidden="true"><XIcon size="1x" /></span
    >
    <span
      class={`${
        enabled
          ? "opacity-100 ease-in duration-200"
          : "opacity-0 ease-out duration-100"
      } absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`}
      aria-hidden="true"><CheckIcon size="1x" /></span
    ></span
  >
</button>
