<script lang="ts">
  import WebMap from "@arcgis/core/WebMap";
  import MapView from "@arcgis/core/views/MapView";
  import { onMount } from "svelte";
  import { view } from "../stores/store";
  import { fade } from "svelte/transition";
  import { cubicOut } from "svelte/easing";

  export let invisible: boolean = false;
  let container: HTMLDivElement;

  onMount(() => {
    const map = new WebMap({
      basemap: "satellite",
    });

    $view = new MapView({
      container,
      map,
      center: [-118.805, 34.027],
      zoom: 13,
    });
  });
</script>

{#if !invisible}
  <div
    class="viewDiv absolute inset-0 {invisible ? 'invisible' : ''}"
    bind:this={container}
    transition:fade={{ duration: 2000, easing: cubicOut }}
  />
{/if}

<style>
  .viewDiv {
    height: 100%;
    width: 100%;
  }
</style>
