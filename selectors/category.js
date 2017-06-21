import { createSelector } from 'reselect';

// constants
import { EXPLORE_TABS } from 'constants/explore';
import { CATEGORY_TYPE_CONVERSION } from 'constants/category';

// utils
import { parseCategoryToTab } from 'utils/category';

const getCategories = state => state.category.list;

const getCategoryTabs = createSelector(
  getCategories,
  (categoryTypes) => {
    const tabs = EXPLORE_TABS;

    Object.values(categoryTypes).forEach((catType) => {
      catType.forEach((category) => {
        const parentCategory = category.category_type === CATEGORY_TYPE_CONVERSION.solution ?
          tabs.find(tab => tab.slug === category.category_type) :
          tabs.find(tab => tab.slug === category.parent_slug);
        if (parentCategory) parentCategory.children.push(parseCategoryToTab(category));
      });
    });

    return tabs;
  }
);

export { getCategoryTabs };
