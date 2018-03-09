'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case GET_SOLUTION_CATEGORIES:
      return (0, _assign2.default)({}, state, { solution: (0, _extends3.default)({}, state.solution, { list: action.payload }) });
    case GET_BME_CATEGORIES:
      return (0, _assign2.default)({}, state, { bme: (0, _extends3.default)({}, state.bme, { list: action.payload }) });
    case SET_LOADING_SOLUTION:
      return (0, _assign2.default)({}, state, { solution: (0, _extends3.default)({}, state.solution, { loading: action.payload }) });
    case SET_LOADING_BME:
      return (0, _assign2.default)({}, state, { bme: (0, _extends3.default)({}, state.bme, { loading: action.payload }) });
    case SET_ERROR_SOLUTION:
      return (0, _assign2.default)({}, state, { solution: (0, _extends3.default)({}, state.solution, { error: action.payload }) });
    case SET_ERROR_BME:
      return (0, _assign2.default)({}, state, { bme: (0, _extends3.default)({}, state.bme, { error: action.payload }) });
    default:
      return state;
  }
};

exports.getSolutionCategories = getSolutionCategories;
exports.getBmeCategories = getBmeCategories;
exports.getSolutionPdfs = getSolutionPdfs;

var _extends2 = require('next/node_modules/babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _assign = require('next/node_modules/babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _jsonapiSerializer = require('jsonapi-serializer');

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _queryString = require('query-string');

var queryString = _interopRequireWildcard(_queryString);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Actions */
// setters and getters
var GET_SOLUTION_CATEGORIES = 'category/GET_SOLUTION_CATEGORIES';
var GET_BME_CATEGORIES = 'category/GET_BME_CATEGORIES';
// load management
var SET_LOADING_SOLUTION = 'category/SET_LOADING_SOLUTION';
var SET_LOADING_BME = 'category/SET_LOADING_BME';
// error management
var SET_ERROR_SOLUTION = 'category/SET_ERROR_SOLUTION';
var SET_ERROR_BME = 'category/SET_ERROR_BME';

/* Initial state */
var initialState = {
  solution: {
    list: [],
    loading: false,
    error: false
  },
  bme: {
    list: [],
    loading: false,
    error: false
  }
};

/* Reducer */


/* Action creators */

// Retrieves categories of type Solution
function getSolutionCategories() {
  return function (dispatch, getState) {
    dispatch({ type: SET_LOADING_SOLUTION, payload: true });

    var filters = {
      categoryType: 'Solution',
      level: [2]
    };
    var categoryType = filters.categoryType,
        level = filters.level;

    var includeFilters = ['children'];
    var categoriesFields = ['name', 'slug', 'category-type'];

    var queryParams = queryString.stringify({
      'filter[category-type]': categoryType,
      'filter[level]': level.join(','),
      'fields[categories]': categoriesFields.join(','),
      include: includeFilters.join(','),
      'page[size]': 999,
      sort: 'name'
    });

    (0, _isomorphicFetch2.default)(process.env.API_URL + '/categories?' + queryParams, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'SC-API-KEY': process.env.SC_API_KEY
      }
    }).then(function (response) {
      if (response.ok) {
        if (getState().category.error) dispatch({ type: SET_ERROR_SOLUTION, payload: false });
        return response.json();
      }

      dispatch({ type: SET_ERROR_SOLUTION, payload: true });
      throw new Error(response.status);
    }).then(function (categories) {
      new _jsonapiSerializer.Deserializer().deserialize(categories, function (err, parsedCategories) {
        dispatch({ type: SET_LOADING_SOLUTION, payload: false });
        dispatch({ type: GET_SOLUTION_CATEGORIES, payload: parsedCategories });
      });
    });
  };
}

// Retrieves categories of type Bme
function getBmeCategories() {
  return function (dispatch, getState) {
    dispatch({ type: SET_LOADING_BME, payload: true });

    var filters = {
      categoryType: 'Bme',
      level: [1]
    };
    var categoryType = filters.categoryType,
        level = filters.level;

    var includeFilters = ['children', 'children.children'];
    var categoriesFields = ['name', 'slug', 'children', 'category-type', 'label', 'description'];

    var queryParams = queryString.stringify({
      'filter[category-type]': categoryType,
      'filter[level]': level.join(','),
      'fields[categories]': categoriesFields.join(','),
      include: includeFilters.join(','),
      sort: 'order',
      'page[size]': 999
    });

    (0, _isomorphicFetch2.default)(process.env.API_URL + '/categories?' + queryParams, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'SC-API-KEY': process.env.SC_API_KEY
      }
    }).then(function (response) {
      if (response.ok) {
        if (getState().category.error) dispatch({ type: SET_ERROR_BME, payload: false });
        return response.json();
      }

      dispatch({ type: SET_ERROR_BME, payload: true });
      throw new Error(response.status);
    }).then(function (categories) {
      new _jsonapiSerializer.Deserializer().deserialize(categories, function (err, parsedCategories) {
        dispatch({ type: SET_LOADING_BME, payload: false });
        dispatch({ type: GET_BME_CATEGORIES, payload: parsedCategories });
      });
    });
  };
}

function getSolutionPdfs() {
  return function (dispatch, getState) {
    dispatch({ type: SET_LOADING_SOLUTION, payload: true });

    var includeFilters = ['document'];
    var fields = ['name', 'slug', 'description', 'document'];

    var queryParams = queryString.stringify({
      'filter[category-type]': 'Solution',
      'filter[level]': 2,
      'fields[categories]': fields.join(','),
      include: includeFilters.join(','),
      'page[size]': 999
    });

    (0, _isomorphicFetch2.default)(process.env.API_URL + '/categories?' + queryParams, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'SC-API-KEY': process.env.SC_API_KEY
      }
    }).then(function (response) {
      if (response.ok) {
        if (getState().category.error) dispatch({ type: SET_ERROR_SOLUTION, payload: false });
        return response.json();
      }

      dispatch({ type: SET_ERROR_SOLUTION, payload: true });
      throw new Error(response.status);
    }).then(function (solutions) {
      new _jsonapiSerializer.Deserializer().deserialize(solutions, function (err, parsedSolutions) {
        dispatch({ type: SET_LOADING_SOLUTION, payload: false });
        dispatch({ type: GET_SOLUTION_CATEGORIES, payload: parsedSolutions });
      });
    });
  };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZXMvY2F0ZWdvcnkuanMiXSwibmFtZXMiOlsiRGVzZXJpYWxpemVyIiwiZmV0Y2giLCJxdWVyeVN0cmluZyIsIkdFVF9TT0xVVElPTl9DQVRFR09SSUVTIiwiR0VUX0JNRV9DQVRFR09SSUVTIiwiU0VUX0xPQURJTkdfU09MVVRJT04iLCJTRVRfTE9BRElOR19CTUUiLCJTRVRfRVJST1JfU09MVVRJT04iLCJTRVRfRVJST1JfQk1FIiwiaW5pdGlhbFN0YXRlIiwic29sdXRpb24iLCJsaXN0IiwibG9hZGluZyIsImVycm9yIiwiYm1lIiwic3RhdGUiLCJhY3Rpb24iLCJ0eXBlIiwicGF5bG9hZCIsImdldFNvbHV0aW9uQ2F0ZWdvcmllcyIsImRpc3BhdGNoIiwiZ2V0U3RhdGUiLCJmaWx0ZXJzIiwiY2F0ZWdvcnlUeXBlIiwibGV2ZWwiLCJpbmNsdWRlRmlsdGVycyIsImNhdGVnb3JpZXNGaWVsZHMiLCJxdWVyeVBhcmFtcyIsInN0cmluZ2lmeSIsImpvaW4iLCJpbmNsdWRlIiwic29ydCIsInByb2Nlc3MiLCJlbnYiLCJBUElfVVJMIiwibWV0aG9kIiwiaGVhZGVycyIsIlNDX0FQSV9LRVkiLCJ0aGVuIiwicmVzcG9uc2UiLCJvayIsImNhdGVnb3J5IiwianNvbiIsIkVycm9yIiwic3RhdHVzIiwiY2F0ZWdvcmllcyIsImRlc2VyaWFsaXplIiwiZXJyIiwicGFyc2VkQ2F0ZWdvcmllcyIsImdldEJtZUNhdGVnb3JpZXMiLCJnZXRTb2x1dGlvblBkZnMiLCJmaWVsZHMiLCJzb2x1dGlvbnMiLCJwYXJzZWRTb2x1dGlvbnMiXSwibWFwcGluZ3MiOiI7Ozs7OztrQkE4QmUsWUFBd0M7TUFBOUIsQUFBOEIsNEVBQXRCLEFBQXNCO01BQVIsQUFBUSxtQkFDckQ7O1VBQVEsT0FBUixBQUFlLEFBQ2I7U0FBQSxBQUFLLEFBQ0g7YUFBTyxzQkFBQSxBQUFjLElBQWQsQUFBa0IsT0FBTyxFQUFFLHFDQUFlLE1BQWYsQUFBcUIsWUFBVSxNQUFNLE9BQXZFLEFB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