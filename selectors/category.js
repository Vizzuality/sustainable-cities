import { createSelector } from 'reselect';

// constants
import { EXPLORE_TABS } from 'constants/explore';

// utils
import { parseCategoryToTab } from 'utils/category';

const getSolutionCategories = state => state.category.solution.list;
const getBmeCategories = state => state.category.bme.list;

const getCategoryTabs = createSelector(
  [getSolutionCategories, getBmeCategories],
  (solutionCategories, bmeCategories) => {
    if (!solutionCategories.length || !bmeCategories.length) return [];
    const tabs = EXPLORE_TABS;

    // populates solutions categories
    tabs[0].children = solutionCategories.map(solutionCategory =>
      parseCategoryToTab(solutionCategory));

    // populates BME categories
    const bmeCategoryTabs = bmeCategories.map(firstLevelBmeCategory => ({
      id: firstLevelBmeCategory.id,
      hasModal: !!firstLevelBmeCategory.label,
      label: firstLevelBmeCategory.name,
      query: {
        category: firstLevelBmeCategory.slug
      },
      slug: firstLevelBmeCategory.slug,
      children: (firstLevelBmeCategory.children || [])
        .map(bmeCategory => parseCategoryToTab({
          ...bmeCategory,
          parentSlug: firstLevelBmeCategory.slug
        })
      ),
      info: firstLevelBmeCategory.description,
      allowAll: true
    }));

    // inserts BME categories
    return [tabs[0], ...bmeCategoryTabs, tabs[1]];
  }
);

const getAllCategories = createSelector(
  [getSolutionCategories, getBmeCategories],
  (solutionCategories, bmeCategories) => {
    if (!solutionCategories.length || !bmeCategories.length) return [];

    return [...solutionCategories, ...bmeCategories];
  }
);

export { getCategoryTabs, getAllCategories };
