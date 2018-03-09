'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var CATEGORY_TYPE_CONVERSION = {
  bme: 'Bme',
  enabling: 'Enabling',
  impact: 'Impact',
  solution: 'Solution',
  timing: 'Timing'
};

var CATEGORY_FIRST_LEVEL_COLORS = {
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

var CATEGORY_SOLUTIONS_COLORS = {
  'bike-sharing-scheme': '#80CED2', // Bike Sharing Scheme
  'efficient-new-buildings': '#38638F', // Efficient New Buildings
  'bus-rapid-transit-brt': '#f7b50c', // Bus Rapid Transit (BRT)
  'low-and-zero-emission-buses': '#94CB6C', // Low And Zero Emission Buses
  'municipal-building-retrofits': '#149E56', // Building Efficiency Retrofits
  'transit-oriented-development-tod': '#F16363', // Transit-oriented Development (TOD)
  'multi-solution': '#f784bd', // multiple solutions
  cities: '#2c2f33'
};

var CATEGORY_ICONS = {
  'bike-sharing-scheme': 'icon-bike', // Bike-sharing Scheme
  'efficient-new-buildings': 'icon-buildings', // Efficient New Buildings
  'bus-rapid-transit-brt': 'icon-rapidbus', // Bus Rapid Transit (BRT)
  'low-and-zero-emission-buses': 'icon-bus', // Low And Zero Emission Buses
  'municipal-building-retrofits': 'icon-gov', // Building Efficiency Retrofits
  'transit-oriented-development-tod': 'icon-city' // Transit-oriented Development (TOD)
};

exports.CATEGORY_TYPE_CONVERSION = CATEGORY_TYPE_CONVERSION;
exports.CATEGORY_FIRST_LEVEL_COLORS = CATEGORY_FIRST_LEVEL_COLORS;
exports.CATEGORY_SOLUTIONS_COLORS = CATEGORY_SOLUTIONS_COLORS;
exports.CATEGORY_ICONS = CATEGORY_ICONS;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnN0YW50cy9jYXRlZ29yeS5qcyJdLCJuYW1lcyI6WyJDQVRFR09SWV9UWVBFX0NPTlZFUlNJT04iLCJibWUiLCJlbmFibGluZyIsImltcGFjdCIsInNvbHV0aW9uIiwidGltaW5nIiwiQ0FURUdPUllfRklSU1RfTEVWRUxfQ09MT1JTIiwiZGVmYXVsdCIsImZpbmFuY2luZyIsIkNBVEVHT1JZX1NPTFVUSU9OU19DT0xPUlMiLCJjaXRpZXMiLCJDQVRFR09SWV9JQ09OUyJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxJQUFNO09BQTJCLEFBQzFCLEFBQ0w7WUFGK0IsQUFFckIsQUFDVjtVQUgrQixBQUd2QixBQUNSO1lBSitCLEFBSXJCLEFBQ1Y7VUFMRixBQUFpQyxBQUt2QjtBQUx1QixBQUMvQjs7QUFPRixJQUFNO1dBQThCLEFBQ3pCLEFBQ1Q7MEJBRmtDLEFBRVYsV0FBVyxBQUNuQzt3QkFIa0MsQUFHWixXQUFXLEFBQ2pDO3VCQUprQyxBQUliLFdBQVcsQUFDaEM7b0JBTGtDLEFBS2hCLFdBQVcsQUFFN0I7OzJCQVBrQyxBQU9ULFdBQVcsQUFDcEM7dUJBUmtDLEFBUWIsV0FBVyxBQUNoQzthQVRrQyxBQVN2QixXQUFXLEFBQ3RCO09BVmtDLEFBVTdCLFVBVlAsQUFBb0MsQUFVbkI7QUFWbUIsQUFDbEM7O0FBWUYsSUFBTTt5QkFBNEIsQUFDVCxXQUFXLEFBQ2xDOzZCQUZnQyxBQUVMLFdBQVcsQUFDdEM7MkJBSGdDLEFBR1AsV0FBVyxBQUNwQztpQ0FKZ0MsQUFJRCxXQUFXLEFBQzFDO2tDQUxnQyxBQUtBLFdBQVcsQUFDM0M7c0NBTmdDLEFBTUksV0FBVyxBQUMvQztvQkFQZ0MsQUFPZCxXQUFXLEFBQzdCO1VBUkYsQUFBa0MsQUFReEI7QUFSd0IsQUFDaEM7O0FBVUYsSUFBTTt5QkFBaUIsQUFDRSxhQUFhLEFBQ3BDOzZCQUZxQixBQUVNLGtCQUFrQixBQUM3QzsyQkFIcUIsQUFHSSxpQkFBaUIsQUFDMUM7aUNBSnFCLEFBSVUsWUFBWSxBQUMzQztrQ0FMcUIsQUFLVyxZQUFZLEFBQzVDO3NDQU5xQixBQU1lLFlBTnRDLEFBQXVCLEFBTTJCLEFBR2xEO0FBVHVCLEFBQ3JCOztRQVFGLEFBQ0U7UUFERixBQUVFO1FBRkYsQUFHRTtRQUhGLEFBSUUiLCJmaWxlIjoiY2F0ZWdvcnkuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2NsYXJhbGlub3MvU2l0ZXMvc3VzdGFpbmFibGUtY2l0aWVzIn0=