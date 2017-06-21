import { createSelector } from 'reselect';
import memoize from 'lodash/memoize';
import { CATEGORY_TYPE_CONVERSION } from 'constants/category';

const getCategoriesByType = createSelector(
    ({ category }) => category.list,
    categories => memoize(
        (categoryType) => {
          const convertedCategoryType = CATEGORY_TYPE_CONVERSION[categoryType];
          return categories.filter(category => category['category-type'] === convertedCategoryType);
        })
);

export { getCategoriesByType };
