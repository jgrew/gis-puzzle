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
    isSolved,
    finalTime,
    seconds
  } from "./stores/store";
  import { createArray, divToExtent } from "./lib/utils";

  let gameVisible: boolean = false;
  $: cellCount = $dimension * $dimension;
  $: if (!$solvable) {
    $puzzle = createArray(9);
  }

  $: if ($state === "idle") {
    gameVisible = false;
  }

  $: if ($isSolved) {
    $finalTime = $seconds
    $state = "solved";

  }

  $: {
    console.log($puzzle)
  }
  $: {
    console.log($isSolved)
  }

  // listen to start event and generate place tiles into grid
  $: if ($state === "pre") {
    generateTileImages().then((result) => {
      //   console.log(result);
      for (let i = 0; i < cellCount; i++) {
        const gridToIndex = i + 1;
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
    $state = "active";
  }

  // get screenshots of view according to grid cell bounding rect
  const generateTileImages = async () => {
    const promises = [];
    for (let i = 0; i < cellCount; i++) {
      const node = document.querySelector(`#index-${i}`);
      const ext = divToExtent(node as HTMLElement);

      promises.push(
        $view?.takeScreenshot({ area: ext, format: "png", ignorePadding: true })
      );
    }
    const result = await Promise.all(promises);
    return result;
  };

  onMount(() => {
    $width = 5;
  });
</script>

<div class="grid grid-rows-1 grid-cols-1">
  <Welcome open={!gameVisible} />
  <Map blur={gameVisible} />
  <Game invisible={!gameVisible} />
</div>
