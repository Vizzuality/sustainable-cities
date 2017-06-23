
// parseFilteredProjects format
// [
// { title: 'Bike sharing system',
//   children: [
//    { id: 1,
//      title: 'Capital bikeshare',
//      subtitle: 'Washington DC',
//      link: { route: 'explore-detail', params: { category: 2, id: 1 }}
//   }]
//  },
// ...
// ]

const parseFilteredProjects = categories => categories.map(category => ({
  title: category.name,
  children: category.projects.map(project => ({
    id: project.id,
    title: project.name,
    subtitle: project.cities && project.cities[0] ? project.cities[0].name : null,
    link: { route: 'explore-detail', params: { category: category.category_id, id: project.id } }
  }))
}));

export { parseFilteredProjects };
