import { createSelector } from 'reselect';

const getBmeCategories = state => state.category.bme.list;
const getSolutionCategories = state => state.category.solution.list;
const getCities = state => state.city.list;


const bmesAsDownload = createSelector(
  [getBmeCategories],
  (bmes) => {
    const recursive = bme => (bme.children || []).map(child => ({
      label: child.name,
      expanded: true,
      children: recursive(child)
    }));

    return (bmes || []).map(bme => ({
      label: bme.name,
      expanded: true,
      children: recursive(bme)
    }));
  }
);

const citiesAsDownload = createSelector(
  [getCities],
  cities => (cities || []).map(city => ({ label: city.name }))
);

const solutionsAsDownload = createSelector(
  [getSolutionCategories],
  solutions => (solutions || []).map(solution => ({ label: solution.name }))
);

export { bmesAsDownload, citiesAsDownload, solutionsAsDownload };
