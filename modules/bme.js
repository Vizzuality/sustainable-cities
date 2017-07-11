import { Deserializer } from 'jsonapi-serializer';
import fetch from 'isomorphic-fetch';
import * as queryString from 'query-string';

// utils
import { listBmes } from 'utils/bme';

/* Actions */
const GET_BMES = 'bme/GET_BMES';
const SET_FILTERS = 'bme/SET_FILTERS';
const SET_BME_CATEGORY_ID = 'bme/SET_BME_CATEGORY_ID';

const SET_LOADING_BMES = 'bme/SET_LOADING_BMES';
const SET_ERROR_BMES = 'bme/SET_ERROR_BMES';

/* Initial state */
const initialState = {
  list: [],
  filters: {
    // BME category or subcategory
    category: null,
    // id used to get a single bme
    detailId: null
  },
  loading: false,
  error: false
};

/* Reducer */
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_BMES:
      return Object.assign({}, state, { list: action.payload });
    case SET_LOADING_BMES:
      return Object.assign({}, state, { loading: action.payload });
    case SET_ERROR_BMES:
      return Object.assign({}, state, { error: action.payload });
    case SET_FILTERS: {
      const filters = { ...state.filters, ...action.payload };
      return Object.assign({}, state, { filters });
    }
    case SET_BME_CATEGORY_ID: {
      const filters = { ...state.filters, ...{ category: action.payload } };
      return Object.assign({}, state, { filters });
    }
    default:
      return state;
  }
}

/* Action creators */
export function getBmes(filters = {}) {
  const { category } = filters;

  const includeParams = ['children', 'children.bmes'];

  const queryParams = queryString.stringify({
    'filter[slug]': category || undefined,
    include: includeParams.join(','),
    'page[size]': 1000
  });

  return (dispatch, getState) => {
    dispatch({ type: SET_LOADING_BMES, payload: true });

    fetch(`${process.env.API_URL}/categories?${queryParams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'SC-API-KEY': process.env.SC_API_KEY
      }
    })
    .then((response) => {
      if (response.ok) {
        if (getState().project.error) dispatch({ type: SET_ERROR_BMES, payload: false });
        return response.json();
      }

      dispatch({ type: SET_ERROR_BMES, payload: true });
      throw new Error(response.status);
    })
    .then((bmes) => {
      new Deserializer()
        .deserialize(bmes, (err, parsedBmes) => {
          dispatch({ type: SET_LOADING_BMES, payload: false });
          dispatch({ type: GET_BMES, payload: listBmes(parsedBmes) });
        });
    });
  };
}

export function setBmeFilters(filters) {
  return (dispatch) => {
    dispatch({ type: SET_FILTERS, payload: filters });
  };
}

export function setBmeCategoryId(categoryId) {
  return (dispatch) => {
    dispatch({ type: SET_BME_CATEGORY_ID, payload: categoryId });
  };
}
