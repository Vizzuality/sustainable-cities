'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reselect = require('reselect');

var getCities = function getCities(state) {
  return state.about['city-supports'];
};
var getCategories = function getCategories(state) {
  return state.about.categories;
};
var getCitiesByCategory = function getCitiesByCategory() {
  var cities = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var categories = arguments[1];

  if (!cities.length || !categories.length) return;
  // temporary reverse, set an "order" field or similar
  // return categories.map(cat => ({
  //   ...cat,
  //   cities: cities.filter(city => city.category === cat.id)
  // }))
  // Cities is the whole object without taking appart by category
  return cities;
};

exports.default = (0, _reselect.createSelector)(getCities, getCategories, getCitiesByCategory);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlbGVjdG9ycy9jaXR5LXN1cHBvcnQuanMiXSwibmFtZXMiOlsiY3JlYXRlU2VsZWN0b3IiLCJnZXRDaXRpZXMiLCJzdGF0ZSIsImFib3V0IiwiZ2V0Q2F0ZWdvcmllcyIsImNhdGVnb3JpZXMiLCJnZXRDaXRpZXNCeUNhdGVnb3J5IiwiY2l0aWVzIiwibGVuZ3RoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxBQUFTLEFBQVQ7O0FBRUEsSUFBTSxZQUFZLFNBQVosQUFBWSxpQkFBQTtTQUFTLE1BQU0sQUFBTixNQUFZLEFBQVosQUFBVDtBQUFsQjtBQUNBLElBQU0sZ0JBQWdCLFNBQWhCLEFBQWdCLHFCQUFBO1NBQVMsTUFBTSxBQUFOLE1BQVksQUFBckI7QUFBdEI7QUFDQSxJQUFNLHNCQUFzQixTQUF0QixBQUFzQixzQkFBNkI7TUFBNUIsQUFBNEIsNkVBQW5CLEFBQW1CO01BQWYsQUFBZSx1QkFDdkQ7O01BQUcsQ0FBQyxPQUFPLEFBQVIsVUFBa0IsQ0FBQyxXQUFXLEFBQWpDLFFBQXlDLEFBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO1NBQU8sQUFBUCxBQUNEO0FBVEQsQUFXQTs7a0JBQWUsOEJBQ2IsQUFEYSxXQUViLEFBRmEsZUFHYixBQUhhLEFBQWYiLCJmaWxlIjoiY2l0eS1zdXBwb3J0LmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9jbGFyYWxpbm9zL1NpdGVzL3N1c3RhaW5hYmxlLWNpdGllcyJ9