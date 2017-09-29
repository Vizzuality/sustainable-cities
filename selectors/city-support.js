import { createSelector } from 'reselect';

const getCities = state => state.about.list;
const getCategories = state => state.about.categories;
const getCitiesByCategory = (cities, categories) => {
  if(!cities.length || !categories.length) return;
  // temporary reverse, set an "order" field or similar
  return categories.reverse().map(cat => ({
    ...cat,
    cities: cities.filter(city => city.category === cat.id)
  }))
};

export default createSelector(
  getCities,
  getCategories,
  getCitiesByCategory
);
