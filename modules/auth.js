import { Deserializer } from 'jsonapi-serializer';
import fetch from 'isomorphic-fetch';
import * as queryString from 'query-string';
import jwtDecode from 'jwt-decode';
import { apiRequest } from 'modules/helpers';

const LOGIN = 'auth/LOGIN';
const LOGIN_LOADING = 'auth/LOGIN_LOADING';
const LOGIN_ERROR = 'auth/LOGIN_ERROR';

const SIGNUP = 'auth/SIGNUP';
const SIGNUP_LOADING = 'auth/SIGNUP_LOADING';
const SIGNUP_ERROR = 'auth/SIGNUP_ERROR';

const GET_PROFILE = 'auth/GET_PROFILE';

const initialState = {
  token: null,
  errors: [],
  loading: false,
  profile: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_LOADING:
      return { ...state, loading: true, errors: [], token: null };

    case LOGIN_ERROR:
      return { ...state, loading: false, errors: action.errors };

    case LOGIN:
      return { ...state, loading: false, token: action.token };

    case GET_PROFILE:
      return { ...state, profile: action.payload };

    default:
      return state;
  }
};

export function login(email, password) {
  return (dispatch, getState) => {
    dispatch({ type: LOGIN_LOADING });

    return apiRequest(
      "login", {
        method: 'POST',
        body: JSON.stringify({ auth: { email, password } }),
      },
    ).then(response => {
      if (response.ok) {
        response.
          json().
          then(data => {
            dispatch(profile(data.token));
            dispatch({ type: LOGIN, token: data.token });
          })
      } else {
        response.
          json().
          then(data => dispatch({ type: LOGIN_ERROR, errors: data.errors }));
      }

      return Promise.resolve(response.ok);
    });
  };
}

export function register(name, nickname, email, password, passwordConfirmation) {
  return (dispatch, getState) => {
    dispatch({ type: SIGNUP_LOADING });

    return apiRequest(
      "register", {
        method: 'POST',
        body: JSON.stringify({ user: { name, nickname, email, password, password_confirmation: passwordConfirmation } }),
      },
    ).then(response => {
      if (response.ok) {
        response.
          json().
          then(data => {
            dispatch(profile(data.token));
            dispatch({ type: SIGNUP, token: data.token });
          })
      } else {
        response.
          json().
          then(data => dispatch({ type: SIGNUP_ERROR, errors: data.errors }));
      }

      return Promise.resolve(response.ok);
    });
  };
}

export function profile(token) {
  return (dispatch, getState) => {
    apiRequest(
      `users/${jwtDecode(token).user}`,
      { method: 'GET' },
    ).then(response => response.json()).then(data => {
      new Deserializer().deserialize(data, (err, parsed) => {
        dispatch({ type: GET_PROFILE, payload: parsed })
      });
    });
  };
}
