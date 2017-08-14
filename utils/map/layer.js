export default function getLayerType(queryParams) {
  const { category, subCategory } = queryParams;

  switch (true) {
    case (((category === 'solutions' || category === 'cities') && !subCategory) || !category):
      return 'all-solutions';
    case (category === 'solutions' && !!subCategory):
      return 'one-solution';
    case (category !== 'solutions'):
      return 'bme';
    default:
      return 'all-solutions';
  }
}
