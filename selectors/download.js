import { createSelector } from 'reselect';

const getBmeCategories = state => state.category.bme.list;
const getSolutionCategories = state => state.category.solution.list;
const getCities = state => state.city.list;


const bmesAsDownload = createSelector(
  [getBmeCategories],
  (bmes) => {
    return (bmes || []).map(bme => ({
      id: bme.id,
      label: bme.name,
      value: bme.id,
      expanded: true,
      children: (bme.children || []).map(child => ({
        id: child.id,
        label: child.name,
        value: child.id
      }))
    }));
  }
);

const citiesAsDownload = createSelector(
  [getCities],
  cities => (cities || []).map(city => ({ id: city.id, label: city.name, value: city.id }))
);

const solutionsAsDownload = createSelector(
  [getSolutionCategories],
  solutions => (solutions || []).map(solution =>
    ({ id: solution.id, label: solution.name, value: solution.id }))
);

export { bmesAsDownload, citiesAsDownload, solutionsAsDownload };
