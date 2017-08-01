import { createSelector } from 'reselect';

import groupBy from 'lodash/groupBy';

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
  [getCityBmes, getCity],
  (bmes, city) => {
    if (!Object.keys(bmes).length || !Object.keys(city).length) return {};

    const groupBmesByCategoryParent = groupBy(bmes.filter(bme => bme.categoryLevel1), 'categoryLevel1');

    const categoryParentObject = {};

    Object.keys(groupBmesByCategoryParent).forEach((categoryParent, i) => {
      const categorySlug = categoryParent.toLowerCase().replace(/\s/g, '-');
      categoryParentObject[categorySlug] = {
        id: i,
        title: `${categoryParent} in this city`,
        link: {
          route: 'city-detail',
          params: {
            id: city.id,
            tab: categorySlug
          }
        },
        children: listBmes(groupBmesByCategoryParent[categoryParent] || [])
      };
    });

    return categoryParentObject;
  }
);

export { getParsedCities, getParsedProjects, getParsedBmes };
