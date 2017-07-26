import { CATEGORY_TYPE_CONVERSION } from 'constants/category';

const parseCategoryToTab = (category) => {
  const { id, 'category-type': categoryType, name, parentSlug, slug } = category;
  return {
    label: name,
    id,
    query: {
      category: categoryType === CATEGORY_TYPE_CONVERSION.solution ?
        'solutions' : parentSlug,
      subCategory: slug
    }
  };
};

export { parseCategoryToTab };
