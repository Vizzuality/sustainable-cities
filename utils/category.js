const categoriesToTabs = categories => categories.map(cat => ({
  label: cat.name,
  query: {
    category: cat.parentSlug || 'solutions',
    subCategory: cat.slug || 'bike-sharing'
  }
}));

export { categoriesToTabs };
