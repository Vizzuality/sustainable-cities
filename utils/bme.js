
// parses bmes in order to populate GridList component
const listBmes = bmes => bmes.map(bme => ({
  id: bme.id,
  title: bme.name,
  link: { route: 'bme-detail', params: { id: bme.id } }
}));

// parses bmes in order to populate GridSlider component
const listsBmesByCategory = (categories, filters = {}) =>
  categories.map(category => ({
    groupId: filters.category || undefined,
    parentId: category.level === 3 ? filters.subCategory : undefined,
    id: category.id,
    title: category.name,
    level: category.level,
    slug: category.slug,
    image: bme.photos && bme.photos[0] ? `${process.env.API_URL}${bme.photos[0].attachment.medium.url}` : null,
    children: listBmes(category['children-bmes'] || [])
  }
));

export { listBmes, listsBmesByCategory };
