'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case GET_ABOUT_DATA:
      {
        var _extends2;

        var _action$payload = action.payload,
            list = _action$payload.list,
            _action$payload$categ = _action$payload.categories,
            categories = _action$payload$categ === undefined ? [] : _action$payload$categ,
            type = _action$payload.type;

        return (0, _extends4.default)({}, state, (_extends2 = {}, (0, _defineProperty3.default)(_extends2, type, list), (0, _defineProperty3.default)(_extends2, 'categories', categories), _extends2));
      }
    case SET_LOADING_ABOUT:
      return (0, _assign2.default)({}, state, { loading: action.payload });
    case SET_ERROR_ABOUT:
      return (0, _assign2.default)({}, state, { error: action.payload });
    case RESET_DATA:
      {
        return (0, _extends4.default)({}, state, { list: initialState.list });
      }
    default:
      return state;
  }
};

exports.getDataAbout = getDataAbout;
exports.resetData = resetData;

var _assign = require('next/node_modules/babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _defineProperty2 = require('next/node_modules/babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('next/node_modules/babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

var _jsonapiSerializer = require('jsonapi-serializer');

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _queryString = require('query-string');

var queryString = _interopRequireWildcard(_queryString);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Actions */
var GET_ABOUT_DATA = 'about/GET_ABOUT_DATA';
var RESET_DATA = 'about/RESET_DATA';

// loading and error management
var SET_LOADING_ABOUT = 'bme/SET_LOADING_ABOUT';
var SET_ERROR_ABOUT = 'bme/SET_ERROR_ABOUT';

/* Initial state */
var initialState = {
  categories: [], // for city-support
  loading: false,
  error: false
};

var getCategories = function getCategories(included) {
  var categories = included.filter(function (inc) {
    return inc.type === 'city-support-categories';
  }) || [];
  return (categories || []).map(function (cat) {
    return {
      id: cat.id,
      title: cat.attributes.title
    };
  });
};

/* Reducer */


/* Action creators */
function getDataAbout(type) {
  var include = ['photos'];
  var isCitySupport = type === 'city-supports';

  if (isCitySupport) include.push('city-support-category');

  var queryParams = queryString.stringify({
    include: include.join(','),
    'page[size]': 1000
  });

  return function (dispatch, getState) {
    dispatch({ type: SET_LOADING_ABOUT, payload: true });

    (0, _isomorphicFetch2.default)(process.env.API_URL + '/' + type + '?' + queryParams, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'SC-API-KEY': process.env.SC_API_KEY
      }
    }).then(function (response) {
      if (response.ok) {
        if (getState().project.error) dispatch({ type: SET_ERROR_ABOUT, payload: false });
        return response.json();
      }

      dispatch({ type: SET_ERROR_ABOUT, payload: true });
      throw new Error(response.status);
    }).then(function (_ref) {
      var data = _ref.data,
          included = _ref.included;

      new _jsonapiSerializer.Deserializer({ keyForAttribute: 'camelCase' }).deserialize((0, _extends4.default)({}, { data: data, included: included }), function (err) {
        var parsedData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

        dispatch({ type: SET_LOADING_ABOUT, payload: false });
        dispatch({
          type: GET_ABOUT_DATA,
          payload: {
            type: type,
            list: parsedData.map(function (d) {
              return (0, _extends4.default)({}, d, { date: (0, _moment2.default)(d.date).format('MMMM D, YYYY') }, d.photos[0] && { image: '' + process.env.API_URL + d.photos[0].attachment.url }, isCitySupport && { category: (d.citySupportCategory || {}).id });
            }),
            categories: getCategories(included)
          }
        });
      });
    });
  };
}

function resetData() {
  return function (dispatch) {
    dispatch({ type: RESET_DATA });
  };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZXMvYWJvdXQuanMiXSwibmFtZXMiOlsiRGVzZXJpYWxpemVyIiwiZmV0Y2giLCJxdWVyeVN0cmluZyIsIm1vbWVudCIsIkdFVF9BQk9VVF9EQVRBIiwiUkVTRVRfREFUQSIsIlNFVF9MT0FESU5HX0FCT1VUIiwiU0VUX0VSUk9SX0FCT1VUIiwiaW5pdGlhbFN0YXRlIiwiY2F0ZWdvcmllcyIsImxvYWRpbmciLCJlcnJvciIsImdldENhdGVnb3JpZXMiLCJpbmNsdWRlZCIsImZpbHRlciIsImluYyIsInR5cGUiLCJtYXAiLCJpZCIsImNhdCIsInRpdGxlIiwiYXR0cmlidXRlcyIsInN0YXRlIiwiYWN0aW9uIiwicGF5bG9hZCIsImxpc3QiLCJnZXREYXRhQWJvdXQiLCJpbmNsdWRlIiwiaXNDaXR5U3VwcG9ydCIsInB1c2giLCJxdWVyeVBhcmFtcyIsInN0cmluZ2lmeSIsImpvaW4iLCJkaXNwYXRjaCIsImdldFN0YXRlIiwicHJvY2VzcyIsImVudiIsIkFQSV9VUkwiLCJtZXRob2QiLCJoZWFkZXJzIiwiU0NfQVBJX0tFWSIsInRoZW4iLCJyZXNwb25zZSIsIm9rIiwicHJvamVjdCIsImpzb24iLCJFcnJvciIsInN0YXR1cyIsImRhdGEiLCJrZXlGb3JBdHRyaWJ1dGUiLCJkZXNlcmlhbGl6ZSIsImVyciIsInBhcnNlZERhdGEiLCJkIiwiZGF0ZSIsImZvcm1hdCIsInBob3RvcyIsImltYWdlIiwiYXR0YWNobWVudCIsInVybCIsImNhdGVnb3J5IiwiY2l0eVN1cHBvcnRDYXRlZ29yeSIsInJlc2V0RGF0YSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O2tCQTZCZSxZQUF3QztNQUE5QixBQUE4Qiw0RUFBdEIsQUFBc0I7TUFBUixBQUFRLG1CQUNyRDs7VUFBUSxPQUFSLEFBQWUsQUFDYjtTQUFBLEFBQUssQUFBZ0I7QUFBQTtZQUFBOzs4QkFDcUIsT0FEckIsQUFDNEI7WUFENUIsQUFDWCx1QkFEVyxBQUNYO29EQURXLEFBQ0w7WUFESyxBQUNMLG1EQURL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LEFBQ21CLE1BQUksTUFEdkIsTUFDNkIsVUFEN0IsYUFDeUMsVUFBQSxBQUFDLEtBQXlCO1lBQXBCLEFBQW9CLGlGQUFQLEFBQU8sQUFDL0Q7O2lCQUFTLEVBQUUsTUFBRixBQUFRLG1CQUFtQixTQUFwQyxBQUFTLEFBQW9DLEFBQzdDOztnQkFBUyxBQUNELEFBQ047O2tCQUFTLEFBRVA7NkJBQU0sQUFBVyxJQUFJLGFBQUE7Z0RBQUEsQUFDaEIsR0FDQSxFQUFFLE1BQU0sc0JBQU8sRUFBUCxBQUFTLE1BQVQsQUFBZSxPQUZQLEFBRWhCLEFBQVEsQUFBc0IsbUJBQzlCLEVBQUEsQUFBRSxPQUFGLEFBQVMsTUFBTSxFQUFFLFlBQVUsUUFBQSxBQUFRLElBQWxCLEFBQXNCLFVBQVUsRUFBQSxBQUFFLE9BQUYsQUFBUyxHQUFULEFBQVksV0FIN0MsQUFHRCxBQUF5RCxPQUN4RSxpQkFBaUIsRUFBRSxVQUFVLENBQUMsRUFBQSxBQUFFLHVCQUFILEFBQTBCLElBSnZDLEFBSUMsQUFBMEM7QUFOekQsQUFFRCxBQU1OLGFBTk07d0JBTU0sY0FWaEIsQUFBUyxBQUVFLEFBUUssQUFBYyxBQUcvQjtBQVhZLEFBQ1A7QUFISyxBQUNQO0FBSk4sQUFpQkQ7QUFsQ0QsQUFtQ0Q7QUF0Q0QsQUF1Q0Q7QUFFRDs7QUFBTyxxQkFBcUIsQUFDMUI7U0FBTyxVQUFBLEFBQUMsVUFBYSxBQUNuQjthQUFTLEVBQUUsTUFBWCxBQUFTLEFBQVEsQUFDbEI7QUFGRCxBQUdEIiwiZmlsZSI6ImFib3V0LmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9jbGFyYWxpbm9zL1NpdGVzL3N1c3RhaW5hYmxlLWNpdGllcyJ9