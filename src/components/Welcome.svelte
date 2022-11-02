<script lang="ts">
  import { state } from "../stores/store";
  import { fade } from "svelte/transition";
  export let invisible: boolean = false;

  const startGame = () => {
    $state = "start";
    invisible = !invisible;
  };
</script>

<div
  class="fixed h-full w-full flex items-center justify-center z-40 pointer-events-none touch-none {invisible
    ? 'invisible'
    : ''}"
  out:fade
>
  <div
    id="login-card"
    class="w-86 h-64 text-center "
  >
    <div class="w-full max-w-md space-y-8 bg-white p-8 border-2 rounded-lg border-slate-500 drop-shadow-2xl">
      <div>
        <img class="mx-auto h-12 w-auto" src="./oc_seal.gif" alt="OC GIS" />
        <h2
          class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900"
        >
          GIS 9 Puzzle
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Pan the map to a desired location and hit play. Arrange the puzzle
          pieces to complete the game
        </p>
      </div>
      <div class="mt-8 space-y-6" action="#" method="POST">
        <div>
          <button
            type="submit"
            on:click={startGame}
            class="pointer-events-auto group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Play
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
