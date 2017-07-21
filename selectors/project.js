import { createSelector } from 'reselect';

// utils
import { projectsBySolution, listProjects } from 'utils/project';

const getProjects = state => state.project.list;
const getProjectFilters = state => state.category.bme.list;

const getParsedProjects = createSelector(
  [getProjects, getProjectFilters],
  (projects, filters) => {
    if (!projects.length) return [];

    return !filters.category ?
      projectsBySolution(projects) : listProjects(projects);
  }
);

export { getParsedProjects };
