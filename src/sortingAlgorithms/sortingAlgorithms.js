/*----------------MergeSort-----------------*/
export function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations, true);
  return animations;
}

function mergeSortHelper(
  mainArray,
  startIdx,
  endIdx,
  auxiliaryArray,
  animations,
  isFinal
) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations, false);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations, false);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations, isFinal);
}

function doMerge(
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  auxiliaryArray,
  animations,
  isFinal
) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  let move = 0;
  while (i <= middleIdx && j <= endIdx) {
    // These are the values that we're comparing; we push them once to change their color.
    if (k > i) {
      animations.push([i + move, j, -1, 1]);
    }
    else {
      animations.push([i, j, -1, 1]);
    }
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      // We overwrite the value at index k in the original array with the value at index i in the auxiliary array.
      if (k > i) {
        animations.push([k, i + move, auxiliaryArray[i], 1]);
      }
      else {
        animations.push([k, i, auxiliaryArray[i], 1]);
      }
      if (isFinal) {
        animations.push([k, j, -1, 2]);
      }
      else {
        animations.push([k, j, -1, 0]);
      }
      mainArray[k++] = auxiliaryArray[i++];
    }
    else {
      move++;
      // We overwrite the value at index k in the original array with the value at index j in the auxiliary array.
      animations.push([k, j, auxiliaryArray[j], 1]);
      if (isFinal) {
        animations.push([k, j, -1, 2]);
      }
      else {
        animations.push([k, j, -1, 0]);
      }
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    // These are the values that we're comparing; we push them once to change their color.
    animations.push([i + move, i + move, -1, 1]);
    // These are the values that we're comparing; we push them a second time to revert their color.
    if (isFinal) {
      animations.push([i + move, i + move, -1, 2]);
    }
    else {
      animations.push([i + move, i + move, -1, 0]);
    }
    // We overwrite the value at index k in the original array with the value at index i in the auxiliary array.
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    // These are the values that we're comparing; we push them once to change their color.
    animations.push([j, j, -1, 1]);
    // These are the values that we're comparing; we push them a second time to revert their color.
    if (isFinal) {
      animations.push([k, j, -1, 2]);
    }
    else {
      animations.push([j, j, -1, 0]);
    }
    // We overwrite the value at index k in the original array with the value at index j in the auxiliary array.
    mainArray[k++] = auxiliaryArray[j++];
  }
}

/*----------------BubbleSort-----------------*/
export function getBubbleSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  doBubbleSort(array.length - 1, array, animations);
  return animations;
}
function swap(array, i, j) {
  let k = array[j];
  array[j] = array[i];
  array[i] = k;
}

function doBubbleSort(idx, mainArray, animations) {

  while (idx > 0) {
    for (let i = 0; i < idx; i++) {
      animations.push([i, i + 1, 1, mainArray[i], mainArray[i + 1]]);
      animations.push([i, i + 1, 2, mainArray[i], mainArray[i + 1]]);
      if (mainArray[i] >= mainArray[i + 1]) {
        animations.push([i, i + 1, 2, mainArray[i + 1], mainArray[i]]);
        animations.push([i, i + 1, 1, mainArray[i + 1], mainArray[i]]);
        swap(mainArray, i, i + 1);
      }
      else {
        animations.push([i, i + 1, 1, mainArray[i], mainArray[i + 1]]);
      }
    }
    animations.push([idx, idx, 3, mainArray[idx], mainArray[idx]]);
    idx--;
  }
  animations.push([idx, idx, 3, mainArray[idx], mainArray[idx]]);
}

/*----------------QuickSort-----------------*/
export function getQuickSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  doQuickSort(array, animations, 0, array.length - 1);
  for (let i = 0; i < array.length; i++) {
    animations.push([i, array[i]]);
  }
  return animations;
}

function doQuickSort(mainArray, animations, left, right) {


  if ((left >= 0) && (right < mainArray.length) && (right - left >= 1)) {
    let i = left;
    let j = right;
    let standard = mainArray[left];
    animations.push([left, left, 0, mainArray[left], mainArray[left]]);
    while (i !== j) {
      if (i !== left) {
        animations.push([i, j, 2, mainArray[i], mainArray[j]]);
      }
      else {
        animations.push([j, j, 2, mainArray[j], mainArray[j]]);
      }
      while ((mainArray[j] >= standard) && (i < j)) {
        animations.push([j, j, 1, mainArray[j], mainArray[j]]);
        j -= 1;
        animations.push([j, j, 2, mainArray[j], mainArray[j]]);
      }
      while ((mainArray[i] <= standard) && (i < j)) {
        if (i !== left) {
          animations.push([i, i, 1, mainArray[i], mainArray[i]]);
        }
        i += 1;
        animations.push([i, i, 2, mainArray[i], mainArray[i]]);
      }
      if (i < j) {
        animations.push([i, j, 2, mainArray[j], mainArray[i]]);
        animations.push([i, j, 1, mainArray[j], mainArray[i]]);
        swap(mainArray, i, j);
      }
    }
    animations.push([left, i, 2, standard, mainArray[i]]);
    animations.push([left, i, 2, mainArray[i], standard]);
    animations.push([left, i, 3, mainArray[i], standard]);
    mainArray[left] = mainArray[i];
    mainArray[i] = standard;
    doQuickSort(mainArray, animations, left, i - 1);
    doQuickSort(mainArray, animations, i + 1, right);

  }
  else {
    animations.push([left, left, 3, mainArray[left], mainArray[left]]);
    return;
  }
}


/*----------------HeapSort-----------------*/
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