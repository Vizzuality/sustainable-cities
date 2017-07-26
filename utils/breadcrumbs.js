export default function getBreadcrumbs(categories = [], filters = {}) {
  const { category, subCategory, children } = filters;
  let breadcrumbs = [];

  switch (true) {
    // solution
    case (subCategory && category === 'solutions'): {
      breadcrumbs = [
        {
          name: 'solutions',
          route: 'explore-index',
          params: { category: 'solutions' }
        }
      ];

      break;
    }

    // BME of second level
    case (subCategory && !children && category !== 'solutions'): {
      const categoryObject = categories.filter(ca => ca['category-type'] === 'Bme' && ca.children.find(c => c.slug === subCategory));

      breadcrumbs = [
        {
          name: categoryObject[0].name,
          route: 'explore-index',
          params: { category: categoryObject[0].slug }
        }
      ];

      break;
    }
    // BME of third level
    case (children && category !== 'solutions'): {
      const categoryObject = categories.filter(ca => ca['category-type'] === 'Bme' && ca.children.find(c => c.slug === subCategory));
      const subCategoryObject = categoryObject[0].children.find(cat => cat.slug === subCategory);

      breadcrumbs = [
        {
          name: categoryObject[0].name,
          route: 'explore-index',
          params: { category: categoryObject[0].slug }
        },
        {
          name: subCategoryObject.name,
          route: 'explore-index',
          params: { category: categoryObject[0].slug, subCategory: subCategoryObject.slug }
        }
      ];

      break;
    }
    default:
      return breadcrumbs;
  }

  return breadcrumbs;
}
