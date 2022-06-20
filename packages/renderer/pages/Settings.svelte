<script lang="ts">
  import ColorPicker from "../components/molecules/ColorPicker.svelte";
  import Button from "../components/atoms/Button.svelte";
  import Card from "../components/atoms/Card.svelte";
  import Container from "../components/atoms/Container.svelte";
  import H2 from "../components/atoms/H2.svelte";
  import InputGroup from "../components/atoms/InputGroup.svelte";
  import { settings } from "../stores";
</script>

<div class="p-8">
  <h1>Settings</h1>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
          <label for="backgroundColorInput">Background Color</label>
          <ColorPicker
            bind:color={$settings.backgroundColor}
            name="backgroundColorInput"
          />
        </InputGroup>
        <InputGroup>
          <label for="containerColorInput">Container Color</label>
          <ColorPicker
            bind:color={$settings.containerColor}
            name="containerColorInput"
          />
        </InputGroup>
        <InputGroup>
          <label for="highlightColorInput">Highlight Color</label>
          <ColorPicker
            bind:color={$settings.highlightColor}
            name="highlightColorInput"
          />
        </InputGroup>
        <InputGroup>
          <label for="textColorInput">Text Color</label>
          <ColorPicker bind:color={$settings.textColor} name="textColorInput" />
        </InputGroup>
        <InputGroup>
          <Button on:click={settings.reset}>Reset Colors</Button>
        </InputGroup>
      </Card>
    </Container>
  </div>
</div>
