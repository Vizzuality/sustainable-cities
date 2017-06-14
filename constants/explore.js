
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
  { label: 'Legal framework', query: { category: 'legal-framework' } },
  { label: 'Investment components', query: { category: 'investment-components' } },
  { label: 'Cities', query: { category: 'cities' } }
];


export { EXPLORE_TABS };
