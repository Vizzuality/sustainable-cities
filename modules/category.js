import { Deserializer } from 'jsonapi-serializer';
import fetch from 'isomorphic-fetch';
import * as queryString from 'query-string';

/* Actions */
// setters and getters
const GET_SOLUTION_CATEGORIES = 'category/GET_SOLUTION_CATEGORIES';
const GET_BME_CATEGORIES = 'category/GET_BME_CATEGORIES';
// load management
const SET_LOADING_SOLUTION = 'category/SET_LOADING_SOLUTION';
const SET_LOADING_BME = 'category/SET_LOADING_BME';
// error management
const SET_ERROR_SOLUTION = 'category/SET_ERROR_SOLUTION';
const SET_ERROR_BME = 'category/SET_ERROR_BME';

/* Initial state */
const initialState = {
  solution: {
    list: [],
    loading: false,
    error: false
  },
  bme: {
    list: [],
    loading: false,
    error: false
  }
};

/* Reducer */
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SOLUTION_CATEGORIES:
      return Object.assign({}, state, { solution: { ...state.solution, list: action.payload } });
    case GET_BME_CATEGORIES:
      return Object.assign({}, state, { bme: { ...state.bme, list: action.payload } });
    case SET_LOADING_SOLUTION:
      return Object.assign({}, state, { solution: { ...state.solution, loading: action.payload } });
    case SET_LOADING_BME:
      return Object.assign({}, state, { bme: { ...state.bme, loading: action.payload } });
    case SET_ERROR_SOLUTION:
      return Object.assign({}, state, { solution: { ...state.solution, error: action.payload } });
    case SET_ERROR_BME:
      return Object.assign({}, state, { bme: { ...state.bme, error: action.payload } });
    default:
      return state;
  }
}

/* Action creators */

// Retrieves categories of type Solution
export function getSolutionCategories() {
  return (dispatch, getState) => {
    dispatch({ type: SET_LOADING_SOLUTION, payload: true });

    const filters = {
      categoryType: 'Solution',
      level: [2]
    };
    const { categoryType, level } = filters;
    const includeFilters = ['children'];
    const categoriesFields = ['name', 'slug', 'category-type'];

    const queryParams = queryString.stringify({
      'filter[category-type]': categoryType,
      'filter[level]': level.join(','),
      'fields[categories]': categoriesFields.join(','),
      include: includeFilters.join(','),
      'page[size]': 999
    });

    fetch(`${process.env.API_URL}/categories?${queryParams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'SC-API-KEY': process.env.SC_API_KEY
      }
    })
    .then((response) => {
      if (response.ok) {
        if (getState().category.error) dispatch({ type: SET_ERROR_SOLUTION, payload: false });
        return response.json();
      }

      dispatch({ type: SET_ERROR_SOLUTION, payload: true });
      throw new Error(response.status);
    })
    .then((categories) => {
      new Deserializer()
        .deserialize(categories, (err, parsedCategories) => {
          dispatch({ type: SET_LOADING_SOLUTION, payload: false });
          dispatch({ type: GET_SOLUTION_CATEGORIES, payload: parsedCategories });
        });
    });
  };
}

// Retrieves categories of type Bme
export function getBmeCategories() {
  return (dispatch, getState) => {
    dispatch({ type: SET_LOADING_BME, payload: true });

    const filters = {
      categoryType: 'Bme',
      level: [1]
    };
    const { categoryType, level } = filters;
    const includeFilters = ['children'];
    const categoriesFields = ['name', 'slug', 'children', 'category-type'];

    const queryParams = queryString.stringify({
      'filter[category-type]': categoryType,
      'filter[level]': level.join(','),
      'fields[categories]': categoriesFields.join(','),
      include: includeFilters.join(','),
      'page[size]': 999
    });

    fetch(`${process.env.API_URL}/categories?${queryParams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'SC-API-KEY': process.env.SC_API_KEY
      }
    })
    .then((response) => {
      if (response.ok) {
        if (getState().category.error) dispatch({ type: SET_ERROR_BME, payload: false });
        return response.json();
      }

      dispatch({ type: SET_ERROR_BME, payload: true });
      throw new Error(response.status);
    })
    .then((categories) => {
      new Deserializer()
        .deserialize(categories, (err, parsedCategories) => {
          dispatch({ type: SET_LOADING_BME, payload: false });
          dispatch({ type: GET_BME_CATEGORIES, payload: parsedCategories });
        });
    });
  };
}
