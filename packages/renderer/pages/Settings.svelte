<script lang="ts">
  import ColorPicker from "../components/molecules/ColorPicker.svelte";
  import Button from "../components/atoms/Button.svelte";
  import Card from "../components/atoms/Card.svelte";
  import Container from "../components/atoms/Container.svelte";
  import H2 from "../components/atoms/H2.svelte";
  import InputGroup from "../components/atoms/InputGroup.svelte";
  import Select from "../components/atoms/Select.svelte";
  import { settings } from "../stores";
  import themes from "../assets/themes";

  let selectedTheme = "standard";
</script>

<div class="py-4 px-8 overflow-y-auto">
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4">
    <Container>
      <H2>User settings</H2>
      <Card />
    </Container>
    <Container>
      <H2>App settings</H2>
      <Card />
    </Container>
    <Container>
      <H2>Discord connection</H2>
      <Card>Test</Card>
    </Container>
    <Container>
      <H2>Theme</H2>
      <Card class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <InputGroup>
          <label for="backgroundColorInput">Background color</label>
          <ColorPicker
            bind:color={$settings.backgroundColor}
            name="backgroundColorInput"
          />
        </InputGroup>
        <InputGroup>
          <label for="containerColorInput">Container color</label>
          <ColorPicker
            bind:color={$settings.containerColor}
            name="containerColorInput"
          />
        </InputGroup>
        <InputGroup>
          <label for="highlightColorInput">Highlight color</label>
          <ColorPicker
            bind:color={$settings.highlightColor}
            name="highlightColorInput"
          />
        </InputGroup>
        <InputGroup>
          <label for="textColorInput">Text color</label>
          <ColorPicker bind:color={$settings.textColor} name="textColorInput" />
        </InputGroup>
        <InputGroup>
          <label for="">Apply theme</label>
          <Select name="theme"
            bind:value={selectedTheme}
            on:change={() => settings.applyTheme(selectedTheme)}>
            {#each themes as theme}
              <option value={theme.id}>{theme.name}</option>
            {/each}
          </Select>
        </InputGroup>
      </Card>
    </Container>
  </div>
</div>
