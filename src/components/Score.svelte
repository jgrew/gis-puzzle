<script type="ts">
  import {
    moves,
    isSolved,
    finalTime,
    state,
    puzzle,
    tick,
    seconds,
  } from "../stores/store";
  import { Button, P, Span } from "flowbite-svelte";
  // import { createEventDispatcher } from 'svelte';
  // const dispatch = createEventDispatcher();

  const solve = () => {
    if($isSolved) {
      return
    }
    let solve = $puzzle.sort((a, b) => {
      return a - b;
    });
    solve.shift();
    solve.push(0);
    $puzzle = solve;
    $moves = $moves + 1;
  };

  const formatTime = (milliseconds: number) => {
    if (!milliseconds) {
      return
    }
    return new Date(milliseconds).toISOString().slice(11, 19);
    // return Math.floor(milliseconds / 1000);
  };

  const reset = () => {
    // dispatch('state', {
    //   reset: true
    // })
  };
</script>

<div class="grid grid-cols-2 grid-rows-2">
  <div>
    <P size="4xl"><Span weight="bold" class="uppercase">moves</Span> {$moves}</P
    >
    <!-- <span
      class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900"
      >MOVES
    </span>
    <span
      class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900"
      >{$moves}</span
    > -->
  </div>
  <div class="justify-self-end">
    <P size="4xl"
      ><Span weight="bold" class="uppercase"
        >{!$isSolved ? "time" : "final"}</Span
      >
      {!$isSolved ? formatTime($seconds) : formatTime($finalTime)}</P
    >
    <!-- <span
      class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900"
      >TIME
    </span>
    <span
      class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900"
      >{$moves}</span
    > -->
  </div>
  <div>
    <!-- <Button size="xs" pill={true} on:click={()=>{$state = 'idle'}}>Reset</Button> -->
  </div>
  <div class="justify-self-end">
    <Button size="xs" color="yellow" pill={true} on:click={solve}>Solve?</Button
    >
  </div>
</div>
