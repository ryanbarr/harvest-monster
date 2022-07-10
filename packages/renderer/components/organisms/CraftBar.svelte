<script>
  import { _ } from "svelte-i18n";
  import PrimaryButton from "../atoms/PrimaryButton.svelte";
  import ExtLink from "../atoms/ExtLink.svelte";
  import { copyPost } from "#preload";
  import { formatPost } from "../../utils/formatPost";
  import { getInventory } from "../../utils/getInventory";
  import { crafts, exaltToChaosRate, settings } from "../../stores";
  import { onDestroy } from "svelte";
  import { success } from "../../utils/toast";

  let inventory = getInventory($crafts);

  const unsubscribe = crafts.subscribe(async () => {
    inventory = getInventory($crafts);
  });

  const discordLinks = {
    std: "discord://discord.com/channels/645607528297922560/991700380297740448",
    lsc: "discord://discord.com/channels/645607528297922560/991699524357718036",
    lhc: "discord://discord.com/channels/645607528297922560/832324221673013259",
  };

  let channelLink = discordLinks["lsc"];

  settings.subscribe((currentSettings) => {
    channelLink =
      discordLinks[currentSettings?.league?.code] ?? discordLinks["lsc"];
  });

  onDestroy(unsubscribe);
</script>

{#await crafts}
  Loading...
{:then}
  <div
    class="flex flex-row justify-between items-center px-2 py-4 space-x-6 fixed w-full bg-background z-10 mt-16"
  >
    <div>
      <span class="bg-container rounded py-2 px-4 ml-2 text-sm"
        >{inventory.count}
        {$_("nav_crafts").toLowerCase()} | {inventory.exalt}ex {inventory.chaos}c</span
      >
      {#if $exaltToChaosRate > 1}
        <span class="text-xs">{$exaltToChaosRate}c:1ex</span>
      {/if}</div
    >
    <div class="grow">
      <div class="flex flex-row justify-end space-x-2">
        <ExtLink
          class="bg-highlight text-container px-3.5 py-3 leading-none rounded-lg cursor-pointer"
          href={channelLink}
          ><span class="text-container text-base"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              fill="currentColor"
              viewBox="0 0 30 23"
              class="display:flex;"
            >
              <path
                fill="currentColor"
                d="M24.929 1.899a.063.063 0 0 0-.04-.034A24.201 24.201 0 0 0 18.906.002a.09.09 0 0 0-.097.044 16.626 16.626 0 0 0-.744 1.536 22.23 22.23 0 0 0-6.72 0 15.771 15.771 0 0 0-.758-1.536.091.091 0 0 0-.096-.044 24.13 24.13 0 0 0-5.986 1.863.083.083 0 0 0-.04.034C.653 7.61-.391 13.187.123 18.692a.093.093 0 0 0 .04.068 24.324 24.324 0 0 0 7.342 3.724c.039.01.078 0 .104-.034a17.456 17.456 0 0 0 1.501-2.453.093.093 0 0 0-.042-.126 15.902 15.902 0 0 1-2.305-1.103.094.094 0 0 1-.033-.128.077.077 0 0 1 .023-.027c.154-.115.308-.235.457-.358a.094.094 0 0 1 .094-.014c4.813 2.204 10.023 2.204 14.776 0a.093.093 0 0 1 .096.01c.146.121.3.245.457.36a.096.096 0 0 1-.008.157c-.733.43-1.5.797-2.294 1.095a.093.093 0 0 0-.055.12c0 .003.003.006.005.011a19.9 19.9 0 0 0 1.501 2.45c.024.034.065.047.105.034a24.331 24.331 0 0 0 7.355-3.723.101.101 0 0 0 .039-.068c.613-6.365-1.026-11.893-4.348-16.793l-.003.005ZM9.824 15.34c-1.448 0-2.641-1.334-2.641-2.974 0-1.64 1.169-2.974 2.641-2.974s2.665 1.347 2.642 2.974c0 1.64-1.172 2.974-2.642 2.974Zm9.77 0c-1.449 0-2.642-1.334-2.642-2.974 0-1.64 1.17-2.974 2.642-2.974s2.665 1.347 2.641 2.974c0 1.64-1.159 2.974-2.641 2.974Z"
              />
            </svg></span
          ></ExtLink
        >
        <PrimaryButton
          on:click={() => {
            success({
              title: "Copied to clipboard!",
              text: "Paste your clipboard contents in the appropriate TFT channel.",
            });
            copyPost(formatPost());
            if ($settings?.openDiscordOnCopy) {
              window.open(channelLink, "_blank");
            }
          }}>{$_("nav_copy")}</PrimaryButton
        >
      </div>
    </div>
  </div>
{/await}
