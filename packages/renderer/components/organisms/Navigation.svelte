<script>
  import Link from "../atoms/Link.svelte";
  import PrimaryButton from "../atoms/PrimaryButton.svelte";
  import LabeledToggle from "../molecules/LabeledToggle.svelte";
  import { ServerIcon, SettingsIcon } from "svelte-feather-icons";

  let autoList = false;
  function handleAutoListToggle() {
    autoList = !autoList;
  }

  const getProps = () => {};
</script>

<div
  class="flex flex-row justify-between items-center p-2 space-x-6 fixed w-full bg-background z-10 mt-8"
>
  <div class="pl-2">
    <img src="./hm-logo.png" alt="HarvestMonster" class="w-10" />
  </div>
  <nav
    class="flex flex-row justify-end items-center space-x-4 pt-1 leading-[0]"
  >
    <Link to="/" {getProps} class="border-l-4">
      <span class="inline-flex items-center">
        <ServerIcon size="1.25x" class="mr-2" /> Crafts
      </span>
    </Link>
    <Link to="/settings">
      <span class="inline-flex items-center">
        <SettingsIcon size="1.25x" class="mr-2" /> Settings
      </span>
    </Link>
  </nav>
  <div class="grow">
    <div class="flex flex-row justify-end space-x-6">
      <LabeledToggle on:click={handleAutoListToggle} enabled={autoList}>
        Autolist
      </LabeledToggle>
      <PrimaryButton>Copy to clipboard</PrimaryButton>
    </div>
  </div>
</div>
