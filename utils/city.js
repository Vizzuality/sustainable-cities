import uuidv1 from 'uuid/v1';


// parses projects in order to populate GridList component
const listCities = cities => cities.map(city => ({
  id: uuidv1(),
  title: city.name,
  subtitle: `${city.projectCount} ${(city.projectCount > 1) ? 'projects' : 'project'}`,
  link: { route: 'city-detail', params: { id: city.id } },
  layout: 'portrait'
}));

// parses projects in order to populate GridList component
const listProjectsByCity = (city = {}) => [({
  id: uuidv1(),
  title: `${(city.projectCount > 1) ? 'Projects in this city' : 'Project in this city'}`,
  subtitle: city.name,
  link: { route: 'city-detail', params: { id: city.id, tab: 'projects' } },
  // link: { route: 'city-detail', params: { id: project.id } },
  children: (city.projects || []).map(project => ({
    id: uuidv1(),
    title: project.name,
    // subtitle: project.cities && project.cities[0] ? project.cities[0].name : null,
    link: { route: 'solution-detail', params: { id: project.id } },
    layout: 'portrait',
    image: project.photos && project.photos[0] ? `${process.env.API_URL}${project.photos[0].attachment.medium.url}` : null
  }))
})];

export { listCities, listProjectsByCity };
