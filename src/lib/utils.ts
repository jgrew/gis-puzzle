import { shuffle } from "lodash";
import { get } from "svelte/store";
import { dimension, emptyIndex, puzzle, moves, view } from "../stores/store";
import Point from "@arcgis/core/geometry/Point";
import Extent from "@arcgis/core/geometry/Extent";

export const createArray = (num: number) => {
  return shuffle(Array.from({ length: num }, (v, i) => i));
};

export const isAdjacent = (gridIndex: number) => {
  const index = get(emptyIndex);
  const dim = get(dimension);

  const cell = gridIndex + 1;
  const column = Math.ceil(cell / dim);
  const row = cell - (column - 1) * dim;

  let left = gridIndex - dim === index && column !== 1;
  let right = gridIndex + dim === index && column !== dim;
  let up = gridIndex - 1 === index && row !== 1;
  let down = gridIndex + 1 === index && row !== dim;

  return left || right || up || down;
};

export const swapIndex = (from: number, to: number) => {
  let arr = get(puzzle);
  arr[from] = arr.splice(to, 1, arr[from])[0];
  puzzle.set(arr);
  moves.update((moves) => moves + 1);
};

export const divToExtent = (element: HTMLElement) => {
  let mapView = get(view);

  const rect = element.getBoundingClientRect();
//   console.log(rect);
//   console.log("Lower Left - x: " + rect.left, " y: ", rect.bottom);
//   console.log("Upper Right - x: ", rect.right, " y: ", rect.y);

  //   const pointt = new Point([rect.x, rect.y - rect.height])

  const lowerLeft = mapView.toMap({
    x: rect.x,
    y: rect.y + rect.height,
  });

  const upperRight = mapView.toMap({
    x: rect.x + rect.width,
    y: rect.y,
  });
    // console.log(lowerLeft, upperRight);
  const ext = new Extent({
    xmin: lowerLeft.x,
    ymin: lowerLeft.y,
    xmax: upperRight.x,
    ymax: upperRight.y,
    spatialReference: {
      wkid: 4326,
    },
  });
  
  const area = {
    x: rect.x,
    y: rect.bottom,
    width: rect.width,
    height: rect.height
  }
  return area
};



// export const move = (gridIndex: number) => {
//     let toIndex = get(emptyIndex)
//     if(!isAdjacent(gridIndex)) {
//         return
//     }
//     const arrIndex = gridIndex - 1
//     swapIndex(arrIndex, toIndex)
//     moves.update((moves)=> moves + 1)
// }

// const createPuzzle = (arr: number[]) => {
//   const shuffled = shuffle(arr);
// };
