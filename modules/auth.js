import { Deserializer } from 'jsonapi-serializer';
import jwtDecode from 'jwt-decode';
import * as queryString from 'query-string';
import { apiRequest } from 'modules/helpers';
import { Router } from 'routes';

const LOGIN = 'auth/LOGIN';
const LOGIN_LOADING = 'auth/LOGIN_LOADING';
const LOGIN_ERROR = 'auth/LOGIN_ERROR';

const SIGNUP = 'auth/SIGNUP';
const SIGNUP_LOADING = 'auth/SIGNUP_LOADING';
const SIGNUP_ERROR = 'auth/SIGNUP_ERROR';

const CLEAR_ERRORS = 'auth/CLEAR_ERRORS';

const GET_PROFILE = 'auth/GET_PROFILE';
const GET_SAVED_PROJECTS = 'auth/GET_SAVED_PROJECTS';

const initialState = {
  token: null,
  errors: [],
  signupErrors: [],
  loading: false,
  profile: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_LOADING:
      return { ...state, loading: true, errors: [], token: null };

    case LOGIN_ERROR:
      return { ...state, loading: false, errors: action.errors };

    case SIGNUP_ERROR:
      return { ...state, loading: false, signupErrors: action.errors };

    case LOGIN:
      return { ...state, loading: false, token: action.token };

    case CLEAR_ERRORS:
      return { ...state, errors: [], signupErrors: [] };

    case GET_PROFILE:
      return { ...state, profile: action.payload };

    case GET_SAVED_PROJECTS:
      return Object.assign({},
        state,
        { profile: {
          ...state.profile, savedProjects: action.payload
        } }
      );
    default:
      return state;
  }
}

export function getProfile(token) {
  return (dispatch) => {
    apiRequest(
      `users/${jwtDecode(token).user}`,
      { method: 'GET' },
    ).then(response => response.json()).then((data) => {
      new Deserializer().deserialize(data, (err, parsed) => {
        dispatch({ type: GET_PROFILE, payload: parsed });
      });
    });
  };
}

export function getSavedProjects(token) {
  return (dispatch) => {
    const includeFields = ['solution', 'business-model-bmes', 'bmes',
      'business-model-bmes.comment', 'business-model-enablings',
      'business-model-enablings.enabling', 'owner', 'business-model-users',
      'business-model-users.user'];


    const queryParams = queryString.stringify({
      include: includeFields.join(',')
    });
    apiRequest(`/business-models?${queryParams}`,
      { mehtod: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    ).then(response => response.json()).then((data) => {
      new Deserializer().deserialize(data, (err, parsed) => {
        dispatch({ type: GET_SAVED_PROJECTS, payload: parsed });
      });
    });
  };
}

export function deleteSavedProject(token, projectId) {
  return (dispatch) => {
    apiRequest(`business-models/${projectId}`,
      { method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    ).then(() => {
      dispatch(getSavedProjects(token));
    });
  };
}

export function login(email, password) {
  return (dispatch) => {
    dispatch({ type: LOGIN_LOADING });

    return apiRequest(
      'login', {
        method: 'POST',
        body: JSON.stringify({ auth: { email, password } })
      },
    ).then((response) => {
      if (response.ok) {
        response.json()
          .then((data) => {
            dispatch(getProfile(data.token));
            dispatch({ type: LOGIN, token: data.token });
          });
      } else {
        response.json()
          .then(data => dispatch({ type: LOGIN_ERROR, errors: data.errors }));
      }

      return Promise.resolve(response.ok);
    });
  };
}

export function register(name, nickname, email, password, passwordConfirmation) {
  return (dispatch) => {
    dispatch({ type: SIGNUP_LOADING });

    return apiRequest(
      'register', {
        method: 'POST',
        body: JSON.stringify({
          user: { name, nickname, email, password, password_confirmation: passwordConfirmation } })
      },
    ).then((response) => {
      if (response.ok) {
        response.json()
          .then((data) => {
            dispatch(getProfile(data.token));
            dispatch({ type: SIGNUP, token: data.token });
          });
      } else {
        response.json()
          .then(data => dispatch({ type: SIGNUP_ERROR, errors: data.errors }));
      }

      return Promise.resolve(response.ok);
    });
  };
}

export function saveProfile(token, params) {
  return dispatch => (
    apiRequest(
      `users/${jwtDecode(token).user}`,
      {
        method: 'PATCH',
        body: JSON.stringify({ user: params }),
        headers: {
          Authorization: `Bearer ${token}`
        }
      },
    ).then(
      response => response.json()
    ).then((data) => {
      getProfile(token)(dispatch);

      return data;
    })
  );
}

export function logout() {
  return (dispatch) => {
    dispatch({ type: LOGIN, payload: { token: null } });
    dispatch({ type: GET_PROFILE, payload: {} });
    // redirects to homepage once user is logged out
    Router.pushRoute('/');
  };
}

export const clearErrors = () => ({ type: CLEAR_ERRORS });
