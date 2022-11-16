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
    seconds,
    size
  } from "./stores/store";
  import { createArray, divToExtent } from "./lib/utils";


  let gameVisible: boolean = false;
  $: cellCount = $dimension * $dimension;
  $: if (!$solvable) {
    $puzzle = createArray($size);
  }

  $: {
    $puzzle = createArray($size);
  }

  $: if ($state === "idle") {
    gameVisible = false;
  }

  $: if ($isSolved) {
    $finalTime = $seconds;
    $state = "solved";
  }


  // listen to start event and generate place tiles into grid
  $: if ($state === "pre") {
    // console.log($size);
    
    generateTileImages().then((result) => {
      // console.log(result)
      for (let i = 0; i < $size; i++) {
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
    await new Promise(r => setTimeout(r, 2000));
    const promises = [];
    for (let i = 0; i < $size; i++) {
      const node = document.querySelector(`#index-${i}`);
      const ext = divToExtent(node as HTMLElement);

      promises.push(
        $view?.takeScreenshot({ area: ext, format: "png", ignorePadding: true })
      );
    }
    // console.log(promises)
    const result = await Promise.all(promises);
    return result;
  };

  onMount(() => {
    // $width = 3;
    $puzzle = createArray($size);
  });
</script>

<div class="grid grid-rows-1 grid-cols-1">
  <Welcome open={!gameVisible} />
  <Map blur={gameVisible} />
  <Game invisible={!gameVisible} />
</div>
