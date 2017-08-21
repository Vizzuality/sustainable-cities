import uuidv1 from 'uuid/v1';
import groupBy from 'lodash/groupBy';

// utils
import { sortByName, getImage } from 'utils/common';

// constants
import { CATEGORY_ICONS } from 'constants/category';

// parses projects in order to populate GridList component
const listProjects = projects => projects.map(project => ({
  id: uuidv1(),
  title: project.name,
  subtitle: project.cities && project.cities[0] ? project.cities[0].name : null,
  link: { route: 'solution-detail', params: { id: project.id } },
  image: getImage(project)
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
  (result || []).sort(sortByName);
  return listProjects(result);
};

// parses projects in order to populate GridSlider component
const listsProjectsBySolution = solutions =>
  solutions.map(solution => ({
    id: uuidv1(),
    title: solution.name,
    slug: solution.slug,
    icon: CATEGORY_ICONS[solution.slug],
    link: {
      route: 'explore-index',
      params: {
        category: 'solutions',
        subCategory: solution.slug
      }
    },
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
    const { name, lat, lng, id } = cityData;

    if (!lat || !lng) return;

    parsedData.push({
      id,
      name,
      lat,
      lng,
      projects: projectsByCity[cityId]
    });
  });


  return parsedData;
};

export { getImage, listProjects, listsProjectsBySolution, groupProjectsByCity };
