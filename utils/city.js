import uuidv1 from 'uuid/v1';

// utils
import { getImage as getProjectImage } from 'utils/project';

const getCityImage = (city) => city.photos && city.photos[0] ?
  `${process.env.API_URL}${city.photos[0].attachment.medium.url}` : null;

// parses projects in order to populate GridList component
const listCities = cities => cities.map(city => ({
  id: uuidv1(),
  title: city.name,
  subtitle: `${city.projectCount} ${(city.projectCount > 1) ? 'projects' : 'project'}`,
  link: { route: 'city-detail', params: { id: city.id } },
  layout: 'portrait',
  image: getCityImage(city)
}));

// parses projects in order to populate GridList component
const listProjectsByCity = (city = {}) => [({
  id: uuidv1(),
  title: `${(city.projectCount > 1) ? 'Projects in this city' : 'Project in this city'}`,
  subtitle: city.name,
  link: { route: 'city-detail', params: { id: city.id, tab: 'projects' } },
  children: (city.projects || []).map(project => ({
    id: uuidv1(),
    title: project.name,
    image: getProjectImage(project),
    link: { route: 'solution-detail', params: { id: project.id } },
    layout: 'portrait'
  }))
})];

export { listCities, listProjectsByCity };
