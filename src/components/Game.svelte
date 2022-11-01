<script lang="ts">
  import { createArray, divToExtent } from "../lib/utils";
  import { onMount } from "svelte";
  import Puzzle from "./Puzzle.svelte";
  import Score from "./Score.svelte";
  import { width, puzzle, solvable, view, dimension } from "../stores/store";
  let invisible: boolean = false;

  $: cellCount = $dimension * $dimension;

  $: $view?.watch("ready", (ready) => {
    // invisible = !invisible
    generateTileImages().then((result) => {
    //   console.log(result);
      for (let i = 0; i < cellCount; i++) {
        const node = document.querySelector(`div[data-value='${i}']`).querySelector("img");
        console.log(result[i])
        // const viewCanvas = document.createElement('canvas')
        // const img = document.createElement('img')
        // img.width = result[i].data.width;
        // img.height = result[i].data.height;
        // img.src = result[i].dataUrl;

        // const context = viewCanvas.getContext('2d')
        // img.onload = () => {
        //     context.drawImage(img, 0, 0);
        // }
        // node.appendChild(context)
        // console.log(node)
        node.width = result[i].data.width;
        node.height = result[i].data.height;
        node.src = result[i].dataUrl;
      }
    });
    // const tileNodes = document.querySelectorAll("[id^='index-']");
    // tileNodes.forEach((node) => {
    //   //   console.log("node", node);
    //   const ext = divToExtent(node as HTMLElement);
    //   //   const area = {
    //   //     x: ext.xmin,
    //   //     y: ext.ymin,
    //   //     width: ext.xmax - ext.xmin,
    //   //     height: ext.ymax - ext.ymin,
    //   //   };
    //   //   console.log(area)
    //   $view
    //     .takeScreenshot({ area: ext, format: "png", ignorePadding: true })
    //     .then((screenshot) => {
    //       const img = node.querySelector("img");
    //       //   console.log("img", img);
    //       img.width = screenshot.data.width;
    //       img.height = screenshot.data.height;
    //       img.src = screenshot.dataUrl;
    //     });
    // });
  });

  const generateTileImages = async () => {
    // const cellCount = $dimension * $dimension;
    const promises = [];
    for (let i = 0; i < cellCount; i++) {
      const node = document.querySelector(`#index-${i}`);
      const ext = divToExtent(node as HTMLElement);
      console.log(ext)
      promises.push(
        $view?.takeScreenshot({ area: ext, format: "png", ignorePadding: true })
      );
    }
    invisible = !invisible
    const result = await Promise.all(promises);
    invisible = !invisible
    return result;
  };

  onMount(() => {
    $width = 5;
  });

  $: if (!$solvable) {
    $puzzle = createArray(9);
  }
</script>

<div class="absolute inset-0 {invisible ? 'invisible' : ''}">
  <div class="flex flex-col justify-center items-center">
    <div class="grid w-full max-w-3xl">
      <div class="grid grid-col p-16">
        <Score/>
      </div>
      <Puzzle puzzle={$puzzle} />
    </div>
  </div>
</div>
