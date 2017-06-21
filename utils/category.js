// import { EXPLORE_TABS } from 'constants/explore';

const parseCategoryToTab = (category) => {
  const { name, slug, parent_slug } = category;
  return {
    label: name,
    query: {
      route: '',
      params: { category: parent_slug, subCategory: slug }
    }
  };
};

// const categoriesToTabs = (categoryTypes) => {
//   const tabs = EXPLORE_TABS;

//   Object.values(categoryTypes).forEach((catType) => {
//     catType.forEach((category) => {
//       const parentCategory = tabs.find(tab => tab.slug === category.parent_slug);
//       if (parentCategory) parentCategory.children.push(parseCategoryToTab(category));
//     });
//   });

//   return tabs;
// };

export { parseCategoryToTab };
