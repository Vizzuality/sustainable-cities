import { Deserializer } from 'jsonapi-serializer';
import fetch from 'isomorphic-fetch';
import * as queryString from 'query-string';

/* Actions */
// setters and getters
const GET_CITY = 'city/GET_CITY';
const SET_CITY_DETAIL = 'city/SET_CITY_DETAIL';
const SET_CITY_BME = 'city/SET_CITY_BME';
const SET_FILTERS = 'city/SET_FILTERS';
const RESET_FILTERS = 'city/RESET_FILTERS';
// load management
const SET_LOADING_CITY = 'city/SET_LOADING_CITY';
const SET_LOADING_CITY_BME = 'city/SET_LOADING_CITY_BME';
// error management
const SET_ERROR_CITY = 'city/SET_ERROR_CITY';
const SET_ERROR_CITY_BME = 'city/SET_ERROR_CITY_BME';

/* Initial state */
const initialState = {
  list: [],
  detail: {},
  filters: {
    detailId: null
  },
  bme: {
    list: [],
    error: false,
    loading: false
  },
  error: false,
  loading: false
};

/* Reducer */
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CITY:
      return Object.assign({}, state, { list: action.payload });
    case SET_CITY_DETAIL:
      return Object.assign({}, state, { detail: action.payload });
    case SET_CITY_BME:
      return Object.assign({}, state, { bme: { ...state.bme, list: action.payload } });
    case SET_FILTERS:
      return Object.assign({}, state, { filters: action.payload });
    case RESET_FILTERS:
      return Object.assign({}, state, { filters: initialState.filters });
    case SET_LOADING_CITY:
      return Object.assign({}, state, { loading: action.payload });
    case SET_LOADING_CITY_BME:
      return Object.assign({}, state, { bme: { ...state.bme, loading: action.payload } });
    case SET_ERROR_CITY:
      return Object.assign({}, state, { error: action.payload });
    case SET_ERROR_CITY_BME:
      return Object.assign({}, state, { bme: { ...state.bme, error: action.payload } });
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

export function getCityDetail(cityId) {
  return (dispatch, getState) => {
    dispatch({ type: SET_LOADING_CITY, payload: true });

    const includeFilters = ['projects'];

    const queryParams = queryString.stringify({
      include: includeFilters.join(','),
      'page[size]': 20
    });

    fetch(`${process.env.API_URL}/cities/${cityId}?${queryParams}`, {
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
          dispatch({ type: SET_CITY_DETAIL, payload: parsedCityData });
        });
    });
  };
}

export function getCityBmes(cityId) {
  return (dispatch, getState) => {
    dispatch({ type: SET_LOADING_CITY_BME, payload: true });

    // change params if needed
    const includeFilters = ['projects'];

    const queryParams = queryString.stringify({
      include: includeFilters.join(','),
      'page[size]': 20
    });

    fetch(`${process.env.API_URL}/cities/${cityId}?${queryParams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'SC-API-KEY': process.env.SC_API_KEY
      }
    })
    .then((response) => {
      if (response.ok) {
        if (getState().category.error) dispatch({ type: SET_ERROR_CITY_BME, payload: false });
        return response.json();
      }

      dispatch({ type: SET_ERROR_CITY_BME, payload: true });
      throw new Error(response.status);
    })
    .then((cityBmeData) => {
      new Deserializer({ keyForAttribute: 'camelCase' })
        .deserialize(cityBmeData, (err, parsedCityBmeData) => {
          dispatch({ type: SET_LOADING_CITY_BME, payload: false });
          dispatch({ type: SET_CITY_BME, payload: parsedCityBmeData });
        });
    });
  };
}

export function setCityFilters(filters) {
  return (dispatch) => {
    dispatch({ type: SET_FILTERS, payload: filters });
  };
}

export function resetCityFilters() {
  return (dispatch) => {
    dispatch({ type: RESET_FILTERS });
  };
}
