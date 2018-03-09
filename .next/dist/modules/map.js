'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case GET_LAYER:
      return (0, _assign2.default)({}, state, {
        layer: { id: action.payload.id, data: action.payload.data }
      });
    case REMOVE_DATA_LAYER:
      return (0, _assign2.default)({}, state, { layer: initialState.layer });
    case SET_LOADING_LAYER:
      return (0, _assign2.default)({}, state, { loading: action.payload });
    case SET_ERROR_LAYER:
      return (0, _assign2.default)({}, state, { error: action.payload });
    default:
      return state;
  }
};

exports.getLayer = getLayer;
exports.removeDataLayer = removeDataLayer;

var _assign = require('next/node_modules/babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _jsonapiSerializer = require('jsonapi-serializer');

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Actions */
// setters and getters
var GET_LAYER = 'map/GET_LAYER';
var REMOVE_DATA_LAYER = 'map/REMOVE_DATA_LAYER';
// load management
var SET_LOADING_LAYER = 'map/SET_LOADING_LAYER';
// error management
var SET_ERROR_LAYER = 'map/SET_ERROR_LAYER';

/* Initial state */
var initialState = {
  layer: {
    id: null,
    data: []
  },
  error: false,
  loading: false
};

/* Reducer */


/* Action creators */
// Retrieves categories of type Solution
function getLayer() {
  var layerSpec = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var urlQuery = layerSpec.urlQuery,
      id = layerSpec.id;

  return function (dispatch, getState) {
    dispatch({ type: SET_LOADING_LAYER, payload: true });

    (0, _isomorphicFetch2.default)('' + process.env.API_URL + urlQuery, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'SC-API-KEY': process.env.SC_API_KEY
      }
    }).then(function (response) {
      if (response.ok) {
        if (getState().category.error) dispatch({ type: SET_ERROR_LAYER, payload: false });
        return response.json();
      }

      dispatch({ type: SET_ERROR_LAYER, payload: true });
      throw new Error(response.status);
    }).then(function (layerData) {
      new _jsonapiSerializer.Deserializer({ keyForAttribute: 'camelCase' }).deserialize(layerData, function (err, parsedLayerData) {
        dispatch({ type: SET_LOADING_LAYER, payload: false });
        dispatch({ type: GET_LAYER, payload: { id: id, data: parsedLayerData } });
      });
    });
  };
}

function removeDataLayer() {
  return function (dispatch) {
    dispatch({ type: REMOVE_DATA_LAYER });
  };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZXMvbWFwLmpzIl0sIm5hbWVzIjpbIkRlc2VyaWFsaXplciIsImZldGNoIiwiR0VUX0xBWUVSIiwiUkVNT1ZFX0RBVEFfTEFZRVIiLCJTRVRfTE9BRElOR19MQVlFUiIsIlNFVF9FUlJPUl9MQVlFUiIsImluaXRpYWxTdGF0ZSIsImxheWVyIiwiaWQiLCJkYXRhIiwiZXJyb3IiLCJsb2FkaW5nIiwic3RhdGUiLCJhY3Rpb24iLCJ0eXBlIiwicGF5bG9hZCIsImdldExheWVyIiwibGF5ZXJTcGVjIiwidXJsUXVlcnkiLCJkaXNwYXRjaCIsImdldFN0YXRlIiwicHJvY2VzcyIsImVudiIsIkFQSV9VUkwiLCJtZXRob2QiLCJoZWFkZXJzIiwiU0NfQVBJX0tFWSIsInRoZW4iLCJyZXNwb25zZSIsIm9rIiwiY2F0ZWdvcnkiLCJqc29uIiwiRXJyb3IiLCJzdGF0dXMiLCJsYXllckRhdGEiLCJrZXlGb3JBdHRyaWJ1dGUiLCJkZXNlcmlhbGl6ZSIsImVyciIsInBhcnNlZExheWVyRGF0YSIsInJlbW92ZURhdGFMYXllciJdLCJtYXBwaW5ncyI6Ijs7Ozs7O2tCQXVCZSxZQUF3QztNQUE5QixBQUE4Qiw0RUFBdEIsQUFBc0I7TUFBUixBQUFRLG1CQUNyRDs7VUFBUSxPQUFSLEFBQWUsQUFDYjtTQUFBLEFBQUssQUFDSDttQ0FBTyxBQUFjLElBQWQsQUFBa0I7ZUFDaEIsRUFBRSxJQUFJLE9BQUEsQUFBTyxRQUFiLEFBQXFCLElBQUksTUFBTSxPQUFBLEFBQU8sUUFEL0MsQUFBTyxBQUF5QixBQUN2QixBQUE4QyxBQUV6RDtBQUhrQyxBQUM5QixPQURLO1NBR1QsQUFBSyxBQUNIO2FBQU8sc0JBQUEsQUFBYyxJQUFkLEFBQWtCLE9BQU8sRUFBRSxPQUFPLGFBQXpDLEFBQU8sQUFBeUIsQUFBc0IsQUFDeEQ7U0FBQSxBQUFLLEFBQ0g7YUFBTyxzQkFBQSxBQUFjLElBQWQsQUFBa0IsT0FBTyxFQUFFLFNBQVMsT0FBM0MsQUFBTyxBQUF5QixBQUFrQixBQUNwRDtTQUFBLEFBQUssQUFDSDthQUFPLHNCQUFBLEFBQWMsSUFBZCxBQUFrQixPQUFPLEVBQUUsT0FBTyxPQUF6QyxBQUFPLEFBQXlCLEFBQWdCLEFBQ2xEO0FBQ0U7YUFaSixBQVlJLEFBQU8sQUFFWjs7OztRQUlNLEFBQVM7UUErQlQsQUFBUzs7Ozs7O0FBekVoQixBQUFTOztBQUNULEFBQU87Ozs7OztBQUVQO0FBQ0E7QUFDQSxJQUFNLFlBQU4sQUFBa0I7QUFDbEIsSUFBTSxvQkFBTixBQUEwQjtBQUMxQjtBQUNBLElBQU0sb0JBQU4sQUFBMEI7QUFDMUI7QUFDQSxJQUFNLGtCQUFOLEFBQXdCOztBQUV4QjtBQUNBLElBQU07O1FBQ0csQUFDRCxBQUNKO1VBSGlCLEFBQ1osQUFFQyxBQUVSO0FBSk8sQUFDTDtTQUZpQixBQUtaLEFBQ1A7V0FORixBQUFxQixBQU1WO0FBTlUsQUFDbkI7O0FBUUYsQUFDQTs7O0FBaUJBO0FBQ0EsQUFDQTtBQUFPLG9CQUFrQztNQUFoQixBQUFnQixnRkFBSixBQUFJO01BQUEsQUFDL0IsV0FEK0IsQUFDZCxVQURjLEFBQy9CO01BRCtCLEFBQ3JCLEtBRHFCLEFBQ2QsVUFEYyxBQUNyQixBQUNsQjs7U0FBTyxVQUFBLEFBQUMsVUFBRCxBQUFXLFVBQWEsQUFDN0I7YUFBUyxFQUFFLE1BQUYsQUFBUSxtQkFBbUIsU0FBcEMsQUFBUyxBQUFvQyxBQUU3Qzs7d0NBQVMsUUFBQSxBQUFRLElBQWpCLEFBQXFCLFVBQXJCLEFBQStCO2NBQVksQUFDakMsQUFDUjs7d0JBQVMsQUFDUyxBQUNoQjtzQkFBYyxRQUFBLEFBQVEsSUFKMUIsQUFBMkMsQUFFaEMsQUFFbUI7QUFGbkIsQUFDUDtBQUh1QyxBQUN6QyxPQURGLEFBT0MsS0FBSyxVQUFBLEFBQUMsVUFBYSxBQUNsQjtVQUFJLFNBQUosQUFBYSxJQUFJLEFBQ2Y7WUFBSSxXQUFBLEFBQVcsU0FBZixBQUF3QixPQUFPLFNBQVMsRUFBRSxNQUFGLEFBQVEsaUJBQWlCLFNBQWxDLEFBQVMsQUFBa0MsQUFDMUU7ZUFBTyxTQUFQLEFBQU8sQUFBUyxBQUNqQjtBQUVEOztlQUFTLEVBQUUsTUFBRixBQUFRLGlCQUFpQixTQUFsQyxBQUFTLEFBQWtDLEFBQzNDO1lBQU0sSUFBQSxBQUFJLE1BQU0sU0FBaEIsQUFBTSxBQUFtQixBQUMxQjtBQWZELE9BQUEsQUFnQkMsS0FBSyxVQUFBLEFBQUMsV0FBYyxBQUNuQjtBQUFBLEFBQUksMENBQWEsRUFBRSxpQkFBbkIsQUFBaUIsQUFBbUIsZUFBcEMsQUFDRyxZQURILEFBQ2UsV0FBVyxVQUFBLEFBQUMsS0FBRCxBQUFNLGlCQUFvQixBQUNoRDtpQkFBUyxFQUFFLE1BQUYsQUFBUSxtQkFBbUIsU0FBcEMsQUFBUyxBQUFvQyxBQUM3QztpQkFBUyxFQUFFLE1BQUYsQUFBUSxXQUFXLFNBQVMsRUFBRSxJQUFGLElBQU0sTUFBM0MsQUFBUyxBQUE0QixBQUFZLEFBQ2xEO0FBSkgsQUFLRDtBQXRCRCxBQXVCRDtBQTFCRCxBQTJCRDtBQUVEOztBQUFPLDJCQUEyQixBQUNoQztTQUFPLFVBQUEsQUFBQyxVQUFhLEFBQ25CO2FBQVMsRUFBRSxNQUFYLEFBQVMsQUFBUSxBQUNsQjtBQUZELEFBR0QiLCJmaWxlIjoibWFwLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9jbGFyYWxpbm9zL1NpdGVzL3N1c3RhaW5hYmxlLWNpdGllcyJ9