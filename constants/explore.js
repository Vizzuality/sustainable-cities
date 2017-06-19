
// routes
const EXPLORE_ROUTES = ['explore-index', 'explore-list', 'explore-detail'];

// Tabs
const EXPLORE_TABS = [
  { label: 'Solutions',
    query: {
      category: 'solutions'
    },
    children: [
      { label: 'Transit-oriented developments', query: { category: 'solutions', subCategory: 'transit-oriented-developments' } },
      { label: 'Bike sharing System', query: { category: 'solutions', subCategory: 'bike-sharing-system' } },
      { label: 'Low emission buses', query: { category: 'solutions', subCategory: 'low-emission-buses' } },
      { label: 'Building efficiency retrofits', query: { category: 'solutions', subCategory: 'building-efficiency-retrofits' } },
      { label: 'New efficient constructions', query: { category: 'solutions', subCategory: 'new-efficient-constructions' } }
    ],
    info: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
  },
  { label: 'Investment capital', query: { category: 'investment-capital' } },
  { label: 'Funding Sources',
    query: {
      category: 'funding-sources'
    },
    children: [
      { label: 'Investment proceeds', query: { category: 'funding-sources', subCategory: 'investment-proceeds' } },
      { label: 'Incentives', query: { category: 'funding-sources', subCategory: 'incentives' } },
      { label: 'Other budgets', query: { category: 'funding-sources', subCategory: 'other-budgets' } }
    ]
  },
  { label: 'Legal framework',
    query: { category: 'legal-framework' },
    children: [
      { label: 'Contracts', query: { category: 'legal-framework', subCategory: 'contracts' } },
      { label: 'Ownership structures & entities', query: { category: 'legal-framework', subCategory: 'ownership-structures-entities' } },
      { label: 'Policy & regualation', query: { category: 'legal-framework', subCategory: 'policy-regulation' } }
    ]
  },
  { label: 'Investment components', query: { category: 'investment-components' } },
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


export { EXPLORE_ROUTES, EXPLORE_TABS };
