
// routes
const EXPLORE_ROUTES = ['explore-index', 'explore-list', 'explore-detail'];

const EXPLORE_DESCRIPTION = `Solution description lorem ipusm casius tesebe erat a ante venenatis dapibus posuere velit aliquet. Morbi leo risus,
      porta ac consectetur ac, vestibulum at eros. Etiam porta sem malesuada magna mollis euismod. Duis mollis, est non commodo luctus, nisi
      erat porttitor ligula, eget lacinia odio sem nec elit. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.`;

const EXPLORE_TABS = [
  {
    id: 1,
    label: 'Solutions',
    query: {
      category: 'solutions'
    },
    slug: 'Solution',
    children: [],
    info: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
  },
  {
    id: 2,
    label: 'Finance',
    query: { category: 'financial-product' },
    slug: 'financial-product',
    children: []
  },
  {
    id: 3,
    label: 'Funding Sources',
    query: {
      category: 'funding-source'
    },
    slug: 'funding-source',
    children: []
  },
  {
    id: 4,
    label: 'Legal framework',
    query: { category: 'delivery-mechanism' },
    slug: 'delivery-mechanism',
    children: []
  },
  {
    id: 5,
    label: 'Investment components',
    query: { category: 'investment-component' },
    slug: 'investment-component',
    children: []
  },
  {
    id: 6,
    label: 'Cities',
    query: { category: 'cities' },
    children: [
      { label: 'Africa', query: { category: 'cities', subCategory: 'africa' } },
      { label: 'America', query: { category: 'cities', subCategory: 'america' } },
      { label: 'Asia', query: { category: 'cities', subCategory: 'asia' } },
      { label: 'Europe', query: { category: 'cities', subCategory: 'europe' } },
      { label: 'Oceania', query: { category: 'cities', subCategory: 'oceania' } }
    ]
  }
];

export { EXPLORE_DESCRIPTION, EXPLORE_ROUTES, EXPLORE_TABS };
