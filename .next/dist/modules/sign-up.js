'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case SET_EMAIL:
      return (0, _assign2.default)({}, state, {});
    default:
      return state;
  }
};

exports.setEmail = setEmail;

var _stringify = require('next/node_modules/babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

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
var SET_EMAIL = 'sign-up/SET_EMAIL';

/* Initial state */
var initialState = {
  solution: {
    list: [],
    loading: false,
    error: false
  }
};

/* Reducer */


/* Action creators */

// Send email to endpoint
function setEmail(email) {
  return function (dispatch, getState) {
    // dispatch({ type: SET_EMAIL, payload: true });

    (0, _isomorphicFetch2.default)(process.env.API_URL + '/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'SC-API-KEY': process.env.SC_API_KEY
      },
      body: (0, _stringify2.default)({
        contact: {
          email: email
        }
      })
    }).then(function (response) {
      if (response.ok) {
        return response.json();
      }

      throw new Error(response.status);
    });
  };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZXMvc2lnbi11cC5qcyJdLCJuYW1lcyI6WyJEZXNlcmlhbGl6ZXIiLCJmZXRjaCIsInF1ZXJ5U3RyaW5nIiwiU0VUX0VNQUlMIiwiaW5pdGlhbFN0YXRlIiwic29sdXRpb24iLCJsaXN0IiwibG9hZGluZyIsImVycm9yIiwic3RhdGUiLCJhY3Rpb24iLCJ0eXBlIiwic2V0RW1haWwiLCJlbWFpbCIsImRpc3BhdGNoIiwiZ2V0U3RhdGUiLCJwcm9jZXNzIiwiZW52IiwiQVBJX1VSTCIsIm1ldGhvZCIsImhlYWRlcnMiLCJTQ19BUElfS0VZIiwiYm9keSIsImNvbnRhY3QiLCJ0aGVuIiwicmVzcG9uc2UiLCJvayIsImpzb24iLCJFcnJvciIsInN0YXR1cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O2tCQWtCZSxZQUF3QztNQUE5QixBQUE4Qiw0RUFBdEIsQUFBc0I7TUFBUixBQUFRLG1CQUNyRDs7VUFBUSxPQUFSLEFBQWUsQUFDYjtTQUFBLEFBQUssQUFDSDthQUFPLHNCQUFBLEFBQWMsSUFBZCxBQUFrQixPQUF6QixBQUFPLEFBQXlCLEFBQ2xDO0FBQ0U7YUFKSixBQUlJLEFBQU8sQUFFWjs7OztRQUtNLEFBQVM7Ozs7Ozs7Ozs7QUE5QmhCLEFBQVM7O0FBQ1QsQUFBTzs7OztBQUNQLEFBQU87O0lBQVAsQUFBWTs7Ozs7O0FBRVo7QUFDQTtBQUNBLElBQU0sWUFBTixBQUFrQjs7QUFFbEI7QUFDQSxJQUFNOztVQUNNLEFBQ0YsQUFDTjthQUZRLEFBRUMsQUFDVDtXQUpKLEFBQXFCLEFBQ1QsQUFHRDtBQUhDLEFBQ1I7QUFGaUIsQUFDbkI7O0FBT0YsQUFDQTs7O0FBU0E7O0FBRUEsQUFDQTtBQUFPLGtCQUFBLEFBQWtCLE9BQU8sQUFDOUI7U0FBTyxVQUFBLEFBQUMsVUFBRCxBQUFXLFVBQWEsQUFDN0I7QUFFQTs7bUNBQVMsUUFBQSxBQUFRLElBQWpCLEFBQXFCO2NBQW9CLEFBQy9CLEFBQ1I7O3dCQUFTLEFBQ1MsQUFDaEI7c0JBQWMsUUFBQSxBQUFRLElBSmUsQUFFOUIsQUFFbUIsQUFFNUI7QUFKUyxBQUNQOzs7aUJBSEosQUFBeUMsQUFNakMsQUFBZSxBQUNWO0FBQUEsQUFDUDtBQUZpQixBQUNuQixPQURJO0FBTmlDLEFBQ3ZDLE9BREYsQUFZQyxLQUFLLFVBQUEsQUFBQyxVQUFhLEFBQ2xCO1VBQUksU0FBSixBQUFhLElBQUksQUFDZjtlQUFPLFNBQVAsQUFBTyxBQUFTLEFBQ2pCO0FBRUQ7O1lBQU0sSUFBQSxBQUFJLE1BQU0sU0FBaEIsQUFBTSxBQUFtQixBQUMxQjtBQWxCRCxBQW1CRDtBQXRCRCxBQXVCRCIsImZpbGUiOiJzaWduLXVwLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9jbGFyYWxpbm9zL1NpdGVzL3N1c3RhaW5hYmxlLWNpdGllcyJ9