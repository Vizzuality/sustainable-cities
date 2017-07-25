
// parses projects in order to populate GridList component
const listProjects = projects => projects.map(project => ({
  id: project.id,
  title: project.name,
  subtitle: project.cities && project.cities[0] ? project.cities[0].name : null,
  link: { route: 'solution-detail', params: { id: project.id } }
}));

// parses projects in order to populate GridSlider component
const listsProjectsBySolution = solutions =>
  solutions.map(solution => ({
    id: solution.id,
    title: solution.name,
    slug: solution.slug,
    children: listProjects(solution.projects || [])
  })
);

export { listProjects, listsProjectsBySolution };
