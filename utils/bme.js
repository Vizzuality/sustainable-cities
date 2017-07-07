// parses projects in order to populate GridList component
const listBmes = (bmeCategories) => {
  const bmesbyCategory = [];

  bmeCategories.children.forEach((bmeCategory) => {
    const bmesParsed = bmeCategory.bmes.map(bme => ({
      id: bme.id,
      title: bme.name,
      // do we need it?
      // subtitle: project.cities && project.cities[0] ? project.cities[0].name : null,
      link: { route: 'explore-detail', params: { type: 'business-model-elements', id: bme.id } }
    }));
    bmesbyCategory.push({
      id: bmeCategory.id,
      title: bmeCategory.name,
      children: bmesParsed
    });
  });

  return bmesbyCategory;
};

export { listBmes };
