export default function getBreadcrumbs(categories = [], filters = {}, hasTitle = false) {
  const { category, subCategory, children } = filters;
  let breadcrumbs = [];

  switch (true) {
    // solution
    case (subCategory && category === 'solutions'): {
      breadcrumbs = [
        {
          name: 'Projects',
          route: 'explore-index',
          params: { category: 'solutions' }
        }
      ];

      if (hasTitle) {
        const solutionObject = categories.find(child => child.slug === subCategory) || {};

        breadcrumbs.push({
          name: solutionObject.name,
          route: 'explore-index',
          params: { category: 'solutions', subCategory: solutionObject.slug },
          title: true
        });
      }

      break;
    }

    case (!subCategory && category === 'solutions' && hasTitle): {
      breadcrumbs.push({
        name: 'Projects',
        route: 'explore-index',
        params: { category: 'solutions' },
        title: true
      });

      break;
    }

    // BME of first level
    case (category !== 'solutions' && !children && !subCategory && hasTitle): {
      const categoryObject = categories.find(cat => cat.slug === category);

      breadcrumbs.push({
        name: categoryObject.name,
        route: 'explore-index',
        params: { category: categoryObject.slug },
        title: true
      });

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

      if (hasTitle) {
        const subCategoryObject = ((categoryObject[0] || {}).children).find(child => child.slug === subCategory);

        breadcrumbs.push({
          name: subCategoryObject.name,
          route: 'explore-index',
          params: { category: categoryObject[0].slug, subCategory: subCategoryObject.slug },
          title: true
        });
      }

      break;
    }
    // BME of third level
    case (children && category !== 'solutions'): {
      const categoryObject = categories.find(cat => cat.slug === category);
      const subCategoryObject = ((categoryObject || {}).children || []).find(cat => cat.slug === subCategory);

      breadcrumbs = [
        {
          name: categoryObject.name,
          route: 'explore-index',
          params: { category: categoryObject.slug }
        },
        {
          name: subCategoryObject.name,
          route: 'explore-index',
          params: { category: categoryObject.slug, subCategory: subCategoryObject.slug }
        }
      ];

      if (hasTitle) {
        const childCategoryObject = ((subCategoryObject || {}).children).find(child => child.slug === children) || {};

        breadcrumbs.push({
          name: childCategoryObject.name,
          route: 'explore-index',
          params: { category: categoryObject.slug, subCategory: subCategoryObject.slug },
          title: true
        });
      }

      break;
    }
    default:
      return breadcrumbs;
  }

  return breadcrumbs;
}
