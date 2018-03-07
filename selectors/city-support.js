import { createSelector } from 'reselect';

const getCities = state => state.about['city-supports'];
const getCategories = state => state.about.categories;
const getCitiesByCategory = (cities = [], categories) => {
  if(!cities.length || !categories.length) return;
  // temporary reverse, set an "order" field or similar
  // return categories.map(cat => ({
  //   ...cat,
  //   cities: cities.filter(city => city.category === cat.id)
  // }))
  // Cities is the whole object without taking appart by category
  return cities
};

export default createSelector(
  getCities,
  getCategories,
  getCitiesByCategory
);
