
// parses projects in order to populate GridList component
const listCities = cities => cities.map(city => ({
  id: city.id,
  title: city.name,
  subtitle: `${city.projectCount} projects`,
  link: { route: 'explore-index', params: { category: 'cities', id: city.id } },
  layout: 'portrait'
}));

export { listCities };
