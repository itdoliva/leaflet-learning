<script lang="ts">
  import { browser } from '$app/environment';
  import Map from "./Map.svelte"
</script>

<svelte:head>
  <!-- Disable unwanted scaling of the page and set it to its actual size by placing the following line in the head section or our HTML page -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
</svelte:head>

{#if browser}
  <Map />
{/if}

