import { Deserializer } from 'jsonapi-serializer';
import fetch from 'isomorphic-fetch';
import * as queryString from 'query-string';

const LOGIN = 'auth/LOGIN';
const LOGIN_LOADING = 'auth/LOGIN_LOADING';
const LOGIN_ERROR = 'auth/LOGIN_ERROR';

const initialState = {
  token: null,
  errors: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_LOADING:
      return { ...state, loading: true, errors: [], token: null };

    case LOGIN_ERROR:
      return { ...state, loading: false, errors: action.errors };

    case LOGIN:
      return { ...state, loading: false, token: action.token };

    default:
      return state;
  }
};

export function login(email, password) {
  return (dispatch, getState) => {
    dispatch({ type: LOGIN_LOADING });

    return fetch(`${process.env.API_URL}/login`, {
      method: 'POST',
      body: JSON.stringify({ auth: { email, password } }),
      headers: {
        'Content-Type': 'application/json',
        'SC-API-KEY': process.env.SC_API_KEY,
      }
    }).
      then(response => {
        if (response.ok) {
          response.
            json().
            then(data => dispatch({ type: LOGIN, token: data.token }))
        } else {
          response.
            json().
            then(data => dispatch({ type: LOGIN_ERROR, errors: data.errors }));
        }

        return Promise.resolve(response.ok);
      });
  };
}
