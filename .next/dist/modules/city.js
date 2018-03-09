'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case GET_CITY:
      return (0, _assign2.default)({}, state, { list: action.payload });
    case SET_CITY_DETAIL:
      return (0, _assign2.default)({}, state, { detail: action.payload });
    case SET_CITY_BME:
      return (0, _assign2.default)({}, state, { bme: (0, _extends3.default)({}, state.bme, { list: action.payload }) });
    case SET_FILTERS:
      return (0, _assign2.default)({}, state, { filters: action.payload });
    case RESET_FILTERS:
      return (0, _assign2.default)({}, state, { filters: initialState.filters });
    case SET_LOADING_CITY:
      return (0, _assign2.default)({}, state, { loading: action.payload });
    case SET_LOADING_CITY_BME:
      return (0, _assign2.default)({}, state, { bme: (0, _extends3.default)({}, state.bme, { loading: action.payload }) });
    case SET_ERROR_CITY:
      return (0, _assign2.default)({}, state, { error: action.payload });
    case SET_ERROR_CITY_BME:
      return (0, _assign2.default)({}, state, { bme: (0, _extends3.default)({}, state.bme, { error: action.payload }) });
    default:
      return state;
  }
};

exports.getCities = getCities;
exports.getCityDetail = getCityDetail;
exports.getCityBmes = getCityBmes;
exports.setCityFilters = setCityFilters;
exports.resetCityFilters = resetCityFilters;

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
var GET_CITY = 'city/GET_CITY';
var SET_CITY_DETAIL = 'city/SET_CITY_DETAIL';
var SET_CITY_BME = 'city/SET_CITY_BME';
var SET_FILTERS = 'city/SET_FILTERS';
var RESET_FILTERS = 'city/RESET_FILTERS';
// load management
var SET_LOADING_CITY = 'city/SET_LOADING_CITY';
var SET_LOADING_CITY_BME = 'city/SET_LOADING_CITY_BME';
// error management
var SET_ERROR_CITY = 'city/SET_ERROR_CITY';
var SET_ERROR_CITY_BME = 'city/SET_ERROR_CITY_BME';

/* Initial state */
var initialState = {
  list: [],
  detail: {},
  filters: {
    detailId: null,
    tab: null
  },
  bme: {
    list: [],
    error: false,
    loading: false
  },
  error: false,
  loading: false
};

/* Reducer */


/* Action creators */
// Retrieves projects by cities
function getCities() {
  return function (dispatch, getState) {
    dispatch({ type: SET_LOADING_CITY, payload: true });

    var includeFilters = ['projects', 'photos'];

    var queryParams = queryString.stringify({
      include: includeFilters.join(','),
      'filter[contains_projects]': 'true',
      'page[size]': 1000,
      sort: 'name'
    });

    (0, _isomorphicFetch2.default)(process.env.API_URL + '/cities?' + queryParams, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'SC-API-KEY': process.env.SC_API_KEY
      }
    }).then(function (response) {
      if (response.ok) {
        if (getState().category.error) dispatch({ type: SET_ERROR_CITY, payload: false });
        return response.json();
      }

      dispatch({ type: SET_ERROR_CITY, payload: true });
      throw new Error(response.status);
    }).then(function (cityData) {
      new _jsonapiSerializer.Deserializer({ keyForAttribute: 'camelCase' }).deserialize(cityData, function (err, parsedCityData) {
        dispatch({ type: SET_LOADING_CITY, payload: false });
        dispatch({ type: GET_CITY, payload: parsedCityData });
      });
    });
  };
}

function getCityDetail(cityId) {
  return function (dispatch, getState) {
    dispatch({ type: SET_LOADING_CITY, payload: true });

    var includeFilters = ['projects', 'projects.photos'];

    var queryParams = queryString.stringify({
      include: includeFilters.join(','),
      'page[size]': 20
    });

    (0, _isomorphicFetch2.default)(process.env.API_URL + '/cities/' + cityId + '?' + queryParams, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'SC-API-KEY': process.env.SC_API_KEY
      }
    }).then(function (response) {
      if (response.ok) {
        if (getState().category.error) dispatch({ type: SET_ERROR_CITY, payload: false });
        return response.json();
      }

      dispatch({ type: SET_ERROR_CITY, payload: true });
      throw new Error(response.status);
    }).then(function (cityData) {
      new _jsonapiSerializer.Deserializer({ keyForAttribute: 'camelCase' }).deserialize(cityData, function (err, parsedCityData) {
        dispatch({ type: SET_LOADING_CITY, payload: false });
        dispatch({ type: SET_CITY_DETAIL, payload: parsedCityData });
      });
    });
  };
}

function getCityBmes(cityId) {
  return function (dispatch, getState) {
    dispatch({ type: SET_LOADING_CITY_BME, payload: true });

    var includeFilters = ['photos'];

    var queryParams = queryString.stringify({
      include: includeFilters.join(','),
      'filter[city_id]': cityId,
      'page[size]': 20
    });

    (0, _isomorphicFetch2.default)(process.env.API_URL + '/bmes?' + queryParams, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'SC-API-KEY': process.env.SC_API_KEY
      }
    }).then(function (response) {
      if (response.ok) {
        if (getState().category.error) dispatch({ type: SET_ERROR_CITY_BME, payload: false });
        return response.json();
      }

      dispatch({ type: SET_ERROR_CITY_BME, payload: true });
      throw new Error(response.status);
    }).then(function (cityBmeData) {
      new _jsonapiSerializer.Deserializer({ keyForAttribute: 'camelCase' }).deserialize(cityBmeData, function (err, parsedCityBmeData) {
        dispatch({ type: SET_LOADING_CITY_BME, payload: false });
        dispatch({ type: SET_CITY_BME, payload: parsedCityBmeData });
      });
    });
  };
}

function setCityFilters(filters) {
  return function (dispatch) {
    dispatch({ type: SET_FILTERS, payload: filters });
  };
}

function resetCityFilters() {
  return function (dispatch) {
    dispatch({ type: RESET_FILTERS });
  };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZXMvY2l0eS5qcyJdLCJuYW1lcyI6WyJEZXNlcmlhbGl6ZXIiLCJmZXRjaCIsInF1ZXJ5U3RyaW5nIiwiR0VUX0NJVFkiLCJTRVRfQ0lUWV9ERVRBSUwiLCJTRVRfQ0lUWV9CTUUiLCJTRVRfRklMVEVSUyIsIlJFU0VUX0ZJTFRFUlMiLCJTRVRfTE9BRElOR19DSVRZIiwiU0VUX0xPQURJTkdfQ0lUWV9CTUUiLCJTRVRfRVJST1JfQ0lUWSIsIlNFVF9FUlJPUl9DSVRZX0JNRSIsImluaXRpYWxTdGF0ZSIsImxpc3QiLCJkZXRhaWwiLCJmaWx0ZXJzIiwiZGV0YWlsSWQiLCJ0YWIiLCJibWUiLCJlcnJvciIsImxvYWRpbmciLCJzdGF0ZSIsImFjdGlvbiIsInR5cGUiLCJwYXlsb2FkIiwiZ2V0Q2l0aWVzIiwiZGlzcGF0Y2giLCJnZXRTdGF0ZSIsImluY2x1ZGVGaWx0ZXJzIiwicXVlcnlQYXJhbXMiLCJzdHJpbmdpZnkiLCJpbmNsdWRlIiwiam9pbiIsInNvcnQiLCJwcm9jZXNzIiwiZW52IiwiQVBJX1VSTCIsIm1ldGhvZCIsImhlYWRlcnMiLCJTQ19BUElfS0VZIiwidGhlbiIsInJlc3BvbnNlIiwib2siLCJjYXRlZ29yeSIsImpzb24iLCJFcnJvciIsInN0YXR1cyIsImNpdHlEYXRhIiwia2V5Rm9yQXR0cmlidXRlIiwiZGVzZXJpYWxpemUiLCJlcnIiLCJwYXJzZWRDaXR5RGF0YSIsImdldENpdHlEZXRhaWwiLCJjaXR5SWQiLCJnZXRDaXR5Qm1lcyIsImNpdHlCbWVEYXRhIiwicGFyc2VkQ2l0eUJtZURhdGEiLCJzZXRDaXR5RmlsdGVycyIsInJlc2V0Q2l0eUZpbHRlcnMiXSwibWFwcGluZ3MiOiI7Ozs7OztrQkFvQ2UsWUFBd0M7TUFBOUIsQUFBOEIsNEVBQXRCLEFBQXNCO01BQVIsQUFBUSxtQkFDckQ7O1VBQVEsT0FBUixBQUFlLEFBQ2I7U0FBQSxBQUFLLEFBQ0g7YUFBTyxzQkFBQSxBQUFjLElBQWQsQUFBa0IsT0FBTyxFQUFFLE1BQU0sT0FBeEMsQUFBTyxBQUF5QixBQUFlLEFBQ2pEO1NBQUEsQUFBSyxBQUNIO2FBQU8sc0JBQUEsQUFBYyxJQUFkLEFBQWtCLE9BQU8sRUFBRSxRQUFRLE9BQTFDLEFBQU8sQUFBeUIsQUFBaUIsQUFDbkQ7U0FBQSxBQUFLLEFBQ0g7YUFBTyxzQkFBQSxBQUFjLElBQWQsQUFBa0IsT0FBTyxFQUFFLGdDQUFVLE1BQVYsQUFBZ0IsT0FBSyxNQUFNLE9BQTdELEFBQU8sQUFBeUIsQUFBRSxBQUFrQyxBQUN0RTtTQUFBLEFBQUssQUFDSDthQUFPLHNCQUFBLEFBQWMsSUFBZCxBQUFrQixPQUFPLEVBQUUsU0FBUyxPQUEzQyxBQUFPLEFBQXlCLEFBQWtCLEFBQ3BEO1NBQUEsQUFBSyxBQUNIO2FBQU8sc0JBQUEsQUFBYyxJQUFkLEFBQWtCLE9BQU8sRUFBRSxTQUFTLGFBQTNDLEFBQU8sQUFBeUIsQUFBd0IsQUFDMUQ7U0FBQSxBQUFLLEFBQ0g7YUFBTyxzQkFBQSxBQUFjLElBQWQsQUFBa0IsT0FBTyxFQUFFLFNBQVMsT0FBM0MsQUFBTyxBQUF5QixBQUFrQixBQUNwRDtTQUFBLEFBQUssQUFDSDthQUFPLHNCQUFBLEFBQWMsSUFBZCxBQUFrQixPQUFPLEVBQUUsZ0NBQVUsTUFBVixBQUFnQixPQUFLLFNBQVMsT0FBaEUsQUFBTyxBQUF5QixBQUFFLEFBQXFDLEFBQ3pFO1NBQUEsQUFBSyxBQUNIO2FBQU8sc0JBQUEsQUFBYyxJQUFkLEFBQWtCLE9BQU8sRUFBRSxPQUFPLE9BQXpDLEFBQU8sQUFBeUIsQUFBZ0IsQUFDbEQ7U0FBQSxBQUFLLEFBQ0g7YUFBTyxzQkFBQSxBQUFjLElBQWQsQUFBa0IsT0FBTyxFQUFFLGdDQUFVLE1BQVYsQUFBZ0IsT0FBSyxPQUFPLE9BQTlELEFBQU8sQUFBeUIsQUFBRSxBQUFtQyxBQUN2RTtBQUNFO2FBcEJKLEFBb0JJLEFBQU8sQUFFWjs7OztRQUlNLEFBQVM7UUF1Q1QsQUFBUztRQXFDVCxBQUFTO1FBc0NULEFBQVM7UUFNVCxBQUFTOzs7Ozs7Ozs7O0FBdkxoQixBQUFTOztBQUNULEFBQU87Ozs7QUFDUCxBQUFPOztJQUFQLEFBQVk7Ozs7OztBQUVaO0FBQ0E7QUFDQSxJQUFNLFdBQU4sQUFBaUI7QUFDakIsSUFBTSxrQkFBTixBQUF3QjtBQUN4QixJQUFNLGVBQU4sQUFBcUI7QUFDckIsSUFBTSxjQUFOLEFBQW9CO0FBQ3BCLElBQU0sZ0JBQU4sQUFBc0I7QUFDdEI7QUFDQSxJQUFNLG1CQUFOLEFBQXlCO0FBQ3pCLElBQU0sdUJBQU4sQUFBNkI7QUFDN0I7QUFDQSxJQUFNLGlCQUFOLEFBQXVCO0FBQ3ZCLElBQU0scUJBQU4sQUFBMkI7O0FBRTNCO0FBQ0EsSUFBTTtRQUFlLEFBQ2IsQUFDTjtVQUZtQixBQUVYLEFBQ1I7O2NBQVMsQUFDRyxBQUNWO1NBTGlCLEFBR1YsQUFFRixBQUVQO0FBSlMsQUFDUDs7VUFHRyxBQUNHLEFBQ047V0FGRyxBQUVJLEFBQ1A7YUFWaUIsQUFPZCxBQUdNLEFBRVg7QUFMSyxBQUNIO1NBUmlCLEFBWVosQUFDUDtXQWJGLEFBQXFCLEFBYVY7QUFiVSxBQUNuQjs7QUFlRixBQUNBOzs7QUF5QkE7QUFDQSxBQUNBO0FBQU8scUJBQXFCLEFBQzFCO1NBQU8sVUFBQSxBQUFDLFVBQUQsQUFBVyxVQUFhLEFBQzdCO2FBQVMsRUFBRSxNQUFGLEFBQVEsa0JBQWtCLFNBQW5DLEFBQVMsQUFBbUMsQUFFNUM7O1FBQU0saUJBQWlCLENBQUEsQUFBQyxZQUF4QixBQUF1QixBQUFhLEFBRXBDOztRQUFNLDBCQUFjLEFBQVk7ZUFDckIsZUFBQSxBQUFlLEtBRGdCLEFBQy9CLEFBQW9CLEFBQzdCO21DQUZ3QyxBQUVYLEFBQzdCO29CQUh3QyxBQUcxQixBQUNkO1lBSkYsQUFBb0IsQUFBc0IsQUFJbEMsQUFHUjtBQVAwQyxBQUN4QyxLQURrQjs7bUNBT1gsUUFBQSxBQUFRLElBQWpCLEFBQXFCLHVCQUFyQixBQUF1QztjQUFlLEFBQzVDLEFBQ1I7O3dCQUFTLEFBQ1MsQUFDaEI7c0JBQWMsUUFBQSxBQUFRLElBSjFCLEFBQXNELEFBRTNDLEFBRW1CO0FBRm5CLEFBQ1A7QUFIa0QsQUFDcEQsT0FERixBQU9DLEtBQUssVUFBQSxBQUFDLFVBQWEsQUFDbEI7VUFBSSxTQUFKLEFBQWEsSUFBSSxBQUNmO1lBQUksV0FBQSxBQUFXLFNBQWYsQUFBd0IsT0FBTyxTQUFTLEVBQUUsTUFBRixBQUFRLGdCQUFnQixTQUFqQyxBQUFTLEFBQWlDLEFBQ3pFO2VBQU8sU0FBUCxBQUFPLEFBQVMsQUFDakI7QUFFRDs7ZUFBUyxFQUFFLE1BQUYsQUFBUSxnQkFBZ0IsU0FBakMsQUFBUyxBQUFpQyxBQUMxQztZQUFNLElBQUEsQUFBSSxNQUFNLFNBQWhCLEFBQU0sQUFBbUIsQUFDMUI7QUFmRCxPQUFBLEFBZ0JDLEtBQUssVUFBQSxBQUFDLFVBQWEsQUFDbEI7QUFBQSxBQUFJLDBDQUFhLEVBQUUsaUJBQW5CLEFBQWlCLEFBQW1CLGVBQXBDLEFBQ0csWUFESCxBQUNlLFVBQVUsVUFBQSxBQUFDLEtBQUQsQUFBTSxnQkFBbUIsQUFDOUM7aUJBQVMsRUFBRSxNQUFGLEFBQVEsa0JBQWtCLFNBQW5DLEFBQVMsQUFBbUMsQUFDNUM7aUJBQVMsRUFBRSxNQUFGLEFBQVEsVUFBVSxTQUEzQixBQUFTLEFBQTJCLEFBQ3JDO0FBSkgsQUFLRDtBQXRCRCxBQXVCRDtBQW5DRCxBQW9DRDtBQUVEOztBQUFPLHVCQUFBLEFBQXVCLFFBQVEsQUFDcEM7U0FBTyxVQUFBLEFBQUMsVUFBRCxBQUFXLFVBQWEsQUFDN0I7YUFBUyxFQUFFLE1BQUYsQUFBUSxrQkFBa0IsU0FBbkMsQUFBUyxBQUFtQyxBQUU1Qzs7UUFBTSxpQkFBaUIsQ0FBQSxBQUFDLFlBQXhCLEFBQXVCLEFBQWEsQUFFcEM7O1FBQU0sMEJBQWMsQUFBWTtlQUNyQixlQUFBLEFBQWUsS0FEZ0IsQUFDL0IsQUFBb0IsQUFDN0I7b0JBRkYsQUFBb0IsQUFBc0IsQUFFMUIsQUFHaEI7QUFMMEMsQUFDeEMsS0FEa0I7O21DQUtYLFFBQUEsQUFBUSxJQUFqQixBQUFxQix1QkFBckIsQUFBdUMsZUFBdkMsQUFBaUQ7Y0FBZSxBQUN0RCxBQUNSOzt3QkFBUyxBQUNTLEFBQ2hCO3NCQUFjLFFBQUEsQUFBUSxJQUoxQixBQUFnRSxBQUVyRCxBQUVtQjtBQUZuQixBQUNQO0FBSDRELEFBQzlELE9BREYsQUFPQyxLQUFLLFVBQUEsQUFBQyxVQUFhLEFBQ2xCO1VBQUksU0FBSixBQUFhLElBQUksQUFDZjtZQUFJLFdBQUEsQUFBVyxTQUFmLEFBQXdCLE9BQU8sU0FBUyxFQUFFLE1BQUYsQUFBUSxnQkFBZ0IsU0FBakMsQUFBUyxBQUFpQyxBQUN6RTtlQUFPLFNBQVAsQUFBTyxBQUFTLEFBQ2pCO0FBRUQ7O2VBQVMsRUFBRSxNQUFGLEFBQVEsZ0JBQWdCLFNBQWpDLEFBQVMsQUFBaUMsQUFDMUM7WUFBTSxJQUFBLEFBQUksTUFBTSxTQUFoQixBQUFNLEFBQW1CLEFBQzFCO0FBZkQsT0FBQSxBQWdCQyxLQUFLLFVBQUEsQUFBQyxVQUFhLEFBQ2xCO0FBQUEsQUFBSSwwQ0FBYSxFQUFFLGlCQUFuQixBQUFpQixBQUFtQixlQUFwQyxBQUNHLFlBREgsQUFDZSxVQUFVLFVBQUEsQUFBQyxLQUFELEFBQU0sZ0JBQW1CLEFBQzlDO2lCQUFTLEVBQUUsTUFBRixBQUFRLGtCQUFrQixTQUFuQyxBQUFTLEFBQW1DLEFBQzVDO2lCQUFTLEVBQUUsTUFBRixBQUFRLGlCQUFpQixTQUFsQyxBQUFTLEFBQWtDLEFBQzVDO0FBSkgsQUFLRDtBQXRCRCxBQXVCRDtBQWpDRCxBQWtDRDtBQUVEOztBQUFPLHFCQUFBLEFBQXFCLFFBQVEsQUFDbEM7U0FBTyxVQUFBLEFBQUMsVUFBRCxBQUFXLFVBQWEsQUFDN0I7YUFBUyxFQUFFLE1BQUYsQUFBUSxzQkFBc0IsU0FBdkMsQUFBUyxBQUF1QyxBQUVoRDs7UUFBTSxpQkFBaUIsQ0FBdkIsQUFBdUIsQUFBQyxBQUV4Qjs7UUFBTSwwQkFBYyxBQUFZO2VBQ3JCLGVBQUEsQUFBZSxLQURnQixBQUMvQixBQUFvQixBQUM3Qjt5QkFGd0MsQUFFckIsQUFDbkI7b0JBSEYsQUFBb0IsQUFBc0IsQUFHMUIsQUFHaEI7QUFOMEMsQUFDeEMsS0FEa0I7O21DQU1YLFFBQUEsQUFBUSxJQUFqQixBQUFxQixxQkFBckIsQUFBcUM7Y0FBZSxBQUMxQyxBQUNSOzt3QkFBUyxBQUNTLEFBQ2hCO3NCQUFjLFFBQUEsQUFBUSxJQUoxQixBQUFvRCxBQUV6QyxBQUVtQjtBQUZuQixBQUNQO0FBSGdELEFBQ2xELE9BREYsQUFPQyxLQUFLLFVBQUEsQUFBQyxVQUFhLEFBQ2xCO1VBQUksU0FBSixBQUFhLElBQUksQUFDZjtZQUFJLFdBQUEsQUFBVyxTQUFmLEFBQXdCLE9BQU8sU0FBUyxFQUFFLE1BQUYsQUFBUSxvQkFBb0IsU0FBckMsQUFBUyxBQUFxQyxBQUM3RTtlQUFPLFNBQVAsQUFBTyxBQUFTLEFBQ2pCO0FBRUQ7O2VBQVMsRUFBRSxNQUFGLEFBQVEsb0JBQW9CLFNBQXJDLEFBQVMsQUFBcUMsQUFDOUM7WUFBTSxJQUFBLEFBQUksTUFBTSxTQUFoQixBQUFNLEFBQW1CLEFBQzFCO0FBZkQsT0FBQSxBQWdCQyxLQUFLLFVBQUEsQUFBQyxhQUFnQixBQUNyQjtBQUFBLEFBQUksMENBQWEsRUFBRSxpQkFBbkIsQUFBaUIsQUFBbUIsZUFBcEMsQUFDRyxZQURILEFBQ2UsYUFBYSxVQUFBLEFBQUMsS0FBRCxBQUFNLG1CQUFzQixBQUNwRDtpQkFBUyxFQUFFLE1BQUYsQUFBUSxzQkFBc0IsU0FBdkMsQUFBUyxBQUF1QyxBQUNoRDtpQkFBUyxFQUFFLE1BQUYsQUFBUSxjQUFjLFNBQS9CLEFBQVMsQUFBK0IsQUFDekM7QUFKSCxBQUtEO0FBdEJELEFBdUJEO0FBbENELEFBbUNEO0FBRUQ7O0FBQU8sd0JBQUEsQUFBd0IsU0FBUyxBQUN0QztTQUFPLFVBQUEsQUFBQyxVQUFhLEFBQ25CO2FBQVMsRUFBRSxNQUFGLEFBQVEsYUFBYSxTQUE5QixBQUFTLEFBQThCLEFBQ3hDO0FBRkQsQUFHRDtBQUVEOztBQUFPLDRCQUE0QixBQUNqQztTQUFPLFVBQUEsQUFBQyxVQUFhLEFBQ25CO2FBQVMsRUFBRSxNQUFYLEFBQVMsQUFBUSxBQUNsQjtBQUZELEFBR0QiLCJmaWxlIjoiY2l0eS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvY2xhcmFsaW5vcy9TaXRlcy9zdXN0YWluYWJsZS1jaXRpZXMifQ==