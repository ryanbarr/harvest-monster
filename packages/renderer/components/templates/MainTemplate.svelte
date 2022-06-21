<script>
  import { Route } from "svelte-routing";
  import Titlebar from "../organisms/Titlebar.svelte";
  import Navigation from "../organisms/Navigation.svelte";
  import Crafts from "../../pages/Crafts.svelte";
  import SettingsPage from "../../pages/Settings.svelte";
</script>

<div class="bg-background w-full rounded-lg overflow-hidden bg-clip-content">
  <Titlebar />
  <Navigation />
  <div class="pt-20 relative">
    <Route path="/"><Crafts /></Route>
    <Route path="/settings"><SettingsPage /></Route>
  </div>
</div>
