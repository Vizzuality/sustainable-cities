
// routes
const EXPLORE_ROUTES = ['explore-index', 'explore-list', 'explore-detail'];

const EXPLORE_TABS = [
  { label: 'Solutions',
    query: {
      category: 'solutions'
    },
    slug: 'Solution',
    children: [],
    info: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
  },
  { label: 'Finance',
    query: { category: 'financial-product' },
    slug: 'financial-product',
    children: []
  },
  { label: 'Funding Sources',
    query: {
      category: 'funding-source'
    },
    slug: 'funding-source',
    children: []
  },
  { label: 'Legal framework',
    query: { category: 'delivery-mechanism' },
    slug: 'delivery-mechanism',
    children: []
  },
  { label: 'Investment components',
    query: { category: 'investment-component' },
    slug: 'investment-component',
    children: []
  },
  { label: 'Cities',
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

// to remove
const SAMPLE_GRID_CATEGORIES_DATA = [
  {
    title: 'Bike sharing system',
    children: [{
      id: 1,
      title: 'Capital bikeshare',
      subtitle: 'Washington DC',
      link: { route: 'explore-detail', params: { category: 2, id: 1 } }
    }, {
      id: 2,
      title: 'Capital bikeshare 2',
      subtitle: 'Washington DC 2',
      link: { route: 'explore-detail', params: { category: 2, id: 2 } }
    }]
  },
  {
    title: 'Bike sharing system 2',
    children: [{
      id: 3,
      title: 'Capital bikeshare 2 1',
      subtitle: 'Washington DC 3',
      link: { route: 'explore-detail', params: { category: 2, id: 1 } }
    }, {
      id: 4,
      title: 'Capital bikeshare 2 2',
      subtitle: 'Washington DC 4',
      link: { route: 'explore-detail', params: { category: 2, id: 2 } }
    }]
  }
];


export { EXPLORE_ROUTES, EXPLORE_TABS, SAMPLE_GRID_CATEGORIES_DATA };
