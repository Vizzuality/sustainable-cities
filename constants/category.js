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
  'affordable-housing-and-biodegradable-energy-to-waste': '#9a4d00', // Affordable housing
  'bike-sharing-scheme': '#80CED2', // Bike Sharing Scheme
  'biodegradable-energy-to-waste': '#000', // Biodegradable waste-to-energy systems
  'efficient-new-buildings': '#38638F', // Efficient New Buildings
  'bus-rapid-transit-brt': '#f7b50c', // Bus Rapid Transit (BRT)
  'low-and-zero-emission-buses': '#94CB6C', // Low And Zero Emission Buses
  'municipal-building-retrofits': '#149E56', // Building Efficiency Retrofits
  'transit-oriented-development-tod': '#F16363', // Transit-oriented Development (TOD)
  'multi-solution': '#f784bd', // multiple solutions
  cities: '#2c2f33'
};

const CATEGORY_ICONS = {
  'bike-sharing-scheme': 'icon-bike', // Bike-sharing Scheme
  'efficient-new-buildings': 'icon-buildings', // Efficient New Buildings
  'bus-rapid-transit-brt': 'icon-rapidbus', // Bus Rapid Transit (BRT)
  'low-and-zero-emission-buses': 'icon-bus', // Low And Zero Emission Buses
  'municipal-building-retrofits': 'icon-gov', // Building Efficiency Retrofits
  'transit-oriented-development-tod': 'icon-city', // Transit-oriented Development (TOD)
  'affordable-housing-and-biodegradable-energy-to-waste': 'icon-affordable',  // Affordable housing
  'biodegradable-energy-to-waste': 'icon-energy-waste' // Waste-to-energy systems
};

export {
  CATEGORY_TYPE_CONVERSION,
  CATEGORY_FIRST_LEVEL_COLORS,
  CATEGORY_SOLUTIONS_COLORS,
  CATEGORY_ICONS
};
