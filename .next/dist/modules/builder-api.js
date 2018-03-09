'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case GET_BME_TREE:
      return (0, _extends3.default)({}, state, { bmeCategories: action.payload });
    case GET_SOLUTION_TREE:
      return (0, _extends3.default)({}, state, { solutionCategories: action.payload });
    case GET_ENABLING_TREE:
      return (0, _extends3.default)({}, state, { enablingCategories: action.payload });
    default:
      return state;
  }
};

exports.getBmes = getBmes;
exports.getSolutions = getSolutions;
exports.getEnablings = getEnablings;

var _extends2 = require('next/node_modules/babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _jsonapiDeserializer = require('../utils/jsonapi-deserializer');

var _jsonapiDeserializer2 = _interopRequireDefault(_jsonapiDeserializer);

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _queryString = require('query-string');

var queryString = _interopRequireWildcard(_queryString);

var _helpers = require('./helpers');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GET_BME_TREE = 'builder/GET_BME_TREE';
var GET_SOLUTION_TREE = 'builder/GET_SOLUTION_TREE';
var GET_ENABLING_TREE = 'builder/GET_ENABLING_TREE';

var LOADING_BMES = 'builder/LOADING_BMES';
var LOADING_SOLUTIONS = 'builder/LOADING_SOLUTIONS';
var LOADING_ENABLINGS = 'builder/LOADING_ENABLINGS';

var ERROR_BMES = 'builder/ERROR_BMES';
var ERROR_SOLUTIONS = 'builder/ERROR_SOLUTIONS';
var ERROR_ENABLINGS = 'builder/ERROR_ENABLINGS';

var initialState = {
  solutionCategories: [],
  enablingCategories: [],
  bmeCategories: []
};

function getBmes() {
  var includeParams = ['children.children.bmes', 'children.children.bmes.enablings'];

  var queryParams = queryString.stringify({
    'filter[category-type]': 'Bme',
    'filter[level]': 1,
    'fields[categories]': 'name,slug,description,category-type,label,level,children,bmes',
    'fields[enablings]': 'assessment-value,description,is-featured,name',
    'include': includeParams.join(','),
    'page[size]': 1000
  });

  return function (dispatch, getState) {
    dispatch({ type: LOADING_BMES, payload: true });

    (0, _isomorphicFetch2.default)(process.env.API_URL + '/categories?' + queryParams, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'SC-API-KEY': process.env.SC_API_KEY
      }
    }).then(function (response) {
      if (response.ok) {
        if (getState().project.error) dispatch({ type: ERROR_BMES, payload: false });
        return response.json();
      }

      dispatch({ type: ERROR_BMES, payload: true });
      throw new Error(response.status);
    }).then(function (bmes) {
      dispatch({ type: GET_BME_TREE, payload: (0, _jsonapiDeserializer2.default)(bmes) });
    });
  };
}

function getSolutions() {
  var includeParams = ['children.children.bmes'];

  var queryParams = queryString.stringify({
    'filter[category-type]': 'Solution',
    'filter[level]': 1,
    'include': includeParams.join(','),
    'page[size]': 1000
  });

  return function (dispatch, getState) {
    dispatch({ type: LOADING_SOLUTIONS, payload: true });

    (0, _isomorphicFetch2.default)(process.env.API_URL + '/categories?' + queryParams, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'SC-API-KEY': process.env.SC_API_KEY
      }
    }).then(function (response) {
      if (response.ok) {
        if (getState().project.error) dispatch({ type: ERROR_SOLUTIONS, payload: false });
        return response.json();
      }

      dispatch({ type: ERROR_SOLUTIONS, payload: true });
      throw new Error(response.status);
    }).then(function (bmes) {
      dispatch({ type: GET_SOLUTION_TREE, payload: (0, _jsonapiDeserializer2.default)(bmes) });
    });
  };
}

function getEnablings() {
  var includeParams = ['enablings'];

  var queryParams = queryString.stringify({
    'filter[category-type]': 'Enabling',
    'filter[level]': 1,
    'include': includeParams.join(','),
    'page[size]': 1000
  });

  return function (dispatch, getState) {
    dispatch({ type: LOADING_ENABLINGS, payload: true });

    (0, _isomorphicFetch2.default)(process.env.API_URL + '/categories?' + queryParams, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'SC-API-KEY': process.env.SC_API_KEY
      }
    }).then(function (response) {
      if (response.ok) {
        if (getState().project.error) dispatch({ type: ERROR_ENABLINGS, payload: false });
        return response.json();
      }

      dispatch({ type: ERROR_ENABLINGS, payload: true });
      throw new Error(response.status);
    }).then(function (bmes) {
      dispatch({ type: GET_ENABLING_TREE, payload: (0, _jsonapiDeserializer2.default)(bmes) });
    });
  };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZXMvYnVpbGRlci1hcGkuanMiXSwibmFtZXMiOlsiZGVzZXJpYWxpemUiLCJmZXRjaCIsInF1ZXJ5U3RyaW5nIiwiYXBpUmVxdWVzdCIsIkdFVF9CTUVfVFJFRSIsIkdFVF9TT0xVVElPTl9UUkVFIiwiR0VUX0VOQUJMSU5HX1RSRUUiLCJMT0FESU5HX0JNRVMiLCJMT0FESU5HX1NPTFVUSU9OUyIsIkxPQURJTkdfRU5BQkxJTkdTIiwiRVJST1JfQk1FUyIsIkVSUk9SX1NPTFVUSU9OUyIsIkVSUk9SX0VOQUJMSU5HUyIsImluaXRpYWxTdGF0ZSIsInNvbHV0aW9uQ2F0ZWdvcmllcyIsImVuYWJsaW5nQ2F0ZWdvcmllcyIsImJtZUNhdGVnb3JpZXMiLCJzdGF0ZSIsImFjdGlvbiIsInR5cGUiLCJwYXlsb2FkIiwiZ2V0Qm1lcyIsImluY2x1ZGVQYXJhbXMiLCJxdWVyeVBhcmFtcyIsInN0cmluZ2lmeSIsImpvaW4iLCJkaXNwYXRjaCIsImdldFN0YXRlIiwicHJvY2VzcyIsImVudiIsIkFQSV9VUkwiLCJtZXRob2QiLCJoZWFkZXJzIiwiU0NfQVBJX0tFWSIsInRoZW4iLCJyZXNwb25zZSIsIm9rIiwicHJvamVjdCIsImVycm9yIiwianNvbiIsIkVycm9yIiwic3RhdHVzIiwiYm1lcyIsImdldFNvbHV0aW9ucyIsImdldEVuYWJsaW5ncyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O2tCQXlCZSxZQUF3QztNQUE5QixBQUE4Qiw0RUFBdEIsQUFBc0I7TUFBUixBQUFRLG1CQUNyRDs7VUFBUSxPQUFSLEFBQWUsQUFDYjtTQUFBLEFBQUssQUFDSDt3Q0FBQSxBQUFZLFNBQU8sZUFBZSxPQUFsQyxBQUF5QyxBQUMzQztTQUFBLEFBQUssQUFDSDt3Q0FBQSxBQUFZLFNBQU8sb0JBQW9CLE9BQXZDLEFBQThDLEFBQ2hEO1NBQUEsQUFBSyxBQUNIO3dDQUFBLEFBQVksU0FBTyxvQkFBb0IsT0FBdkMsQUFBOEMsQUFDaEQ7QUFDRTthQVJKLEFBUUksQUFBTyxBQUVa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LEFBQVMsQUFBa0MsQUFDekU7ZUFBTyxTQUFQLEFBQU8sQUFBUyxBQUNqQjtBQUVEOztlQUFTLEVBQUUsTUFBRixBQUFRLGlCQUFpQixTQUFsQyxBQUFTLEFBQWtDLEFBQzNDO1lBQU0sSUFBQSxBQUFJLE1BQU0sU0FBaEIsQUFBTSxBQUFtQixBQUMxQjtBQWZELE9BQUEsQUFnQkMsS0FBSyxVQUFBLEFBQUMsTUFBUyxBQUNkO2VBQVMsRUFBRSxNQUFGLEFBQVEsbUJBQW1CLFNBQVMsbUNBQTdDLEFBQVMsQUFBb0MsQUFBWSxBQUMxRDtBQWxCRCxBQW1CRDtBQXRCRCxBQXVCRDtBQUVEOztBQUFPLHdCQUF3QixBQUM3QjtNQUFNLGdCQUFnQixDQUF0QixBQUFzQixBQUFDLEFBRXZCOztNQUFNLDBCQUFjLEFBQVk7NkJBQVUsQUFDZixBQUN6QjtxQkFGd0MsQUFFdkIsQUFDakI7ZUFBVyxjQUFBLEFBQWMsS0FIZSxBQUc3QixBQUFtQixBQUM5QjtrQkFKRixBQUFvQixBQUFzQixBQUkxQixBQUdoQjtBQVAwQyxBQUN4QyxHQURrQjs7U0FPYixVQUFBLEFBQUMsVUFBRCxBQUFXLFVBQWEsQUFDN0I7YUFBUyxFQUFFLE1BQUYsQUFBUSxtQkFBbUIsU0FBcEMsQUFBUyxBQUFvQyxBQUU3Qzs7bUNBQVMsUUFBQSxBQUFRLElBQWpCLEFBQXFCLDJCQUFyQixBQUEyQztjQUFlLEFBQ2hELEFBQ1I7O3dCQUFTLEFBQ1MsQUFDaEI7c0JBQWMsUUFBQSxBQUFRLElBSjFCLEFBQTBELEFBRS9DLEFBRW1CO0FBRm5CLEFBQ1A7QUFIc0QsQUFDeEQsT0FERixBQU9DLEtBQUssVUFBQSxBQUFDLFVBQWEsQUFDbEI7VUFBSSxTQUFKLEFBQWEsSUFBSSxBQUNmO1lBQUksV0FBQSxBQUFXLFFBQWYsQUFBdUIsT0FBTyxTQUFTLEVBQUUsTUFBRixBQUFRLGlCQUFpQixTQUFsQyxBQUFTLEFBQWtDLEFBQ3pFO2VBQU8sU0FBUCxBQUFPLEFBQVMsQUFDakI7QUFFRDs7ZUFBUyxFQUFFLE1BQUYsQUFBUSxpQkFBaUIsU0FBbEMsQUFBUyxBQUFrQyxBQUMzQztZQUFNLElBQUEsQUFBSSxNQUFNLFNBQWhCLEFBQU0sQUFBbUIsQUFDMUI7QUFmRCxPQUFBLEFBZ0JDLEtBQUssVUFBQSxBQUFDLE1BQVMsQUFDZDtlQUFTLEVBQUUsTUFBRixBQUFRLG1CQUFtQixTQUFTLG1DQUE3QyxBQUFTLEFBQW9DLEFBQVksQUFDMUQ7QUFsQkQsQUFtQkQ7QUF0QkQsQUF1QkQiLCJmaWxlIjoiYnVpbGRlci1hcGkuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2NsYXJhbGlub3MvU2l0ZXMvc3VzdGFpbmFibGUtY2l0aWVzIn0=