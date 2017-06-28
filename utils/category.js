import compact from 'lodash/compact';
import { CATEGORY_TYPE_CONVERSION } from 'constants/category';

const getCategoryIdBySlug = (categories, subCategory) => {
  const subCategoryObject = categories.map(cat => cat.children.find(c =>
      c.query.subCategory === subCategory));

  if (subCategoryObject) compact(subCategoryObject);

  return subCategoryObject && !!subCategoryObject[0] ? subCategoryObject[0].id : null;
};

const parseCategoryToTab = (category) => {
  const { id, category_type: categoryType, slug, name, parent_slug: parentSlug } = category;
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


export { getCategoryIdBySlug, parseCategoryToTab };
