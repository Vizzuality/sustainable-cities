import { createSelector } from 'reselect';
import uuidv1 from 'uuid/v1';

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

    const groupBmesByCategoryParent = groupBy(bmes.filter(bme => bme.categoryLevel1Slug), 'categoryLevel1Slug');

    const categoryParentObject = {};

    Object.keys(groupBmesByCategoryParent).forEach((categoryParentSlug) => {
      const categoryParentName =
        ((groupBmesByCategoryParent[categoryParentSlug][0] || {})).categoryLevel1;
      categoryParentObject[categoryParentSlug] = {
        id: uuidv1(),
        title: `${categoryParentName} in this city`,
        link: {
          route: 'city-detail',
          params: {
            id: city.id,
            tab: categoryParentSlug
          }
        },
        children: listBmes(
          groupBmesByCategoryParent[categoryParentSlug] || [],
          { slug: categoryParentSlug },
          { category: categoryParentSlug }
        )
      };
    });

    return categoryParentObject;
  }
);

export { getParsedCities, getParsedProjects, getParsedBmes };
