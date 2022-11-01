<script lang="ts">
  import WebMap from "@arcgis/core/WebMap";
  import MapView from "@arcgis/core/views/MapView";
  import { onMount } from "svelte";
  import { view } from "../stores/store";

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

<div class="viewDiv absolute inset-0" bind:this={container} />

<style>
  .viewDiv {
    height: 100%;
    width: 100%;
  }
</style>
