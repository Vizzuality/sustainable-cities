export default function getLayerType(queryParams) {
  const { category, subCategory } = queryParams;

  switch (true) {
    case ((category === 'solutions' && !subCategory) || !category):
      return 'all-solutions';
    case (category === 'solutions' && !!subCategory):
      return 'one-solution';
    case (category !== 'solutions'):
      return 'bme';
    default:
      return 'all-solutions';
  }
}
