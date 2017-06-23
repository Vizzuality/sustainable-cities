import { createSelector } from 'reselect';

const getProjects = state => state.project.list;

const getFilteredProjects = createSelector(
  getProjects,
  (projectSolutions) => {
    const gallery = [];

    Object.values(projectSolutions).forEach((projecSolution) => {
      const solutionGallery = {};

      solutionGallery.title = projecSolution.children[0] ?
        projecSolution.children[0].category_name : '';
      solutionGallery.children = projecSolution.map(child => ({
        id: child.id,
        title: child.name,
        subtitle: child.city ? child.city.name : null,
        link: {
          route: 'explore-detail',
          params: {
            category: child.category_slug,
            id: child.id
          }
        }
      }));

      gallery.push(solutionGallery);
    });

    return gallery;
  }
);

export { getFilteredProjects };
