import { createSelector } from 'reselect';

// constants
import { EXPLORE_TABS } from 'constants/explore';

// utils
import { parseCategoryToTab } from 'utils/category';

const getCategories = state => state.category.list;

const getCategoryTabs = createSelector(
  getCategories,
  (categoryTypes) => {
    if (!Object.keys(categoryTypes).length) return [];
    const tabs = EXPLORE_TABS;
    const secondLevelSolutions = categoryTypes.filter(category => category['category-type'] === 'Solution');
    const firstLevelBmes = categoryTypes.filter(category => category['category-type'] === 'Bme');
    const solutionChildren = [];

    // populates solutions
    secondLevelSolutions.forEach(solutionCategory => (
      solutionCategory.children.map(child => solutionChildren.push(parseCategoryToTab(child)))
    ));

    tabs[0].children = solutionChildren;

    const bmeCategories = firstLevelBmes.map(firstLevelBme => ({
      id: firstLevelBme.id,
      label: firstLevelBme.name,
      query: {
        category: firstLevelBme.slug
      },
      slug: firstLevelBme.slug,
      children: firstLevelBme.children.map(bmeCategory => parseCategoryToTab(bmeCategory)),
      info: firstLevelBme.description
    }));

    // inserts BME categories
    tabs.splice(1, 0, ...bmeCategories);

    return tabs;
  }
);

export { getCategoryTabs };
