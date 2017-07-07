import { CATEGORY_TYPE_CONVERSION } from 'constants/category';


const getCategoryIdByCategorySlug = (categories, category) => {
  const categoryObject = categories.find(cat => cat.children.find(c =>
      c.query.category === category));

  return categoryObject ? categoryObject.id : null;
};

const getCategoryIdBySubCategorySlug = (categories, subCategory) => {
  const categoryObject = categories.find(cat => cat.children.find(c =>
      c.query.subCategory === subCategory));

  if (!categoryObject) return null;

  const subCategoryObject = categoryObject.children.find(child =>
    child.query.subCategory === subCategory);

  return subCategoryObject ? subCategoryObject.id : null;
};

const parseCategoryToTab = (category) => {
  const { id, category_type: categoryType, name, parent_slug: parentSlug } = category;
  return {
    label: name,
    id,
    query: {
      category: categoryType === CATEGORY_TYPE_CONVERSION.solution ?
        'solutions' : parentSlug,
      subCategory: id
    }
  };
};


export { getCategoryIdByCategorySlug, getCategoryIdBySubCategorySlug, parseCategoryToTab };
