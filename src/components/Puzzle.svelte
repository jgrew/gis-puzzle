<script lang="ts">
  import {
    adjacentIndexes,
    emptyIndex,
    dimension,
    isSolved,
  } from "../stores/store";
  import { isAdjacent, swapIndex } from "../lib/utils";
  import { flip } from "svelte/animate";
  

  export let puzzle: number[] = [];
  export let handleClick = (index) => {
    if (!isAdjacent(index)) {
      return;
    }
    swapIndex(index, $emptyIndex);
  };

  $: {
    // console.log($adjacentIndexes);
    // console.log(puzzle);
    // console.log($dimension);
    // console.log($emptyIndex);
    // console.log($isSolved);
  }
</script>


  <div
    class="w-full container relative grid grid-rows-3 grid-flow-col gap-2 bg-slate-200 border-4"
  >
    {#each puzzle as value, index (value)}       
      <div
        animate:flip={{ duration: 2000 }}
        on:click={() => handleClick(index)}
        on:keydown={() => {
          return;
        }}
        id={`index-${index}`}
        data-index={index}
        data-value={value}
        class="rounded border-gray-300 dark:border-gray-700 border-dashed border-2 h-60 w-60"
      >
        <!-- Value: {value === 0 ? "BLANK" : value}
        Index: {index}
        Row: {Math.floor(index / 3)}
        Movable: {isAdjacent(index)} -->
        <img class="object-cover" src="" alt="map tile"/>
      </div>
    {/each}
  </div>

