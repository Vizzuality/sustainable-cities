import { Deserializer } from 'jsonapi-serializer';
import fetch from 'isomorphic-fetch';
import * as queryString from 'query-string';

/* Actions */
// setters and getters
const GET_CITY = 'city/GET_CITY';
// load management
const SET_LOADING_CITY = 'city/SET_LOADING_CITY';
// error management
const SET_ERROR_CITY = 'city/SET_ERROR_CITY';

/* Initial state */
const initialState = {
  list: [],
  error: false,
  loading: false
};

/* Reducer */
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CITY:
      return Object.assign({}, state, { list: action.payload });
    case SET_LOADING_CITY:
      return Object.assign({}, state, { loading: action.payload });
    case SET_ERROR_CITY:
      return Object.assign({}, state, { error: action.payload });
    default:
      return state;
  }
}

/* Action creators */
// Retrieves projects by cities
export function getCities() {
  return (dispatch, getState) => {
    dispatch({ type: SET_LOADING_CITY, payload: true });

    const includeFilters = ['projects'];

    const queryParams = queryString.stringify({
      include: includeFilters.join(','),
      'page[size]': 1000
    });

    fetch(`${process.env.API_URL}/cities?${queryParams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'SC-API-KEY': process.env.SC_API_KEY
      }
    })
    .then((response) => {
      if (response.ok) {
        if (getState().category.error) dispatch({ type: SET_ERROR_CITY, payload: false });
        return response.json();
      }

      dispatch({ type: SET_ERROR_CITY, payload: true });
      throw new Error(response.status);
    })
    .then((cityData) => {
      new Deserializer({ keyForAttribute: 'camelCase' })
        .deserialize(cityData, (err, parsedCityData) => {
          dispatch({ type: SET_LOADING_CITY, payload: false });
          dispatch({ type: GET_CITY, payload: parsedCityData });
        });
    });
  };
}
