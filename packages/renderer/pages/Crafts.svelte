<script>
  import CraftList from "../components/organisms/CraftList.svelte";
  import { crafts } from "../stores";
</script>

<div class="p-2">
  <CraftList bind:crafts={$crafts} />
</div>
