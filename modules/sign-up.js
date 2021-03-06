import { Deserializer } from 'jsonapi-serializer';
import fetch from 'isomorphic-fetch';
import * as queryString from 'query-string';

/* Actions */
// setters and getters
const SET_EMAIL = 'sign-up/SET_EMAIL';

/* Initial state */
const initialState = {
  solution: {
    list: [],
    loading: false,
    error: false
  }
};

/* Reducer */
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_EMAIL:
      return Object.assign({}, state, {});
    default:
      return state;
  }
}

/* Action creators */

// Send email to endpoint
export function setEmail(email) {
  return (dispatch, getState) => {
    // dispatch({ type: SET_EMAIL, payload: true });

    fetch(`${process.env.API_URL}/contacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'SC-API-KEY': process.env.SC_API_KEY
      },
      body: JSON.stringify({
        contact: {
          email
        }
      })
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(response.status);
    })
  };
}
