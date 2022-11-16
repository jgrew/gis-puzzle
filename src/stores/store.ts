import { writable, derived, get } from "svelte/store";
import type { Writable, Readable } from "svelte/store";
import MapView from "@arcgis/core/Map";

export type State = 'idle' | 'pre' | 'active' | 'paused' | 'solved'

export const view: Writable<__esri.MapView> = writable(undefined);
export const paused: Writable<boolean> = writable(false);
export const moves: Writable<number> = writable(0);
export const size: Writable<number> = writable(9);
export const puzzle: Writable<number[]> = writable([]);
// export const width: Writable<number> = writable(0);
export const state: Writable<State> = writable("idle");
export const showNumbers: Writable<boolean> = writable(false);
export const initialTime: Writable<number> = writable(Date.now())
export const finalTime: Writable<number> = writable(0)

export const width: Readable<number> = derived(size, (size)=>{
  return size == 16 ? 4 : 3
})

export const tick: Readable<number> = derived(state, (state, set) => {
  const interval = setInterval(()=>{
    set(Date.now())
  }, 1000)

  return ()=>{
    clearInterval(interval)
  }
})

export const seconds: Readable<number> = derived([state, tick, initialTime], (dependencies)=>{
  let state = dependencies[0]
  let tick = dependencies[1]
  let initTime = dependencies[2]
  if (state === 'idle' || state === 'pre') {
    return 0
  }
  if (state === 'active') {
    return tick - initTime
  } 

})

export const widthEven: Readable<boolean> = derived(width, (width) => {
  return width % 2 === 0;
});

export const blankRowEven: Readable<boolean> = derived(
  [width, puzzle],
  (dependencies) => {
    let width = dependencies[0];
    let puzzle = dependencies[1];
    let rowCount = 0;
    let blankRow = 0;
    for (let i = 0; i < puzzle.length; i++) {
      if (i % width == 0) {
        rowCount++;
      }
      if (puzzle[i] == 0) {
        blankRow = rowCount;
        continue;
      }
    }
    return blankRow % 2 == 0;
  }
);

export const evenInversions: Readable<boolean> = derived(puzzle, (puzzle) => {
  let inversions = 0;
  for (let i = 0; i < puzzle.length; i++) {
    for (let j = i + 1; j < puzzle.length; j++) {
      if (puzzle[i] > puzzle[j] && puzzle[j] != 0) inversions++;
    }
  }
  return inversions % 2 === 0;
});

export const solvable: Readable<boolean> = derived(
  [widthEven, blankRowEven, evenInversions],
  (dependencies) => {
    let isSolvable: boolean = false;
    let widthEven = dependencies[0];
    let blankRowEven = dependencies[1];
    let evenInversions = dependencies[2];

    if (
      (!widthEven && evenInversions) ||
      (widthEven && blankRowEven && !evenInversions) ||
      (widthEven && !blankRowEven && evenInversions)
    ) {
      isSolvable = true;
    }

    return isSolvable;
  }
);

export const isSolved: Readable<boolean> = derived(puzzle, (puzzle) => {
  // let puzzleTest = [...puzzle];
  // let zeroIndex = puzzleTest.indexOf(0);
  // puzzleTest.unshift(puzzleTest.splice(zeroIndex, 1)[0]);
  for (let i = 0; i < puzzle.length - 1; i++) {
    if (puzzle[i] !== i + 1) {
      return false;
    }
  }
  return true;
});

// assume square
export const dimension: Readable<number> = derived(
  [puzzle, width],
  (dependencies) => {
    return Math.ceil(dependencies[0].length / dependencies[1]);
  }
);

// Array index position of zero
export const emptyIndex: Readable<number> = derived(puzzle, (puzzle) => {
  return puzzle.indexOf(0);
});

// Array index positions relating to adjacent game grid cells
// export const adjacentIndexes: Readable<number[]> = derived(
//   [emptyIndex, dimension, puzzle],
//   (dependencies) => {
//     let puzzle = dependencies[2];
//     let emptyIndex = dependencies[0];
//     let dimension = dependencies[1];

//     let rightIndex = puzzle.length == emptyIndex + 1 ? null : emptyIndex + 1;
//     let leftIndex = emptyIndex == 0 ? null : emptyIndex - 1;
//     let aboveIndex = emptyIndex - dimension < 0 ? null : emptyIndex - dimension;
//     let belowIndex =
//       emptyIndex + dimension > puzzle.length ? null : emptyIndex + dimension;

//     return [rightIndex, leftIndex, aboveIndex, belowIndex];
//   }
// );
