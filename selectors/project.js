import { createSelector } from 'reselect';

// utils
import { listsProjectsBySolution, listProjects } from 'utils/project';

const getProjects = state => state.project.list;
const getProjectFilters = state => state.project.filters;

const getParsedProjects = createSelector(
  [getProjects, getProjectFilters],
  (projectsBySolution, filters) => {
    if (!projectsBySolution.length) return [];
    return listsProjectsBySolution(projectsBySolution);
    // return !filters.category ?
    //   listsProjectsBySolution(projectsBySolution) :
    //   listProjects(projectsBySolution);
  }
);

export { getParsedProjects };
