// parses projects in order to populate GridList component
const listBmes = (bmeCategories) => {
  const bmesbyCategory = [];

  bmeCategories.map(bmeParenCategory => (
    bmeParenCategory.children.forEach((bmeChildrenCategory) => {
      bmesbyCategory.push({
        id: bmeChildrenCategory.id,
        title: bmeChildrenCategory.name,
        children: bmeChildrenCategory.bmes.map(bme => ({
          id: bme.id,
          title: bme.name,
          // do we need it?
          // subtitle: project.cities && project.cities[0] ? project.cities[0].name : null,
          link: { route: 'explore-detail', params: { type: 'business-model-elements', id: bme.id } }
        }))
      });
    })
  ));

  return bmesbyCategory;
};

export { listBmes };
