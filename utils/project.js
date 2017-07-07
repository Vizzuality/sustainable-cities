
// parses projects in order to populate GridList component
const listProjects = projects => projects.map(project => ({
  id: project.id,
  title: project.name,
  subtitle: project.cities && project.cities[0] ? project.cities[0].name : null,
  link: { route: 'explore-detail', params: { type: 'solutions', id: project.id } }
}));

// parses projects in order to populate GridSlider component
const projectsBySolution = solutions => solutions.map(solution => ({
  id: solution.category_id,
  title: solution.name,
  children: solution.projects.map(project => ({
    id: project.id,
    title: project.name,
    subtitle: project.cities && project.cities[0] ? project.cities[0].name : null,
    link: { route: 'explore-detail', params: { type: 'solutions', id: project.id } }
  }))
}));

export { listProjects, projectsBySolution };
