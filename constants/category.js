const CATEGORY_TYPE_CONVERSION = {
  bme: 'Bme',
  enabling: 'Enabling',
  impact: 'Impact',
  solution: 'Solution',
  timing: 'Timing'
};

const CATEGORY_FIRST_LEVEL_COLORS = {
  default: '#000000',
  'investment-components': '#f7b50c', // investment-component
  'legal-arragements': '#28bcd4', // delivery-mechanism
  'financing': '#dd7d5c', // financial-product
  'bme': '#69e191' // funding-source
};

const CATEGORY_SOLUTIONS_COLORS = {
  'bike-sharing-scheme': '#28bcd4', // bike-sharing-systems
  'efficient-new-buildings': '#ad6bb7', // new-efficient-constructions
  'bus-rapid-transit-brt': '#dd7d5c', // Transit-oriented developments
  'low-and-zero-emission-buses': '#69e191', // Low emission buses
  'municipal-building-retrofits': '#f7b50c', // Building efficiency retrofits
  'transit-oriented-development-tod': '#fabada' // A new one ^.^
};

const CATEGORY_ICONS = {
  'bike-sharing-scheme': 'icon-bike', // bike-sharing-systems
  'efficient-new-buildings': 'icon-buildings', // new-efficient-constructions
  'bus-rapid-transit-brt': 'icon-city', // Transit-oriented developments
  'low-and-zero-emission-buses': 'icon-bus', // Low emission buses
  'municipal-building-retrofits': 'icon-gov', // Building efficiency retrofits
  'transit-oriented-development-tod': 'icon-city' // A new one ^.^
};

export {
  CATEGORY_TYPE_CONVERSION,
  CATEGORY_FIRST_LEVEL_COLORS,
  CATEGORY_SOLUTIONS_COLORS,
  CATEGORY_ICONS
};
