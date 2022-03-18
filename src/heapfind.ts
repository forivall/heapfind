export { heapfind as default, heapfind, sift };

/**
 * Returns the value of the first of the heap for an array where predicate is true, and undefined
 * otherwise. This is more efficient than a sort then find, as it doesnt require
 * sorting the entire contents of the array.
 * @param predicate find calls predicate once for each element of the array, in ascending
 * order, until it finds one where predicate returns true. If such an element is found, find
 * immediately returns that element value. Otherwise, find returns undefined.
 * @param thisArg If provided, it will be used as the this value for each invocation of
 * predicate. If it is not provided, undefined is used instead.
 */
function heapfind<T, S extends T>(
  arr: readonly T[],
  comparator: (a: T, b: T) => number,
  predicate: (value: T) => value is S
): S | undefined;
function heapfind<T>(
  arr: readonly T[],
  comparator: (a: T, b: T) => number,
  predicate: (value: T) => unknown
): T | undefined;
function heapfind<T>(
  arr: readonly T[],
  comparator: (a: T, b: T) => number,
  predicate: (value: T) => unknown
) {
  if (arr.length === 0) return;
  // heapify
  const heap = [...arr];
  // eslint-disable-next-line no-bitwise
  for (let i = heap.length >> 1; i >= 0; --i) {
    sift(comparator, heap, i);
  }
  // filter and sift until found
  let lastValue = heap.pop();
  while (heap.length > 0) {
    const value = heap[0];
    if (predicate(value)) return value;
    heap[0] = lastValue!;
    sift(comparator, heap, 0);

    lastValue = heap.pop();
  }
  if (predicate(lastValue!)) return lastValue;
}

// adapted from mnemoist
function sift<T>(compare: (a: T, b: T) => number, heap: T[], i: number) {
  const endIndex = heap.length;
  const startIndex = i;
  const item = heap[i];

  // siftUp
  let childIndex = 2 * i + 1;
  let rightIndex: number;

  while (childIndex < endIndex) {
    rightIndex = childIndex + 1;

    if (
      rightIndex < endIndex &&
      compare(heap[childIndex], heap[rightIndex]) >= 0
    ) {
      childIndex = rightIndex;
    }

    heap[i] = heap[childIndex];
    i = childIndex;
    childIndex = 2 * i + 1;
  }

  // siftDown
  let parentIndex: number;
  let parent: T;
  while (i > startIndex) {
    // eslint-disable-next-line no-bitwise
    parentIndex = (i - 1) >> 1;
    parent = heap[parentIndex];

    if (compare(item, parent) < 0) {
      heap[i] = parent;
      i = parentIndex;
      continue;
    }

    break;
  }

  heap[i] = item;
}
