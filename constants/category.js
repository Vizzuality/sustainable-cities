const CATEGORY_TYPE_CONVERSION = {
  bme: 'Bme',
  enabling: 'Enabling',
  impact: 'Impact',
  solution: 'Solution',
  timing: 'Timing'
};

const CATEGORY_FIRST_LEVEL_COLORS = {
  default: '#000000',
  'investment-component': '#f7b50c', // investment-component
  'delivery-mechanism': '#28bcd4', // delivery-mechanism
  'financial-product': '#dd7d5c', // financial-product
  'funding-source': '#69e191', // funding-source

  'investment-components': '#f7b50c', // investment-component
  'legal-arragements': '#28bcd4', // delivery-mechanism
  financing: '#dd7d5c', // financial-product
  bme: '#69e191' // funding-source
};

const CATEGORY_SOLUTIONS_COLORS = {
  'bike-sharing-systems': '#28bcd4', // Bike Sharing Systems
  'bike-sharing-scheme': '#28bcd4', // Bike Sharing Scheme
  'new-efficient-constructions': '#ad6bb7', // New efficient Constructions
  'efficient-new-buildings': '#ad6bb7', // Efficient New Buildings
  'bus-rapid-transit-brt': '#dd7d5c', // Bus Rapid Transit (BRT)
  'low-and-zero-emission-buses': '#69e191', // Low And Zero Emission Buses
  'municipal-building-retrofits': '#f7b50c', // Building Efficiency Retrofits
  'transit-oriented-development-tod': '#dd7d5c', // Transit-oriented Development (TOD)
  'multi-solution': '#2c2f33' // multiple solutions
};

const CATEGORY_ICONS = {
  'bike-sharing-systems': 'icon-bike', // bike-sharing-systems
  'new-efficient-constructions': 'icon-buildings', // new-efficient-constructions

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
