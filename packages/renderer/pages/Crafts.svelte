<script>
  import CraftList from "../components/organisms/CraftList.svelte";
  import { crafts } from "../stores";
</script>

<div class="p-2 pt-32">
  <CraftList bind:crafts={$crafts} />
</div>
