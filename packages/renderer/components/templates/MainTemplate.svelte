<script>
  import { Route } from "svelte-routing";
  import Titlebar from "../organisms/Titlebar.svelte";
  import Navigation from "../organisms/Navigation.svelte";
  import Crafts from "../../pages/Crafts.svelte";
  import SettingsPage from "../../pages/Settings.svelte";
</script>

<Titlebar />
<Navigation />
<div class="bg-background rounded-b-lg pt-20">
  <Route path="/settings"><SettingsPage /></Route>
  <Route path="/"><Crafts /></Route>
</div>
