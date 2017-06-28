import isEqual from 'lodash/isEqual';

/**
 * Compares if two arrays are equal based on their length and inner content.
 * It also compares array with objects.
 * @param {array} originalArray - the original array.
 * @param {array} comparedArray - the array to be compared with.
 */
const isArrayEqual = (originalArray, comparedArray) => {
  let isArrEqual = true;

  if (originalArray.length !== comparedArray.length) {
    return !isArrEqual;
  }

  originalArray.forEach((arr, index) => {
    if (isArrEqual && !isEqual(arr, comparedArray[index])) {
      isArrEqual = !isArrEqual;
      return null;
    }
    return null;
  });

  return isArrEqual;
};

export { isArrayEqual };
