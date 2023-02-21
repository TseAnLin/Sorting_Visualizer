// --------------------------------- BubbleSort ---------------------------------
export function getBubbleSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  let len = array.length;
  while (len > 1) {
    len--;
    for (let j = 0; j < len; j++) {
      animations.push([j, j]);
      animations.push([j, j]);
      if (array[j] > array[j + 1]) {
        animations.push([j, array[j + 1]]);
        animations.push([j + 1, array[j]]);
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
      }
      else {
        animations.push([j, array[j]]);
        animations.push([j + 1, array[j + 1]]);
      }
    }
  }
  return animations;
}
// --------------------------------- HeapSort ---------------------------------
function heapify(animations, array, i, length) {
  let left = i * 2 + 1;
  let right = i * 2 + 2;
  let largest;
  if (left <= length - 1 && array[left] >= array[i]) {
    animations.push([i, left]);
    animations.push([i, left]);
    largest = left;
  }
  else {
    animations.push([i, i]);
    animations.push([i, i]);
    largest = i;
  }
  if (right <= length - 1 && array[largest] < array[right]) {
    animations.pop();
    animations.pop();
    animations.push([i, right]);
    animations.push([i, right]);
    largest = right;
  }
  if (largest !== i) {
    [array[i], array[largest]] = [array[largest], array[i]];
    animations.push([i, array[i], largest, array[largest], 0]);
    heapify(animations, array, largest, length);
  } else {
    animations.pop();
    animations.pop();
    //animations.push([i, array[i], i, array[i], 0]);
  }
}

function createMaxHeap(animations, array, length) {
  for (let i = Math.floor((length - 1) / 2); i >= 0; i--) {
    heapify(animations, array, i, length);
  }
}

function heapSort(animations, array, length) {
  for (let i = (length - 1); i >= 0; i--) {
    [array[0], array[i]] = [array[i], array[0]];
    animations.push([0, i]);
    animations.push([0, i]);
    animations.push([0, array[0], i, array[i], 1]);
    if (i === 0) break;
    heapify(animations, array, 0, i);
  }
}

export function getHeapSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  // MaxHeap
  createMaxHeap(animations, array, array.length);
  // Heap Sort
  heapSort(animations, array, array.length);

  return animations;
}

// --------------------------------- MergeSort ---------------------------------
export function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);

  return animations;
}

function mergeSortHelper(
  mainArray,
  startIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);

  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);

}

function doMerge(
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  //console.log(auxiliaryArray)
  while (i <= middleIdx && j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, j]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, i]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, i]);
    // We overwrite the value at index k in the original array with the
    // value at index i in the auxiliary array.
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([j, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([j, j]);
    // We overwrite the value at index k in the original array with the
    // value at index j in the auxiliary array.
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}

// --------------------------------- InsertionSort ---------------------------------
export function getInsertionSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;

  for (let i = 0; i < array.length; i++) {
    animations.push([i, i, 0]);
    animations.push([i, i, 0]);
    animations.push([i, array[i]]);
    let key = array[i];
    let j = i - 1;
    //let shift = array[j];
    while (key < array[j] && j >= 0) {
      array[j + 1] = array[j];
      array[j] = 0;
      if (j === i - 1) {
        animations.pop();
        //animations.push([j + 1, array[j + 1]]);
        animations.push([j + 1, 0]);
      }

      animations.push([j, j, 1]);
      animations.push([j, j, 1]);
      animations.push([j, array[j], j + 1, array[j + 1]]);
      j--;
    }
    array[j + 1] = key;
    if (j + 1 !== i) {
      animations.push([j + 1, j + 1]);
      animations.push([j + 1, j + 1]);
      animations.push([j + 1, key]);
    }
  }
  return animations;
}
