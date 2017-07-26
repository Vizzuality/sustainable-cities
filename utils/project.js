import concat from 'lodash/concat';
import flatten from 'lodash/flatten';

function joiningProjects(solution) {
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
  // return listProjects(flatten(concat(solution.projects, solution.children.map( c => c.projects ))));
}

// parses projects in order to populate GridList component
const listProjects = projects => projects.map(project => ({
  id: project.id,
  title: project.name,
  subtitle: project.cities && project.cities[0] ? project.cities[0].name : null,
  link: { route: 'solution-detail', params: { id: project.id } },
  image: project.photos && project.photos[0] ? `${process.env.API_URL}${project.photos[0].attachment.medium.url}` : null
}));

// parses projects in order to populate GridSlider component
const listsProjectsBySolution = solutions =>
  solutions.map(solution => ({
    id: solution.id,
    title: solution.name,
    slug: solution.slug,
    children: joiningProjects(solution)
  })
);

export { listProjects, listsProjectsBySolution };
