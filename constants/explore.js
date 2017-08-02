
// routes
const EXPLORE_ROUTES = ['explore-index', 'explore-list', 'explore-detail'];

const EXPLORE_DESCRIPTION = `Solution description lorem ipusm casius tesebe erat a ante venenatis dapibus posuere velit aliquet. Morbi leo risus,
      porta ac consectetur ac, vestibulum at eros. Etiam porta sem malesuada magna mollis euismod. Duis mollis, est non commodo luctus, nisi
      erat porttitor ligula, eget lacinia odio sem nec elit. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.`;

const EXPLORE_TABS = [
  {
    id: 999,
    label: 'Projects',
    query: {
      category: 'solutions'
    },
    slug: 'Solution',
    children: [],
    info: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    allowAll: true
  },
  // BME categories come here...
  {
    id: 6,
    label: 'Cities',
    query: { category: 'cities' },
    children: []
  }
];

export { EXPLORE_DESCRIPTION, EXPLORE_ROUTES, EXPLORE_TABS };
