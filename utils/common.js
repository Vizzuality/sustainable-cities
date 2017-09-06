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

const getYearFromDateString = (dateString) => {
  if (!dateString) return null;
  const date = new Date(dateString);
  return date ? date.getFullYear() : '-';
};

const sortByName = (a = {}, b = {}) => {
  if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
  if (b.name.toLowerCase() > a.name.toLowerCase()) return -1;
  return 0;
};

// eslint-disable-next-line no-confusing-arrow
const getImage = entity => (entity.photos || []).length ?
  `${process.env.API_URL}${entity.photos[0].attachment.medium.url}` : null;


export { isArrayEqual, getYearFromDateString, sortByName, getImage };
