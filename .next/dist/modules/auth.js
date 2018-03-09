'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clearErrors = undefined;

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case LOGIN_LOADING:
      return (0, _extends3.default)({}, state, { loading: true, errors: [], token: null });

    case LOGIN_ERROR:
      return (0, _extends3.default)({}, state, { loading: false, errors: action.errors });

    case SIGNUP_ERROR:
      return (0, _extends3.default)({}, state, { loading: false, signupErrors: action.errors });

    case LOGIN:
      return (0, _extends3.default)({}, state, { loading: false, token: action.token });

    case CLEAR_ERRORS:
      return (0, _extends3.default)({}, state, { errors: [], signupErrors: [] });

    case GET_PROFILE:
      return (0, _extends3.default)({}, state, { profile: action.payload });

    case GET_SAVED_PROJECTS:
      return (0, _assign2.default)({}, state, { profile: (0, _extends3.default)({}, state.profile, { savedProjects: action.payload
        }) });
    default:
      return state;
  }
};

exports.getProfile = getProfile;
exports.getSavedProjects = getSavedProjects;
exports.deleteSavedProject = deleteSavedProject;
exports.login = login;
exports.register = register;
exports.saveProfile = saveProfile;
exports.logout = logout;

var _promise = require('next/node_modules/babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _stringify = require('next/node_modules/babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _assign = require('next/node_modules/babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _extends2 = require('next/node_modules/babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _jsonapiSerializer = require('jsonapi-serializer');

var _jwtDecode = require('jwt-decode');

var _jwtDecode2 = _interopRequireDefault(_jwtDecode);

var _queryString = require('query-string');

var queryString = _interopRequireWildcard(_queryString);

var _helpers = require('./helpers');

var _routes = require('../routes');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LOGIN = 'auth/LOGIN';
var LOGIN_LOADING = 'auth/LOGIN_LOADING';
var LOGIN_ERROR = 'auth/LOGIN_ERROR';

var SIGNUP = 'auth/SIGNUP';
var SIGNUP_LOADING = 'auth/SIGNUP_LOADING';
var SIGNUP_ERROR = 'auth/SIGNUP_ERROR';

var CLEAR_ERRORS = 'auth/CLEAR_ERRORS';

var GET_PROFILE = 'auth/GET_PROFILE';
var GET_SAVED_PROJECTS = 'auth/GET_SAVED_PROJECTS';

var initialState = {
  token: null,
  errors: [],
  signupErrors: [],
  loading: false,
  profile: {}
};

function getProfile(token) {
  return function (dispatch) {
    (0, _helpers.apiRequest)('users/' + (0, _jwtDecode2.default)(token).user, { method: 'GET' }).then(function (response) {
      return response.json();
    }).then(function (data) {
      new _jsonapiSerializer.Deserializer().deserialize(data, function (err, parsed) {
        dispatch({ type: GET_PROFILE, payload: parsed });
      });
    });
  };
}

function getSavedProjects(token) {
  return function (dispatch) {
    var includeFields = ['solution', 'business-model-bmes', 'bmes', 'business-model-bmes.comment', 'business-model-enablings', 'business-model-enablings.enabling', 'owner', 'business-model-users', 'business-model-users.user'];

    var queryParams = queryString.stringify({
      include: includeFields.join(',')
    });
    (0, _helpers.apiRequest)('/business-models?' + queryParams, { mehtod: 'GET',
      headers: {
        Authorization: 'Bearer ' + token
      }
    }).then(function (response) {
      return response.json();
    }).then(function (data) {
      new _jsonapiSerializer.Deserializer().deserialize(data, function (err, parsed) {
        dispatch({ type: GET_SAVED_PROJECTS, payload: parsed });
      });
    });
  };
}

function deleteSavedProject(token, projectId) {
  return function (dispatch) {
    (0, _helpers.apiRequest)('business-models/' + projectId, { method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + token
      }
    }).then(function () {
      dispatch(getSavedProjects(token));
    });
  };
}

function login(email, password) {
  return function (dispatch) {
    dispatch({ type: LOGIN_LOADING });

    return (0, _helpers.apiRequest)('login', {
      method: 'POST',
      body: (0, _stringify2.default)({ auth: { email: email, password: password } })
    }).then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          dispatch(getProfile(data.token));
          dispatch({ type: LOGIN, token: data.token });
        });
      } else {
        response.json().then(function (data) {
          return dispatch({ type: LOGIN_ERROR, errors: data.errors });
        });
      }

      return _promise2.default.resolve(response.ok);
    });
  };
}

function register(name, nickname, email, password, passwordConfirmation) {
  return function (dispatch) {
    dispatch({ type: SIGNUP_LOADING });

    return (0, _helpers.apiRequest)('register', {
      method: 'POST',
      body: (0, _stringify2.default)({
        user: { name: name, nickname: nickname, email: email, password: password, password_confirmation: passwordConfirmation } })
    }).then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          dispatch(getProfile(data.token));
          dispatch({ type: SIGNUP, token: data.token });
        });
      } else {
        response.json().then(function (data) {
          return dispatch({ type: SIGNUP_ERROR, errors: data.errors });
        });
      }

      return _promise2.default.resolve(response.ok);
    });
  };
}

function saveProfile(token, params) {
  return function (dispatch) {
    return (0, _helpers.apiRequest)('users/' + (0, _jwtDecode2.default)(token).user, {
      method: 'PATCH',
      body: (0, _stringify2.default)({ user: params }),
      headers: {
        Authorization: 'Bearer ' + token
      }
    }).then(function (response) {
      return response.json();
    }).then(function (data) {
      getProfile(token)(dispatch);

      return data;
    });
  };
}

function logout() {
  return function (dispatch) {
    dispatch({ type: LOGIN, payload: { token: null } });
    dispatch({ type: GET_PROFILE, payload: {} });
    // redirects to homepage once user is logged out
    _routes.Router.pushRoute('/');
  };
}

var clearErrors = exports.clearErrors = function clearErrors() {
  return { type: CLEAR_ERRORS };
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZXMvYXV0aC5qcyJdLCJuYW1lcyI6WyJEZXNlcmlhbGl6ZXIiLCJqd3REZWNvZGUiLCJxdWVyeVN0cmluZyIsImFwaVJlcXVlc3QiLCJSb3V0ZXIiLCJMT0dJTiIsIkxPR0lOX0xPQURJTkciLCJMT0dJTl9FUlJPUiIsIlNJR05VUCIsIlNJR05VUF9MT0FESU5HIiwiU0lHTlVQX0VSUk9SIiwiQ0xFQVJfRVJST1JTIiwiR0VUX1BST0ZJTEUiLCJHRVRfU0FWRURfUFJPSkVDVFMiLCJpbml0aWFsU3RhdGUiLCJ0b2tlbiIsImVycm9ycyIsInNpZ251cEVycm9ycyIsImxvYWRpbmciLCJwcm9maWxlIiwic3RhdGUiLCJhY3Rpb24iLCJ0eXBlIiwicGF5bG9hZCIsInNhdmVkUHJvamVjdHMiLCJnZXRQcm9maWxlIiwiZGlzcGF0Y2giLCJ1c2VyIiwibWV0aG9kIiwidGhlbiIsInJlc3BvbnNlIiwianNvbiIsImRhdGEiLCJkZXNlcmlhbGl6ZSIsImVyciIsInBhcnNlZCIsImdldFNhdmVkUHJvamVjdHMiLCJpbmNsdWRlRmllbGRzIiwicXVlcnlQYXJhbXMiLCJzdHJpbmdpZnkiLCJpbmNsdWRlIiwiam9pbiIsIm1laHRvZCIsImhlYWRlcnMiLCJBdXRob3JpemF0aW9uIiwiZGVsZXRlU2F2ZWRQcm9qZWN0IiwicHJvamVjdElkIiwibG9naW4iLCJlbWFpbCIsInBhc3N3b3JkIiwiYm9keSIsImF1dGgiLCJvayIsInJlc29sdmUiLCJyZWdpc3RlciIsIm5hbWUiLCJuaWNrbmFtZSIsInBhc3N3b3JkQ29uZmlybWF0aW9uIiwicGFzc3dvcmRfY29uZmlybWF0aW9uIiwic2F2ZVByb2ZpbGUiLCJwYXJhbXMiLCJsb2dvdXQiLCJwdXNoUm91dGUiLCJjbGVhckVycm9ycyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztrQkEyQmUsWUFBd0M7TUFBOUIsQUFBOEIsNEVBQXRCLEFBQXNCO01BQVIsQUFBUSxtQkFDckQ7O1VBQVEsT0FBUixBQUFlLEFBQ2I7U0FBQSxB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RVEsQUFBZSxBQUFRLEFBQzdCOzttQ0FMSixBQUVFLEFBR1csQUFDa0I7QUFEbEIsQUFDUDtBQUpKLEFBQ0UsS0FISixFQUFBLEFBU0UsS0FDQSxvQkFBQTthQUFZLFNBQVosQUFBWSxBQUFTO0FBVnZCLE9BQUEsQUFXRSxLQUFLLFVBQUEsQUFBQyxNQUFTLEFBQ2Y7aUJBQUEsQUFBVyxPQUFYLEFBQWtCLEFBRWxCOzthQUFBLEFBQU8sQUFDUjtBQWhCSSxBQUNMO0FBREYsQUFrQkQ7QUFFRDs7QUFBTyxrQkFBa0IsQUFDdkI7U0FBTyxVQUFBLEFBQUMsVUFBYSxBQUNuQjthQUFTLEVBQUUsTUFBRixBQUFRLE9BQU8sU0FBUyxFQUFFLE9BQW5DLEFBQVMsQUFBd0IsQUFBUyxBQUMxQzthQUFTLEVBQUUsTUFBRixBQUFRLGFBQWEsU0FBOUIsQUFBUyxBQUE4QixBQUN2QztBQUNBO21CQUFBLEFBQU8sVUFBUCxBQUFpQixBQUNsQjtBQUxELEFBTUQ7QUFFRDs7QUFBTyxJQUFNLG9DQUFjLFNBQWQsQUFBYyxjQUFBO1NBQU8sRUFBRSxNQUFULEFBQU8sQUFBUTtBQUFuQyIsImZpbGUiOiJhdXRoLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9jbGFyYWxpbm9zL1NpdGVzL3N1c3RhaW5hYmxlLWNpdGllcyJ9