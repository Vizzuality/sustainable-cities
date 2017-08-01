import groupBy from 'lodash/groupBy';

// constants
import { CATEGORY_ICONS } from 'constants/category';

// parses projects in order to populate GridList component
const listProjects = projects => projects.map(project => ({
  id: project.id,
  title: project.name,
  subtitle: project.cities && project.cities[0] ? project.cities[0].name : null,
  link: { route: 'solution-detail', params: { id: project.id } },
  image: project.photos && project.photos[0] ? `${process.env.API_URL}${project.photos[0].attachment.medium.url}` : null
}));

const joiningProjects = (solution) => {
  const result = solution.projects || [];
  if (solution.children && solution.children.length) {
    for (let index = 0, len = solution.children.length; index < len; index++) {
      if (solution.children[index].projects && solution.children[index].projects.length) {
        const projects = solution.children[index].projects;
        for (let indexProject = 0, pLen = projects.length; indexProject < pLen; indexProject++) {
          result.push(projects[indexProject]);
        }
      }
    }
  }
  return listProjects(result);
};

// parses projects in order to populate GridSlider component
const listsProjectsBySolution = solutions =>
  solutions.map(solution => ({
    id: solution.id,
    title: solution.name,
    slug: solution.slug,
    icon: CATEGORY_ICONS[solution.slug],
    children: joiningProjects(solution)
  })
);

// groups projects by city id and parses to be used as geojson.
// It is used in the map.
const groupProjectsByCity = (projects) => {
  const parsedData = [];
  // removes projects without city
  const filteredProjects = projects.filter(d => !!d.cities[0]);
  const projectsByCity = groupBy(filteredProjects, d => d.cities[0].id);

  Object.keys(projectsByCity).forEach((cityId) => {
    const cityData = (projectsByCity[cityId] || []).length ?
      projectsByCity[cityId][0].cities[0] : {};
    const { name, lat, lng } = cityData;

    if (!lat || !lng) return;

    parsedData.push({
      name,
      lat,
      lng,
      projects: projectsByCity[cityId]
    });
  });


  return parsedData;
};

export { listProjects, listsProjectsBySolution, groupProjectsByCity };
