<script lang="ts">
  import {
    adjacentIndexes,
    emptyIndex,
    dimension,
    isSolved,
    showNumbers,
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
  //  gap-0 relative grid grid-rows-3 grid-flow-col
  //class="rounded border-gray-300 dark:border-gray-700 border-dashed border-2 h-60 w-60"
</script>

<div
  class="w-full grid overflow-hidden grid-flow-row grid-cols-3 grid-rows-3 gap-0"
>
  {#each puzzle as value, index (value)}
    <div
      animate:flip={{ duration: 1500 }}
      on:click={() => handleClick(index)}
      on:keydown={() => {
        return;
      }}
      id={`index-${index}`}
      data-index={index}
      data-value={value}
      class="rounded relative h-48 w-48"
    >
      <!-- Value: {value === 0 ? "BLANK" : value}
        Index: {index}
        Row: {Math.floor(index / 3)}
        Movable: {isAdjacent(index)} -->

        <img class="object-cover" src="" alt="" />
        {#if $showNumbers}
        <!-- <span class="absolute top-8 left-8 w-8 h-8 text-white  bg-white-400 border-2 border-black rounded-full">{value}</span> -->
        <span class="absolute text-white left-6 top-6">{value != 0 ? value: ""}</span>
        {/if}

      
    </div>
  {/each}
</div>
