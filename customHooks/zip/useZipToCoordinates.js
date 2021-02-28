import { zipArray } from "./zipArray";

const binarySearchZip = (list, item) => {
  let low = 0;
  let high = list.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const guess = list[mid];

    if (guess[0] === item) {
      return guess;
    }

    if (guess[0] > item) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }

  return false;
};

const useZipToCoordinates = (zipToFind) => {
  const arr = binarySearchZip(zipArray, zipToFind);
  return { zip: arr[0], lat: arr[1], lng: arr[2] };
};

export default useZipToCoordinates;
