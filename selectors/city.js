import { createSelector } from 'reselect';

// utils
import { listCities, listProjectsByCity } from 'utils/city';
import { listBmes } from 'utils/bme';

const getCities = state => state.city.list;
const getCity = state => state.city.detail;
const getCityBmes = state => state.city.bme.list;

const getParsedCities = createSelector(
  [getCities],
  (cities) => {
    if (!cities.length) return [];

    return listCities(cities);
  }
);

const getParsedProjects = createSelector(
  [getCity],
  (city) => {
    if (!Object.keys(city).length) return [];


    return listProjectsByCity(city || []);
  }
);

const getParsedBmes = createSelector(
  [getCityBmes],
  (bmes) => {
    if (!Object.keys(bmes).length) return {};


    // add more logic here

    return {};

    // return listBmes(bmes || []);
  }
);

export { getParsedCities, getParsedProjects, getParsedBmes };
