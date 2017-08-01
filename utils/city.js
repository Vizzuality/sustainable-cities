
// parses projects in order to populate GridList component
const listCities = cities => cities.map(city => ({
  id: city.id,
  title: city.name,
  subtitle: `${city.projectCount} projects`,
  link: { route: 'city-detail', params: { id: city.id } },
  layout: 'portrait'
}));

// parses projects in order to populate GridList component
const listProjectsByCity = (city = {}) => [({
  id: city.id,
  title: 'Projects in this city',
  subtitle: city.name,
  link: { route: 'city-detail', params: { id: city.id, tab: 'projects' } },
  // link: { route: 'city-detail', params: { id: project.id } },
  children: (city.projects || []).map(project => ({
    id: project.id,
    title: project.name,
    // subtitle: project.cities && project.cities[0] ? project.cities[0].name : null,
    link: { route: 'solution-detail', params: { id: project.id } },
    layout: 'portrait',
    image: project.photos && project.photos[0] ? `${process.env.API_URL}${project.photos[0].attachment.medium.url}` : null
  }))
})];

export { listCities, listProjectsByCity };
