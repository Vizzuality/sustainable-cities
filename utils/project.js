import groupBy from 'lodash/groupBy';

// parses projects in order to populate GridList component
const listProjects = projects => projects.map(project => ({
  id: project.id,
  title: project.name,
  subtitle: project.cities && project.cities[0] ? project.cities[0].name : null,
  link: { route: 'explore-detail', params: { type: 'solutions', id: project.id } }
}));

// parses projects in order to populate GridSlider component
const projectsBySolution = (projects) => {
  const groupedProjects = groupBy(projects, project => project.category.parent.name);
  return Object.values(groupedProjects).map(solution => ({
    id: solution[0] ? solution[0].category.parent.id : null,
    title: solution[0] ? solution[0].category.parent.name : null,
    children: solution.map(project => ({
      id: project.id,
      title: project.name,
      subtitle: project.cities && project.cities[0] ? project.cities[0].name : null,
      link: { route: 'explore-detail', params: { type: 'solutions', id: project.id } }
    }))
  }));
};

export { listProjects, projectsBySolution };
