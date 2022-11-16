<script lang="ts">
  import {
    emptyIndex,
    showNumbers,
    size,
    blackAndWhite,
  } from "../stores/store";
  import { isAdjacent, swapIndex } from "../lib/utils";
  import { flip } from "svelte/animate";
  import { fade } from "svelte/transition";

  export let puzzle: number[] = [];
  export let handleClick = (index) => {
    if (!isAdjacent(index)) {
      return;
    }
    swapIndex(index, $emptyIndex);
  };
  $: containerClass = (): string => {
    const css = ["w-full grid overflow-hidden grid-flow-row gap-0"];
    if ($size == 16) {
      css.push("grid-cols-4 grid-rows-4");
    } else {
      css.push("grid-cols-3 grid-rows-3");
    }
    return css.join(" ").trim();
  };

  $: imageClass = (): string => {
    const css = ["object-cover"];
    if ($blackAndWhite) {
      css.push("grayscale");
    }
    return css.join(" ").trim();
  };

  $: numberClass = (value: number): string => {
    const css = [];
    if (value != 0) {
      css.push(
        "absolute text-sm text-center align-middle text-white left-6 top-6 h-6 w-6 bg-black border-2 border-white rounded-full"
      );
    }
    return css.join(" ").trim();
  };
  //  gap-0 relative grid grid-rows-3 grid-flow-col
  //class="w-full grid overflow-hidden grid-flow-row grid-cols-3 grid-rows-3 gap-0"
</script>

<div class={containerClass()}>
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

      <img class={imageClass()} src="" alt="" />
      {#if $showNumbers}
        <span class={numberClass(value)}>{value != 0 ? value : ""}</span>
      {/if}
    </div>
  {/each}
</div>
