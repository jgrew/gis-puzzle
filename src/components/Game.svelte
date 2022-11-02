<script lang="ts">
  import Puzzle from "./Puzzle.svelte";
  import Score from "./Score.svelte";
  import { puzzle } from "../stores/store";
  export let invisible: boolean = true;
</script>

<div
  class="absolute inset-0 {invisible
    ? 'invisible'
    : ''} transition-opacity ease-in duration-2000 opacity-100"
>
  <div class="h-full flex flex-col justify-center items-center">
    <div class="grid border-2 rounded-lg border-slate-500 drop-shadow-2xl">
      <div class="grid grid-col px-6">
        <Score />
      </div>
      <Puzzle puzzle={$puzzle} />
    </div>
  </div>
</div>
