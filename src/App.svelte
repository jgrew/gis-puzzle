<script lang="ts">
  import Map from "./components/Map.svelte";
  import Game from "./components/Game.svelte";
  import Welcome from "./components/Welcome.svelte";
  import { onMount } from "svelte";
  import {
    width,
    puzzle,
    solvable,
    state,
    dimension,
    view,
    isSolved
  } from "./stores/store";
  import { createArray, divToExtent } from "./lib/utils";

  let gameVisible: boolean = false;
  $: cellCount = $dimension * $dimension;
  $: if (!$solvable) {
    $puzzle = createArray(9);
  }

  $: {
    console.log($puzzle)
  }
  $: {
    console.log($isSolved)
  }

  $: if ($state === "start") {
    generateTileImages().then((result) => {
      //   console.log(result);
      for (let i = 0; i < cellCount; i++) {
        const gridToIndex = i + 1
        const node = document
          .querySelector(`div[data-value='${gridToIndex}']`)
          .querySelector("img");
        // console.log(result[i])
        node.width = result[i].data.width;
        node.height = result[i].data.height;
        node.src = result[i].dataUrl;
      }
    });

    gameVisible = !gameVisible;
  }

  const generateTileImages = async () => {
    // const cellCount = $dimension * $dimension;
    const promises = [];
    for (let i = 0; i < cellCount; i++) {
      const node = document.querySelector(`#index-${i}`);
      const ext = divToExtent(node as HTMLElement);
      // console.log(ext);
      promises.push(
        $view?.takeScreenshot({ area: ext, format: "png", ignorePadding: true })
      );
    }
    // invisible = !invisible
    const result = await Promise.all(promises);
    // invisible = !invisible
    return result;
  };

  onMount(() => {
    $width = 5;
  });
</script>

<div class="grid grid-rows-1 grid-cols-1">
  <Welcome />
  <Map invisible={gameVisible}/>
  <Game invisible={!gameVisible} />
</div>
