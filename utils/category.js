const parseCategoryToTab = (category) => {
  const { id, name, slug, parent_slug } = category;
  return {
    label: name,
    id,
    query: {
      category: parent_slug,
      subCategory: slug
    }
  };
};

export { parseCategoryToTab };
