import { createSelector } from 'reselect';

// utils
import { listCities } from 'utils/city';

const getCities = state => state.city.list;

const getParsedCities = createSelector(
  [getCities],
  (cities) => {
    if (!cities.length) return [];

    return listCities(cities);
  }
);

export { getParsedCities };
