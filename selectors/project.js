import { createSelector } from 'reselect';

// utils
import { listsProjectsBySolution, listProjects } from 'utils/project';

const getProjects = state => state.project.list;
const getProjectFilters = state => state.project.filters;

const getParsedProjects = createSelector(
  [getProjects, getProjectFilters],
  (projectsBySolution, filters) => {
    if (!projectsBySolution.length) return [];
    const projects = [];

    if (filters.category) {
      projectsBySolution.forEach(p =>
        projects.push([...p.projects])
      );
    }


    return !filters.category ?
      listsProjectsBySolution(projectsBySolution) :
      listProjects(projects[0]); // change this
  }
);

export { getParsedProjects };
