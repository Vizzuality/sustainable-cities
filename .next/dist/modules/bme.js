'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case GET_BMES:
      return (0, _assign2.default)({}, state, { list: action.payload });
    case SET_BME_DETAIL:
      return (0, _extends3.default)({}, state, { detail: action.payload });
    case SET_LOADING_BMES:
      return (0, _assign2.default)({}, state, { loading: action.payload });
    case SET_ERROR_BMES:
      return (0, _assign2.default)({}, state, { error: action.payload });
    case SET_FILTERS:
      {
        var filters = (0, _extends3.default)({}, state.filters, action.payload);
        return (0, _assign2.default)({}, state, { filters: filters });
      }
    case RESET_FILTERS:
      {
        return (0, _extends3.default)({}, state, { filters: initialState.filters });
      }
    case REMOVE_BME_DETAIL:
      {
        var _filters = (0, _extends3.default)({}, state.filters, { detailId: null });
        return (0, _assign2.default)({}, state, { list: [] }, { filters: _filters });
      }
    default:
      return state;
  }
};

exports.getBmes = getBmes;
exports.getBmeDetail = getBmeDetail;
exports.setBmeFilters = setBmeFilters;
exports.resetBmeFilters = resetBmeFilters;
exports.removeBmeDetail = removeBmeDetail;

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
var GET_BMES = 'bme/GET_BMES';
var SET_BME_DETAIL = 'bme/SET_BME_DETAIL';
var SET_FILTERS = 'bme/SET_FILTERS';
var RESET_FILTERS = 'bme/RESET_FILTERS';
var REMOVE_BME_DETAIL = 'bme/REMOVE_BME_DETAIL';

// loading and error management
var SET_LOADING_BMES = 'bme/SET_LOADING_BMES';
var SET_ERROR_BMES = 'bme/SET_ERROR_BMES';

/* Initial state */
var initialState = {
  list: [],
  detail: {},
  filters: {
    category: null,
    subCategory: null,
    detailId: null
  },
  loading: false,
  error: false
};

/* Reducer */


/* Action creators */
function getBmes() {
  var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var category = filters.category,
      subCategory = filters.subCategory;

  var includeParams = ['children', 'children.bmes', 'children.children.bmes', 'children.children.bmes.enablings'];

  var queryParams = queryString.stringify({
    'filter[slug]': subCategory || category || undefined,
    include: includeParams.join(','),
    'page[size]': 1000,
    sort: 'name'
  });

  return function (dispatch, getState) {
    dispatch({ type: SET_LOADING_BMES, payload: true });

    (0, _isomorphicFetch2.default)(process.env.API_URL + '/categories?' + queryParams, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'SC-API-KEY': process.env.SC_API_KEY
      }
    }).then(function (response) {
      if (response.ok) {
        if (getState().project.error) dispatch({ type: SET_ERROR_BMES, payload: false });
        return response.json();
      }

      dispatch({ type: SET_ERROR_BMES, payload: true });
      throw new Error(response.status);
    }).then(function (bmes) {
      new _jsonapiSerializer.Deserializer({ keyForAttribute: 'camelCase' }).deserialize(bmes, function (err, parsedBmes) {
        dispatch({ type: SET_LOADING_BMES, payload: false });
        dispatch({ type: GET_BMES, payload: parsedBmes });
      });
    });
  };
}

function getBmeDetail(filters) {
  var detailId = filters.detailId;

  var includeParams = ['enablings', 'categories', 'categories.parent', 'categories.parent.parent', 'categories.parent.parent.parent', 'projects', 'projects.cities', 'external-sources'];

  var queryParams = queryString.stringify({
    include: includeParams.join(',')
  });

  return function (dispatch, getState) {
    dispatch({ type: SET_LOADING_BMES, payload: true });

    (0, _isomorphicFetch2.default)(process.env.API_URL + '/bmes/' + detailId + '?' + queryParams, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'SC-API-KEY': process.env.SC_API_KEY
      }
    }).then(function (response) {
      if (response.ok) {
        if (getState().bme.error) dispatch({ SET_ERROR_BMES: SET_ERROR_BMES, payload: false });
        return response.json();
      }

      dispatch({ type: SET_ERROR_BMES, payload: true });
      throw new Error(response.status);
    }).then(function (bme) {
      new _jsonapiSerializer.Deserializer({ keyForAttribute: 'camelCase' }).deserialize(bme, function (err, parsedBme) {
        dispatch({ type: SET_LOADING_BMES, payload: false });
        dispatch({ type: SET_BME_DETAIL, payload: parsedBme });
      });
    });
  };
}

function setBmeFilters(filters) {
  return function (dispatch) {
    dispatch({ type: SET_FILTERS, payload: filters });
  };
}

function resetBmeFilters() {
  return function (dispatch) {
    dispatch({ type: RESET_FILTERS });
  };
}

function removeBmeDetail() {
  return function (dispatch) {
    dispatch({ type: REMOVE_BME_DETAIL });
  };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZXMvYm1lLmpzIl0sIm5hbWVzIjpbIkRlc2VyaWFsaXplciIsImZldGNoIiwicXVlcnlTdHJpbmciLCJHRVRfQk1FUyIsIlNFVF9CTUVfREVUQUlMIiwiU0VUX0ZJTFRFUlMiLCJSRVNFVF9GSUxURVJTIiwiUkVNT1ZFX0JNRV9ERVRBSUwiLCJTRVRfTE9BRElOR19CTUVTIiwiU0VUX0VSUk9SX0JNRVMiLCJpbml0aWFsU3RhdGUiLCJsaXN0IiwiZGV0YWlsIiwiZmlsdGVycyIsImNhdGVnb3J5Iiwic3ViQ2F0ZWdvcnkiLCJkZXRhaWxJZCIsImxvYWRpbmciLCJlcnJvciIsInN0YXRlIiwiYWN0aW9uIiwidHlwZSIsInBheWxvYWQiLCJnZXRCbWVzIiwiaW5jbHVkZVBhcmFtcyIsInF1ZXJ5UGFyYW1zIiwic3RyaW5naWZ5IiwidW5kZWZpbmVkIiwiaW5jbHVkZSIsImpvaW4iLCJzb3J0IiwiZGlzcGF0Y2giLCJnZXRTdGF0ZSIsInByb2Nlc3MiLCJlbnYiLCJBUElfVVJMIiwibWV0aG9kIiwiaGVhZGVycyIsIlNDX0FQSV9LRVkiLCJ0aGVuIiwicmVzcG9uc2UiLCJvayIsInByb2plY3QiLCJqc29uIiwiRXJyb3IiLCJzdGF0dXMiLCJibWVzIiwia2V5Rm9yQXR0cmlidXRlIiwiZGVzZXJpYWxpemUiLCJlcnIiLCJwYXJzZWRCbWVzIiwiZ2V0Qm1lRGV0YWlsIiwiYm1lIiwicGFyc2VkQm1lIiwic2V0Qm1lRmlsdGVycyIsInJlc2V0Qm1lRmlsdGVycyIsInJlbW92ZUJtZURldGFpbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O2tCQTZCZSxZQUF3QztNQUE5QixBQUE4Qiw0RUFBdEIsQUFBc0I7TUFBUixBQUFRLG1CQUNyRDs7VUFBUSxPQUFSLEFBQWUsQUFDYjtTQUFBLEFBQUssQUFDSDthQUFPLHNCQUFBLEFBQWMsSUFBZCxBQUFrQixPQUFPLEVBQUUsTUFBTSxPQUF4QyxBQUFPLEFBQXlCLEFBQWUsQUFDakQ7U0FBQSxBQUFLLEFBQ0g7d0NBQUEs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QyxVQUFhLEFBQ2xCO1VBQUksU0FBSixBQUFhLElBQUksQUFDZjtZQUFJLFdBQUEsQUFBVyxJQUFmLEFBQW1CLE9BQU8sU0FBUyxFQUFFLGdCQUFGLGdCQUFrQixTQUEzQixBQUFTLEFBQTJCLEFBQzlEO2VBQU8sU0FBUCxBQUFPLEFBQVMsQUFDakI7QUFFRDs7ZUFBUyxFQUFFLE1BQUYsQUFBUSxnQkFBZ0IsU0FBakMsQUFBUyxBQUFpQyxBQUMxQztZQUFNLElBQUEsQUFBSSxNQUFNLFNBQWhCLEFBQU0sQUFBbUIsQUFDMUI7QUFmRCxPQUFBLEFBZ0JDLEtBQUssVUFBQSxBQUFDLEtBQVEsQUFDYjtBQUFBLEFBQUksMENBQWEsRUFBRSxpQkFBbkIsQUFBaUIsQUFBbUIsZUFBcEMsQUFDRyxZQURILEFBQ2UsS0FBSyxVQUFBLEFBQUMsS0FBRCxBQUFNLFdBQWMsQUFDcEM7aUJBQVMsRUFBRSxNQUFGLEFBQVEsa0JBQWtCLFNBQW5DLEFBQVMsQUFBbUMsQUFDNUM7aUJBQVMsRUFBRSxNQUFGLEFBQVEsZ0JBQWdCLFNBQWpDLEFBQVMsQUFBaUMsQUFDM0M7QUFKSCxBQUtEO0FBdEJELEFBdUJEO0FBMUJELEFBMkJEO0FBRUQ7O0FBQU8sdUJBQUEsQUFBdUIsU0FBUyxBQUNyQztTQUFPLFVBQUEsQUFBQyxVQUFhLEFBQ25CO2FBQVMsRUFBRSxNQUFGLEFBQVEsYUFBYSxTQUE5QixBQUFTLEFBQThCLEFBQ3hDO0FBRkQsQUFHRDtBQUVEOztBQUFPLDJCQUEyQixBQUNoQztTQUFPLFVBQUEsQUFBQyxVQUFhLEFBQ25CO2FBQVMsRUFBRSxNQUFYLEFBQVMsQUFBUSxBQUNsQjtBQUZELEFBR0Q7QUFFRDs7QUFBTywyQkFBMkIsQUFDaEM7U0FBTyxVQUFBLEFBQUMsVUFBYSxBQUNuQjthQUFTLEVBQUUsTUFBWCxBQUFTLEFBQVEsQUFDbEI7QUFGRCxBQUdEIiwiZmlsZSI6ImJtZS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvY2xhcmFsaW5vcy9TaXRlcy9zdXN0YWluYWJsZS1jaXRpZXMifQ==