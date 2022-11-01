<script type="ts">
  import { emptyIndex } from "../stores/store";
  import { isAdjacent, swapIndex } from "../lib/utils";
  import { flip } from "svelte/animate";

  export let index;
  export let value;


  let handleClick = (index) => {
    if (!isAdjacent(index)) {
      return;
    }
    swapIndex(index, $emptyIndex);
  };
</script>

<div
  
  on:click={() => handleClick(index)}
  on:keydown={() => {
    return;
  }}
  id={`index-${index}`}
  data-index={index}
  data-value={value}
  class="rounded border-gray-300 dark:border-gray-700 border-dashed border-2 h-60 w-60"
>
  Value: {value === 0 ? "BLANK" : value}
  Index: {index}
  Row: {Math.floor(index / 3)}
  Movable: {isAdjacent(index)}
  <img src="" alt="map tile" />
</div>
