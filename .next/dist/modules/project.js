'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case GET_PROJECTS:
      return (0, _assign2.default)({}, state, { list: action.payload });
    case SET_PROJECT_DETAIL:
      return (0, _assign2.default)({}, state, { detail: action.payload });
    case REMOVE_PROJECT_DETAIL:
      {
        var filters = (0, _extends3.default)({}, state.filters, { detailId: null });
        return (0, _assign2.default)({}, state, { list: [] }, { filters: filters });
      }
    case SET_LOADING_PROJECTS:
      return (0, _assign2.default)({}, state, { loading: action.payload });
    case SET_ERROR_PROJECTS:
      return (0, _assign2.default)({}, state, { error: action.payload });
    case SET_FILTERS:
      {
        var _filters = (0, _extends3.default)({}, state.filters, action.payload);
        return (0, _assign2.default)({}, state, { filters: _filters });
      }
    case RESET_FILTERS:
      {
        var _filters2 = (0, _extends3.default)({}, state.filters, initialState.filters);
        return (0, _assign2.default)({}, state, { filters: _filters2 });
      }
    default:
      return state;
  }
};

exports.getProjectsByCategory = getProjectsByCategory;
exports.getProjectDetail = getProjectDetail;
exports.setProjectFilters = setProjectFilters;
exports.resetProjectFilters = resetProjectFilters;
exports.removeProjectDetail = removeProjectDetail;

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
var GET_PROJECTS = 'project/GET_PROJECTS';
var SET_PROJECT_DETAIL = 'project/SET_PROJECT_DETAIL';
var SET_FILTERS = 'project/SET_FILTERS';
var RESET_FILTERS = 'project/RESET_FILTERS';
var REMOVE_PROJECT_DETAIL = 'project/REMOVE_PROJECT_DETAIL';

// loading and error management
var SET_LOADING_PROJECTS = 'project/SET_LOADING_PROJECTS';
var SET_ERROR_PROJECTS = 'project/SET_ERROR_PROJECTS';

/* Initial state */
var initialState = {
  list: [],
  detail: {},
  filters: {
    category: null,
    detailId: null,
    city: null
  },
  loading: false,
  error: false
};

/* Reducer */


/* Action creators */
function getProjectsByCategory() {
  var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return function (dispatch, getState) {
    dispatch({ type: SET_LOADING_PROJECTS, payload: true });
    var category = filters.category;

    var includeFields = ['projects', 'projects.photos', 'children', 'children.projects', 'children.projects.photos'];
    var categoryFields = ['name', 'slug', 'level', 'category-type', 'projects', 'children'];
    var projectFields = ['name', 'slug', 'photos'];
    var levelFilter = !category ? [2] : undefined;

    var queryParams = queryString.stringify({
      'filter[slug]': category || undefined,
      'filter[category-type]': 'Solution',
      'filter[level]': levelFilter ? levelFilter.join(',') : undefined,
      'fields[categories]': categoryFields.join(','),
      'fields[projects]': projectFields.join(','),
      include: includeFields.join(',')
    });

    (0, _isomorphicFetch2.default)(process.env.API_URL + '/categories?' + queryParams, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'SC-API-KEY': process.env.SC_API_KEY
      }
    }).then(function (response) {
      if (response.ok) {
        if (getState().project.error) dispatch({ type: SET_ERROR_PROJECTS, payload: false });
        return response.json();
      }

      dispatch({ type: SET_ERROR_PROJECTS, payload: true });
      throw new Error(response.status);
    }).then(function (projects) {
      new _jsonapiSerializer.Deserializer({ keyForAttribute: 'camelCase' }).deserialize(projects, function (err, parsedProjects) {
        dispatch({ type: SET_LOADING_PROJECTS, payload: false });
        dispatch({ type: GET_PROJECTS, payload: parsedProjects });
      });
    });
  };
}

function getProjectDetail(projectId) {
  return function (dispatch, getState) {
    dispatch({ type: SET_LOADING_PROJECTS, payload: true });

    var includeFields = ['category', 'category.parent', 'cities', 'country', 'external-sources', 'photos', 'impacts', 'impacts.category', 'project-bmes', 'project-bmes.bme', 'project-bmes.bme.categories'];

    var queryParams = queryString.stringify({
      include: includeFields.join(',')
    });

    (0, _isomorphicFetch2.default)(process.env.API_URL + '/study-cases/' + projectId + '?' + queryParams, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'SC-API-KEY': process.env.SC_API_KEY
      }
    }).then(function (response) {
      if (response.ok) {
        if (getState().project.error) dispatch({ type: SET_ERROR_PROJECTS, payload: false });
        return response.json();
      }

      dispatch({ type: SET_ERROR_PROJECTS, payload: true });
      throw new Error(response.status);
    }).then(function (project) {
      new _jsonapiSerializer.Deserializer({ keyForAttribute: 'camelCase' }).deserialize(project, function (err, parsedProject) {
        dispatch({ type: SET_LOADING_PROJECTS, payload: false });
        dispatch({ type: SET_PROJECT_DETAIL, payload: parsedProject });
      });
    });
  };
}

function setProjectFilters(filters) {
  return function (dispatch) {
    dispatch({ type: SET_FILTERS, payload: filters });
  };
}

function resetProjectFilters() {
  return function (dispatch) {
    dispatch({ type: RESET_FILTERS });
  };
}

function removeProjectDetail() {
  return function (dispatch) {
    dispatch({ type: REMOVE_PROJECT_DETAIL });
  };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZXMvcHJvamVjdC5qcyJdLCJuYW1lcyI6WyJEZXNlcmlhbGl6ZXIiLCJmZXRjaCIsInF1ZXJ5U3RyaW5nIiwiR0VUX1BST0pFQ1RTIiwiU0VUX1BST0pFQ1RfREVUQUlMIiwiU0VUX0ZJTFRFUlMiLCJSRVNFVF9GSUxURVJTIiwiUkVNT1ZFX1BST0pFQ1RfREVUQUlMIiwiU0VUX0xPQURJTkdfUFJPSkVDVFMiLCJTRVRfRVJST1JfUFJPSkVDVFMiLCJpbml0aWFsU3RhdGUiLCJsaXN0IiwiZGV0YWlsIiwiZmlsdGVycyIsImNhdGVnb3J5IiwiZGV0YWlsSWQiLCJjaXR5IiwibG9hZGluZyIsImVycm9yIiwic3RhdGUiLCJhY3Rpb24iLCJ0eXBlIiwicGF5bG9hZCIsImdldFByb2plY3RzQnlDYXRlZ29yeSIsImRpc3BhdGNoIiwiZ2V0U3RhdGUiLCJpbmNsdWRlRmllbGRzIiwiY2F0ZWdvcnlGaWVsZHMiLCJwcm9qZWN0RmllbGRzIiwibGV2ZWxGaWx0ZXIiLCJ1bmRlZmluZWQiLCJxdWVyeVBhcmFtcyIsInN0cmluZ2lmeSIsImpvaW4iLCJpbmNsdWRlIiwicHJvY2VzcyIsImVudiIsIkFQSV9VUkwiLCJtZXRob2QiLCJoZWFkZXJzIiwiU0NfQVBJX0tFWSIsInRoZW4iLCJyZXNwb25zZSIsIm9rIiwicHJvamVjdCIsImpzb24iLCJFcnJvciIsInN0YXR1cyIsInByb2plY3RzIiwia2V5Rm9yQXR0cmlidXRlIiwiZGVzZXJpYWxpemUiLCJlcnIiLCJwYXJzZWRQcm9qZWN0cyIsImdldFByb2plY3REZXRhaWwiLCJwcm9qZWN0SWQiLCJwYXJzZWRQcm9qZWN0Iiwic2V0UHJvamVjdEZpbHRlcnMiLCJyZXNldFByb2plY3RGaWx0ZXJzIiwicmVtb3ZlUHJvamVjdERldGFpbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O2tCQTZCZSxZQUF3QztNQUE5QixBQUE4Qiw0RUFBdEIsQUFBc0I7TUFBUixBQUFRLG1CQUNyRDs7VUFBUSxPQUFSLEFBQWUsQUFDYjtT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QVMsRUFBRSxNQUFGLEFBQVEsc0JBQXNCLFNBQXZDLEFBQVMsQUFBdUMsQUFDaEQ7aUJBQVMsRUFBRSxNQUFGLEFBQVEsb0JBQW9CLFNBQXJDLEFBQVMsQUFBcUMsQUFDL0M7QUFKSCxBQUtEO0FBdEJELEFBdUJEO0FBNUNELEFBNkNEO0FBRUQ7O0FBQU8sMkJBQUEsQUFBMkIsU0FBUyxBQUN6QztTQUFPLFVBQUEsQUFBQyxVQUFhLEFBQ25CO2FBQVMsRUFBRSxNQUFGLEFBQVEsYUFBYSxTQUE5QixBQUFTLEFBQThCLEFBQ3hDO0FBRkQsQUFHRDtBQUVEOztBQUFPLCtCQUErQixBQUNwQztTQUFPLFVBQUEsQUFBQyxVQUFhLEFBQ25CO2FBQVMsRUFBRSxNQUFYLEFBQVMsQUFBUSxBQUNsQjtBQUZELEFBR0Q7QUFFRDs7QUFBTywrQkFBK0IsQUFDcEM7U0FBTyxVQUFBLEFBQUMsVUFBYSxBQUNuQjthQUFTLEVBQUUsTUFBWCxBQUFTLEFBQVEsQUFDbEI7QUFGRCxBQUdEIiwiZmlsZSI6InByb2plY3QuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2NsYXJhbGlub3MvU2l0ZXMvc3VzdGFpbmFibGUtY2l0aWVzIn0=