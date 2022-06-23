<script>
  import { _, locale } from "svelte-i18n";
  import ColorPicker from "../components/molecules/ColorPicker.svelte";
  import Card from "../components/atoms/Card.svelte";
  import Container from "../components/atoms/Container.svelte";
  import H2 from "../components/atoms/H2.svelte";
  import InputGroup from "../components/atoms/InputGroup.svelte";
  import Select from "../components/atoms/Select.svelte";
  import Input from "../components/atoms/Input.svelte";
  import ExtLink from "../components/atoms/ExtLink.svelte";
  import Toggle from "../components/atoms/Toggle.svelte";
  import { settings } from "../stores";
  import themes from "../assets/themes";
  import { fetchData } from "../utils/fetchData";
  import { get } from "svelte/store";
  import { getAppVersion } from "#preload";
  import { onMount } from "svelte";

  const currentSettings = get(settings);

  let languages = [
    { code: "en", name: "English" }, // English
    { code: "es", name: "Español" }, // Spanish
    { code: "jp", name: "日本" }, // Japanese
    { code: "ko", name: "한국인" }, // Korean
    { code: "pt", name: "Português" }, // Portuguese
    { code: "ru", name: "Русский" }, // Russian
    { code: "zh", name: "简体中文" }, // Chinese Simplified
  ];
  let leagues = [
    { code: "std", name: "Standard" },
    { code: "lsc", name: "Sentinel Softcore" },
    { code: "lhc", name: "Sentinel Hardcore" },
  ];

  const applyTheme = (themeId) => {
    const newTheme = themes.filter((t) => t.id === themeId)[0];
    settings.updateSettings({
      theme: newTheme.id,
      backgroundColor: newTheme.backgroundColor,
      containerColor: newTheme.containerColor,
      highlightColor: newTheme.highlightColor,
      textColor: newTheme.textColor,
    });
  };

  const customTheme = (color, value) => {
    const customTheme = {};
    customTheme[color] = value;
    settings.updateSettings(customTheme);
  };

  let selectedLanguage = currentSettings.language.code;
  $: currentLanguage = languages.find((l) => l.code === selectedLanguage);
  let appVersion = "(Unknown Version)";

  onMount(async () => {
    appVersion = `(v${await getAppVersion()})`;
  });
</script>

<div class="py-4 px-8 overflow-y-auto">
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4">
    <Container>
      <H2>{$_("settings_user")}</H2>
      <Card class="space-y-4">
        <InputGroup>
          <label for="username">{$_("settings_username")}</label>
          <span class="text-xs">{$_("settings_username_desc")}</span>
          <Input
            name="username"
            bind:value={$settings.username}
            on:change={() => settings.save()}
          />
        </InputGroup>
        <InputGroup>
          <label for="league">{$_("settings_league")}</label>
          <span class="text-xs">{$_("settings_league_desc")}</span>
          <Select
            name="league"
            bind:value={$settings.league.code}
            on:change={async () => {
              await fetchData();
              settings.save();
            }}
          >
            {#each leagues as league}
              <option value={league.code}>{league.name}</option>
            {/each}
          </Select>
        </InputGroup>
      </Card>
    </Container>
    <Container>
      <H2>{$_("settings_app")}</H2>
      <Card class="space-y-4">
        <InputGroup>
          <label for="language">{$_("settings_language")}</label>
          <span class="text-xs">{$_("settings_language_desc")}</span>
          <Select
            name="language"
            bind:value={selectedLanguage}
            on:change={() => {
              const lang = locale.set(currentLanguage.code);
              settings.changeSetting("language", currentLanguage);
              settings.save();
            }}
          >
            {#each languages as language}
              <option value={language.code}>{language.name}</option>
            {/each}
          </Select>
        </InputGroup>
        <InputGroup>
          <div class="flex flex-row items-center space-x-8 justify-between">
            <div class="flex flex-col">
              <label for="autoPrices">Auto-update prices</label>
              <span class="text-xs"
                >HarvestMonster will manage your craft prices automatically,
                using the latest prices from The Forbidden Trove.</span
              >
            </div>
            <Toggle
              on:click={async () => {
                settings.changeSetting("autoPrice", !$settings.autoPrice);
                await fetchData();
                settings.save();
              }}
              enabled={$settings.autoPrice}
            />
          </div>
        </InputGroup>
      </Card>
    </Container>
    <Container>
      <H2>{$_("settings_discord")}</H2>
      <Card>Test</Card>
    </Container>
    <Container>
      <H2>{$_("settings_theme")}</H2>
      <Card class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <InputGroup>
          <label for="backgroundColorInput"
            >{$_("settings_background_color")}</label
          >
          <ColorPicker
            bind:color={$settings.backgroundColor}
            on:change={() =>
              customTheme("backgroundColor", $settings.backgroundColor)}
            name="backgroundColorInput"
          />
        </InputGroup>
        <InputGroup>
          <label for="containerColorInput"
            >{$_("settings_container_color")}</label
          >
          <ColorPicker
            bind:color={$settings.containerColor}
            on:change={() =>
              customTheme("containerColor", $settings.containerColor)}
            name="containerColorInput"
          />
        </InputGroup>
        <InputGroup>
          <label for="highlightColorInput"
            >{$_("settings_highlight_color")}</label
          >
          <ColorPicker
            bind:color={$settings.highlightColor}
            on:change={() =>
              customTheme("highlightColor", $settings.highlightColor)}
            name="highlightColorInput"
          />
        </InputGroup>
        <InputGroup>
          <label for="textColorInput">{$_("settings_text_color")}</label>
          <ColorPicker
            bind:color={$settings.textColor}
            on:change={() => customTheme("textColor", $settings.textColor)}
            name="textColorInput"
          />
        </InputGroup>
        <InputGroup>
          <label for="">{$_("settings_apply_theme")}</label>
          <Select
            name="theme"
            bind:value={$settings.theme}
            on:change={() => applyTheme($settings.theme)}
          >
            {#each themes as t}
              <option value={t.id}>{t.name}</option>
            {/each}
          </Select>
        </InputGroup>
      </Card>
    </Container>
    <Container>
      <H2>{$_("settings_credits")}</H2>
      <Card class="space-y-4">
        <p
          >Built by <ExtLink href="https://twitch.tv/spooky">Spooky</ExtLink>,
          designed by <ExtLink href="https://dribbble.com/m0nster"
            >Monster</ExtLink
          >, and tested by <ExtLink href="https://twitch.tv/nb2k">nb2k</ExtLink
          >.</p
        >
        <p
          >Portuguese translations by <ExtLink
            href="https://twitch.tv/little_fabz">little_fabz</ExtLink
          >.</p
        >
        <p
          >Inspired by <ExtLink href="https://github.com/esge/PoE-HarvestVendor"
            >HarvestVendor by Esge</ExtLink
          >
          and
          <ExtLink href="https://github.com/Stregon/PoE-HarvestVendor"
            >HarvestVendor fork by Stregon</ExtLink
          >. Intended for use with <ExtLink href="https://forbiddentrove.com/"
            >The Forbidden Trove</ExtLink
          >'s Discord server.</p
        >
      </Card>
    </Container>
    <Container>
      <Card>
        <p>HarvestMonster {appVersion}</p>
      </Card>
    </Container>
  </div>
</div>
