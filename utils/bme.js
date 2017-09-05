import uuidv1 from 'uuid/v1';

// utils
import { getImage } from 'utils/common';

// constants
import { CATEGORY_FIRST_LEVEL_COLORS } from 'constants/category';

const getIcon = ({ parentSlug }, { slug }) => {
  return `icon-${(parentSlug || slug)}`;
};

// parses bmes in order to populate GridList component
const listBmes = (bmes = [], bmeParent, filters) => bmes.map(bme => ({
  id: uuidv1(),
  title: bme.name,
  image: getImage(bme),
  placeholder: {
    background: CATEGORY_FIRST_LEVEL_COLORS[filters.category] ||
    CATEGORY_FIRST_LEVEL_COLORS.default,
    icon: getIcon(bme, bmeParent)
  },
  link: { route: 'bme-detail', params: { id: bme.id } }
}));

// parses bmes in order to populate GridSlider component
const listsBmesByCategory = (categories = [], filters = {}) =>
  categories.map(category => ({
    groupId: filters.category || undefined,
    parentId: category.level === 3 ? filters.subCategory : undefined,
    id: uuidv1(),
    title: category.name,
    level: category.level,
    slug: category.slug,
    link: {
      route: 'explore-index',
      params: {
        category: filters.category,
        subCategory: category.level === 3 ? filters.subCategory : category.slug,
        children: category.level === 3 ? category.slug : null
      }
    },
    image: getImage(category),
    children: listBmes(category.childrenBmes, category, filters)
  }
));

export { listBmes, listsBmesByCategory };
