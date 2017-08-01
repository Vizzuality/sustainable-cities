import uuidv1 from 'uuid/v1';

// constants
import { CATEGORY_TYPE_CONVERSION } from 'constants/category';

const parseCategoryToTab = (category) => {
  const { 'category-type': categoryType, name, parentSlug, slug } = category;
  return {
    label: name,
    id: uuidv1(),
    query: {
      category: categoryType === CATEGORY_TYPE_CONVERSION.solution ?
        'solutions' : parentSlug,
      subCategory: slug
    }
  };
};

export { parseCategoryToTab };
