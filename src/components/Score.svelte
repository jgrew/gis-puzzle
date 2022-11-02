<script type="ts">
  import { moves, isSolved, showNumbers, puzzle } from "../stores/store";
  import { fade } from "svelte/transition";

  const solve = () => {
    let solve = $puzzle.sort((a, b) => {
      return a - b;
    });
    solve.shift()
    solve.push(0)
    $puzzle = solve
    $moves = $moves + 1
  };
</script>

<div class="grid grid-cols-2 grid-rows-2">
  <div>
    <span
      class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900"
      >MOVES
    </span>
    <span
      class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900"
      >{$moves}</span
    >
  </div>
  <div class="justify-self-end">
    <span
      class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900"
      >TIME
    </span>
    <span
      class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900"
      >{$moves}</span
    >
  </div>
  <div>
    <label>
      <input type="checkbox" bind:checked={$showNumbers} />
      Show Numbers?
    </label>
    <!-- <input on:click={()=>{return}}type="checkbox" class="form-checkbox h-5 w-5 text-gray-600" checked={$showNumbers}><span class="ml-2 text-gray-700">Show Numbers?</span> -->
  </div>
  <div class="justify-self-end">
    <label>
      <button on:click={solve}> Solve </button>
    </label>
  </div>
</div>
