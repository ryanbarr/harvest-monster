<script>
  import { _, locale } from "svelte-i18n";
  import ColorPicker from "../components/molecules/ColorPicker.svelte";
  import Card from "../components/atoms/Card.svelte";
  import Container from "../components/atoms/Container.svelte";
  import H2 from "../components/atoms/H2.svelte";
  import InputGroup from "../components/atoms/InputGroup.svelte";
  import Select from "../components/atoms/Select.svelte";
  import Input from "../components/atoms/Input.svelte";
  import { settings } from "../stores";
  import themes from "../assets/themes";

  let languages = [
    { code: "en", name: "English" }, // English
    { code: "es", name: "Español" }, // Spanish
    { code: "jp", name: "日本" }, // Japanese
    { code: "ko", name: "한국인" }, // Korean
  ];
  let leagues = ["Standard", "Sentinel", "Hardcore Sentinel"];

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
</script>

<div class="py-4 px-8 overflow-y-auto">
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4">
    <Container>
      <H2>{$_("settings_user")}</H2>
      <Card class="space-y-4">
        <InputGroup>
          <label for="poeUsername">{$_("settings_username")}</label>
          <span class="text-xs">{$_("settings_username_desc")}</span>
          <Input
            name="username"
            bind:value={$settings.username}
            on:change={() => settings.save()}
          />
        </InputGroup>
        <InputGroup>
          <label for="poeUsername">{$_("settings_league")}</label>
          <span class="text-xs">{$_("settings_league_desc")}</span>
          <Select
            name="league"
            bind:value={$settings.league}
            on:change={() => settings.save()}
          >
            {#each leagues as league}
              <option>{league}</option>
            {/each}
          </Select>
        </InputGroup>
      </Card>
    </Container>
    <Container>
      <H2>{$_("settings_app")}</H2>
      <Card>
        <InputGroup>
          <label for="poeUsername">{$_("settings_language")}</label>
          <span class="text-xs">{$_("settings_language_desc")}</span>
          <Select
            name="language"
            bind:value={$settings.language}
            on:change={() => {
              locale.set($settings.language);
              settings.save();
            }}
          >
            {#each languages as language}
              <option value={language.code}>{language.name}</option>
            {/each}
          </Select>
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
  </div>
</div>
